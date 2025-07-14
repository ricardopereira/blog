---
layout: post
lang: EN
title: "Privacy-first alternatives to Big Tech services"
tags: [Privacy, FOSS, Self-host, DIY]
image: /public/img/2025/foss-stack-privacy.png
---

In a world where our digital lives are increasingly commodified and monitored, I've been slowly migrating away from Big Tech services to Free and Open Source Software (FOSS) alternatives.

---

The journey started with my [self-hosted Ente Photos setup](/2025/03/07/EN-self-hosting-ente-photos/) a few months ago. Since then, I've been systematically replacing various cloud services with privacy-respecting alternatives. Here's my current FOSS stack that prioritizes privacy without sacrificing functionality.

## Why I made the switch

Before diving into the tools, let's understand why this migration matters. Control of your data is the first thing that I was interestet. Your data stays yours and is not a product for advertisers. Another thing that I value is privacy by design with end-to-end encryption and zero-knowledge architectures. Finally, no vendor lock-in thanks to open standards and portable data formats, and a community-driven approach where the software is built for users, not shareholders.

## My replacement stack

### Photos & 2FA: Ente.io

After successfully self-hosting Ente for photo storage, I discovered it also offers an excellent 2FA authenticator. Ente Auth is a good solution which also syncs across devices while maintaining end-to-end encryption. Unlike Google Authenticator or Authy, my TOTP secrets never leave my control unencrypted.

The migration was painless. I exported my existing 2FA codes and imported them into Ente Auth. Now both my photos and authentication codes are backed up to my self-hosted instance.

### Notes & article saving: Joplin

I replaced Evernote and Apple Notes with Joplin. What sold me on Joplin wasn't just the privacy aspect - it was the flexibility:

- Markdown-based notes that I actually own
- Web clipper that rivals commercial offerings
- End-to-end encryption when syncing
- Works offline

The killer feature? I can save entire articles for offline reading, and everything is searchable. No more worrying about services changing their free tiers or disappearing entirely.

### File storage: Seafile

While many jump to Nextcloud, I chose Seafile for its laser focus on file synchronization. It's faster, more reliable, and uses less resources on my home server. Key benefits:

- Block-level deduplication saves storage
- Selective sync for large libraries
- File versioning and snapshot support
- Client-side encryption for sensitive data

I'm running it on the same Raspberry Pi cluster as my Ente instance, and it handles my 2TB of files without breaking a sweat.

### Email: ProtonMail + SimpleLogin

I didn't want to rely on myself to create an email server. Maybe in the future ahah. For now, I decided to rely on ProtonMail as my primary email provider, but I've enhanced it with SimpleLogin for alias management. The workflow:

1. SimpleLogin generates unique email aliases for each service
2. Emails to these aliases get encrypted using my GPG public key
3. They're forwarded to my ProtonMail inbox, arriving encrypted
4. ProtonMail decrypts them with my private key

This double-encryption approach means even SimpleLogin can't read my emails. They're encrypted before forwarding. It's like having a mail box that automatically seals your mail in a lockbox only you can open.

The benefit? Great email privacy and the ability to instantly cut off spam by disabling specific aliases. No more giving out my real email address.

### RSS Reader: FreshRSS

Remember Google Reader? FreshRSS is what it should have evolved into. Self-hosted on my Pi, it:

- Aggregates all my news sources in one place
- Keeps my reading habits private
- Syncs read status across devices
- Offers powerful filtering and tagging

I've replaced my Reddit browsing, news apps, and various newsletters with a curated RSS setup. The web interface is clean, and it supports various mobile apps through its API. My client is [NetNewsWire](https://netnewswire.com/) which I also recommend.

### Network-wide Ad Blocking: Pi-hole

Pi-hole deserves special mention because it protects my entire network. Running on a dedicated Raspberry Pi:

- Blocks ads and trackers at the DNS level
- Speeds up browsing by preventing ad downloads
- Provides detailed analytics of my network's queries
- Works for all devices, including smart TVs and IoT devices

The difference is noticeable. Pages load faster, and I've discovered just how much tracking attempts happen on "smart" devices.

## Challenges and solutions

The migration wasn't without hiccups. Each service required configuration and hardening. I solved this by documenting everything and using Docker Compose for reproducible deployments. Even so, the maintenance takes time and headaches.

Some FOSS apps aren't as polished as their commercial counterparts. However, the gap is closing rapidly, and the privacy benefits outweigh minor UI differences.

I'm now my own sysadmin, right? Regular backups and updates are crucial. I still need to configure a Watchtower to help automate container updates.

## Conclusion

If you're considering a similar migration, start small. That's my recommendation. The key is incremental progress. You don't need to replace everything at once.

Personally, I think my FOSS journey is far from over. My goal is not to live off-grid digitally, but to make conscious choices about which services deserve access to my data. With FOSS, that choice is always mine.

<br>

Have you started your own FOSS migration? What tools are you using? Share your experience: [mastodon.social/@ricardopereira](https://mastodon.social/@ricardopereira).

Thanks for reading,

RP