---
layout: post
lang: EN
title: "Self-hosting Ente Photos: my journey to Google Photos alternative"
tags: [Photos, Self-host, DIY, FOSS]
---

In an age where our digital memories are some of our most precious possessions, finding the right photo storage solution is crucial.

---


For years, I relied on iCloud Photos and Google Photos for convenience, but I've been more concerned about privacy, control, and ownership of my data nowadays. This led me to discover [Ente.io](https://ente.io) - an end-to-end encrypted photo storage alternative that prioritizes privacy without sacrificing usability.

While Ente offers a paid service, its open-source nature allows for self-hosting. In this post, I'll share my journey of setting up a self-hosted Ente server on my Raspberry Pi, the challenges I faced, and how I overcame them. By the end, you'll have a roadmap to create your own private, secure photo storage system 😊

## Why Self-host Ente?

Before diving into the technical details, let's understand why self-hosting Ente is compelling:

- **Complete data ownership**: Your photos never leave your infrastructure
- **Cost-effective**: Avoid subscription fees for larger storage needs
- **Customization**: Configure everything to your specific requirements
- **Learning opportunity**: Understand how modern cloud services work under the hood

## Prerequisites

To follow this guide, you'll need:

- A server (I used a Raspberry Pi 5 running Raspbian)
- A domain name (I used subdomains of a domain I own)
- Basic familiarity with Linux, Docker, and networking
- Nginx Proxy Manager or similar reverse proxy solution
- Portainer for container management (optional but convinient)

## Step 1: Creating the directory structure

I started by creating a dedicated directory for the Ente installation:

```bash
sudo mkdir -p /opt/ente/config
cd /opt/ente/config
```

This organized approach made it easier to manage configuration files and backups.

## Step 2: Setting up Docker Compose

Next, I created a Docker Compose file that would define my Ente infrastructure. Ente consists of three main components:

1. **Museum**: The core API server
2. **PostgreSQL**: Database for metadata
3. **MinIO**: S3-compatible object local storage for photos

Here's the compose file I ended up with:

```yaml
version: '3.8'

services:
  museum:
    image: ghcr.io/ente-io/server
    container_name: ente
    restart: unless-stopped
    ports:
      - "8080:8080"
      - "2112:2112" # Prometheus metrics
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      ENTE_CREDENTIALS_FILE: /credentials.yaml
      ENTE_S3_ENDPOINT_OVERRIDE: https://minio.<your_domain>
    volumes:
      - custom-logs:/var/logs
      - /opt/ente/config/museum.yaml:/museum.yaml:ro
      - /opt/ente/config/credentials.yaml:/credentials.yaml:ro
    networks:
      - ente_network

  postgres:
    image: postgres:15
    container_name: ente_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: pgpass
      POSTGRES_DB: ente_db
    healthcheck:
      test: ["CMD", "pg_isready", "-q", "-d", "ente_db", "-U", "pguser"]
      start_period: 40s
      start_interval: 1s
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - ente_network

  minio:
    image: minio/minio
    container_name: ente_minio
    restart: unless-stopped
    ports:
      - "3200:3200" # API
      - "3201:3201" # Console
    environment:
      MINIO_ROOT_USER: ente_admin
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
      MINIO_SERVER_URL: https://minio.<your_domain>
      MINIO_BROWSER: "on"
      MINIO_BROWSER_ASSETS_PATH: "/minio"
    command: server /data --address ":3200" --console-address ":3201"
    volumes:
      - minio-data:/data
    networks:
      - ente_network

  minio-provision:
    image: minio/mc
    container_name: ente_minio_provision
    depends_on:
      - minio
    volumes:
      - /opt/ente/config/minio-provision.sh:/provision.sh:ro
      - minio-data:/data
    networks:
      - ente_network
    entrypoint: sh /provision.sh

volumes:
  custom-logs:
  postgres-data:
  minio-data:

networks:
  ente_network:
    driver: bridge
```

This setup creates a self-contained environment with all components isolated on their own network.

## Step 3: Creating configuration files

Ente requires several configuration files to work properly. I created them one by one:

### museum.yaml

This configures the main Ente server:

```yaml
key:
  encryption: "<generated_encryption_key>"
  hash: "<generated_hash_key>"

jwt:
  secret: "<generated_jwt_secret>"

s3:
  are_local_buckets: false  # Using Nginx Proxy Manager for SSL
  use_path_style_urls: true
  endpoint_override: https://minio.<your_domain>
  hot_storage:
    primary: b2-eu-cen
  b2-eu-cen:
    key: ente_admin
    secret: ${MINIO_ROOT_PASSWORD}
    endpoint: https://minio.<your_domain>
    region: eu-central-2
    bucket: b2-eu-cen
    force_path_style: true

internal:
  disable-registration: false
  admins:
    - <redacted>

apps:
  public-albums: https://ente.<your_domain>

http:
  use-tls: false  # Using Nginx Proxy Manager for SSL

replication:
  enabled: false
```

### credentials.yaml

This file provides database and S3 credentials:

```yaml
db:
    host: postgres
    port: 5432
    name: ente_db
    user: pguser
    password: pgpass

s3:
    are_local_buckets: false
    endpoint_override: https://minio.<your_domain>
    b2-eu-cen:
        key: ente_admin
        secret: ${MINIO_ROOT_PASSWORD}
        endpoint: https://minio.<your_domain>
        region: eu-central-2
        bucket: b2-eu-cen
        force_path_style: true
```

### minio-provision.sh

This script sets up MinIO buckets and permissions:

```bash
#!/bin/sh

# Script used to prepare the minio instance that runs as part of the development
# Docker compose cluster.

while ! mc config host add h0 http://minio:3200 ente_admin "<MINIO_ROOT_PASSWORD>"
do
   echo "waiting for minio..."
   sleep 0.5
done

cd /data

mc mb -p b2-eu-cen
mc mb -p wasabi-eu-central-2-v3
mc mb -p scw-eu-fr-v3
```

I made this script executable:

```bash
sudo chmod +x /opt/ente/config/minio-provision.sh
```

## Step 4: Setting up domains in Nginx Proxy Manager

I configured two domains in Nginx Proxy Manager:

1. `ente.<your_domain>` - For the Ente server
2. `minio.<your_domain>` - For MinIO storage

### Ente server configuration

- Server name: ente.<your_domain> pointing to your local server ip and Ente port (8080) and generate a Let's Encyrpt SSL certificate.
- Server ame: minio.<your_domain> pointing to your local server ip and MinIO port (3200) and generate a Let's Encyrpt SSL certificate.

## Step 5: Generating security keys

For security, I generated random encryption keys:

```bash
openssl rand -base64 32  # For encryption key
openssl rand -base64 64  # For hash key
openssl rand -base64 32  # For JWT secret
```

These were added to the museum.yaml file, ensuring the cryptographic security of all stored data.

## Step 6: Deploying with Portainer

With everything configured, I deployed the stack using Portainer:

1. Created a new stack named "ente"
2. Pasted my docker-compose.yaml
3. Added an environment variable for `MINIO_ROOT_PASSWORD` with a strong password
4. Deployed the stack

## Step 7: Creating an account and setting up an admin

After everything was running:

1. Connect the apps to a custom server: https://help.ente.io/self-hosting/guides/custom-server/
2. Created a new account
3. Since email sending wasn't configured, I had to retrieve the verification code from the server logs. You can check them in Portainer. Know more about it here: https://help.ente.io/self-hosting/faq/otp
4. After logging in, it is important to found your user ID to make you an admin. You can also check it from the logs or in the database like:
```bash
docker exec ente_postgres psql -U pguser -d ente_db -c "SELECT user_id, email FROM users;"
```
5. Added this ID to the `museum.yaml` file under the `internal.admins` section
6. Restarted the stack to apply the changes

## Step 8: Setting up unlimited storage

By default, Ente limits storage capacity, but as a self-hosted instance administrator, I could grant unlimited storage:

```bash
# Install the CLI
mkdir -p ~/.local/bin

# Download and extract the CLI (See what's the latest CLI version at https://github.com/ente-io/ente/releases)
wget https://github.com/ente-io/ente/releases/download/cli-v0.2.3/ente-cli-v0.2.3-linux-arm64.tar.gz -O /tmp/ente-cli.tar.gz
tar -xf /tmp/ente-cli.tar.gz -C /tmp
mv /tmp/ente ~/.local/bin/
chmod +x ~/.local/bin/ente

# Create the config dir
mkdir -p ~/.ente

# Create config.yaml
cat > ~/.ente/config.yaml << EOF
endpoint:
  api: "https://ente.<your_domain>"
  accounts: "https://ente.<your_domain>"

log:
  http: false
EOF

# Set up secrets for the CLI
mkdir -p ~/.ente/secrets
openssl rand 32 > ~/.ente/secrets/secrets.txt
chmod 600 ~/.ente/secrets/secrets.txt
export ENTE_CLI_SECRETS_PATH="$HOME/.ente/secrets/secrets.txt"

# Add the account
ente account add

# Update subscription to unlimited
ente admin update-subscription -a your_email@example.com --user your_email@example.com --no-limit True
```

This effectively gave me 100TB of storage with a 100-year subscription - more than enough for my needs!

## Step 9: Troubleshooting upload issues

This was the most challenging part of my journey. Initially, uploads failed with "The following files were not uploaded" errors. The main issues were:

### Problem 1: Network addressing

The desktop client was trying to upload directly to `http://localhost:3200` - which works on the server but not from my Mac. I resolved this by:

1. Setting `are_local_buckets: false` in configurations
2. Setting up a dedicated domain for MinIO (minio.<your_domain>)
3. Using my domain instead of localhost in S3 endpoint configurations
4. Setting up proper Nginx routing

### Problem 2: CORS Issues

MinIO needed proper CORS configuration to accept uploads from different origins:

```json
{
    "CORSRules": [
        {
            "AllowedOrigins": ["https://ente.<your_domain>"],
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
            "MaxAgeSeconds": 3000,
            "ExposeHeaders": ["Etag"]
        }
    ]
}
```

## Step 10: Setting up backup mechanism

In another machine, I had to setup Ente CLI like I did for the inscreasing space step. Then, I configured the Ente CLI for regular backups:

```bash
# Create backup directory
mkdir -p ~/ente-data

# Configure account with export path
ente account update --email your_email@example.com --dir ~/ente-data

# Set up a cron job for nightly backups
crontab -e
# Add: 0 2 * * * /home/falcon/.local/bin/ente export >> /home/falcon/ente-export.log 2>&1
```

This ensures I have an additional layer of protection for my photos beyond the encrypted storage.

## Benefits of my self-hosted Ente setup

Now that everything is working, I'm enjoying several advantages:

1. **Privacy**: All my photos are end-to-end encrypted with keys I control
2. **Full ownership**: My data never leaves my infrastructure
3. **No subscription fees**: I only pay for the hardware and electricity
4. **Unlimited storage**: I can expand storage as needed
5. **Desktop and mobile apps**: Still using official Ente apps but connecting to my server
6. **Sharing capability**: I can share albums with family and friends
7. **Backup workflow**: Regular exports ensure additional data protection

If you're considering self-hosting Ente, here are my recommendations:

Start with official documentation. Ente's documentation is helpful but you may need to piece things together.

## Conclusion

Self-hosting Ente has been a rewarding journey. While it required some technical know-how and troubleshooting, the result is a private, secure alternative to iCloud Photos or Google Photos that I fully control. My photos are now stored on my own infrastructure, encrypted with keys only I possess, while still enjoying the convenience of modern photo applications.

If you value privacy and control over your data, self-hosting Ente is definitely worth considering. The initial setup challenges are offset by the long-term benefits of truly owning your digital memories.

Remember that self-hosting comes with responsibilities - you'll need to handle backups, security updates, and maintenance. But for many privacy-conscious users, that's a small price to pay for true data sovereignty.

<br>

Have you self-hosted any privacy-focused applications? Are you considering setting up your own Ente server? Let me know about your experiences: [mastodon.social/@ricardopereira](https://mastodon.social/@ricardopereira).

Thank you for reading,

RP
