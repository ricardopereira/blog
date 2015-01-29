---
layout: post
lang: PT
title: Configuração de uma VPN com Docker
tags: [VPN, OpenVPN, Docker]
---

Festejar o dia _Internacional da Privacidade de Dados_ a configurar uma VPN através do Docker.

---

A privacidade e a proteção de dados é um assunto que tem vindo a receber grande importância nos últimos anos, muito graças aos crimes informáticos que têm vindo a surgir e que se tornam comuns nos dias de hoje.

Do meu conhecimento, a encriptação de dados e a utilização de uma VPN (Virtual Private Network) são bastante eficazes em garantir a privacidade e a proteção de dados.

</br>
# Virtual Private Network

Uma rede privada virtual bem configurada permite transferir dados de forma segura através de criptografia e outras tecnologias.

Para facilitar o processo de configuração de uma VPN decidi por utilizar um Docker [container](http://registry.hub.docker.com/u/kylemanna/openvpn). 

<p align="center">
  <img src="/public/img/2015/vpn-configuration-with-docker/docker.png" alt="Definições do Wifi Eduroam"/>
</p>

[Docker](http://www.docker.com) permite executar máquinas virtuais de pequena dimensão, super eficientes e de elevada performance, tendo a vantagem de garantir soluções imutáveis e reutilizáveis.

> **Exemplo** Com o Docker é possível executar uma máquina virtual como se fosse um processo do sistema operativo onde o processo tem o seu próprio kernel, sistema de ficheiros, processos, etc. (Para melhor compreensão do conceito do Docker, experimentem o emulador [docker.com/tryit](http://www.docker.com/tryit/))

</br>
# DigitalOcean + Docker + OpenVPN

Em vez de configurar um Raspberry Pi ou utilizar uma VPS e configurar um sistema operativo que fique disponível 24 horas por dia na internet, decidi criar um **droplet** application na [DigitalOcean](https://www.digitalocean.com/?refcode=219fe204507c):

</br>
<p align="center">
  <img src="/public/img/2015/vpn-configuration-with-docker/create-droplet.png" alt="Definições do Wifi Eduroam"/>
</p>
<p align="center">
  <img src="/public/img/2015/vpn-configuration-with-docker/digitalocean-docker.png" alt="Definições do Wifi Eduroam"/>
</p>

</br>
> **Give $10, Get $25**: ficam a ganhar (e eu também) se criarem uma conta na DigitalOcean através do meu convite: [digitalocean.com/?refcode=219fe204507c](https://www.digitalocean.com/?refcode=219fe204507c)

</br>
Para além de ser acessível e ter uma ligação extremamente rápida, tem a vantagem de em poucos minutos ficarmos com uma máquina já preparada para usar Docker containers.

Próximo passo... configurar a imagem [kylemanna/docker-openvpn](http://github.com/kylemanna/docker-openvpn).

</br>
### Configuração
Após a criação do droplet na DigitalOcean, surge um email com as credenciais de acesso. É necessário verificar o IP do droplet para ser possível acede-lo pelo terminal:
{% highlight bash %}
ssh root@X.X.X.X
{% endhighlight %}

> **Nota** No primeiro acesso ao droplet é necessário definir uma nova password de acesso.

</br>
Depois de estabelecer a conexão com sucesso ao droplet, executar as seguintes instruções na linha de comandos:

</br>
**Download da imagem**

```
docker pull kylemanna/openvpn
```

</br>
**Inicializar a imagem**

```
docker run --name "ovpn-data" -v /etc/openvpn busybox
```

</br>
**Configurar a imagem com o IP do droplet**

```
docker run --volumes-from "ovpn-data" --rm kylemanna/openvpn ovpn_genconfig -u udp://X.X.X.X
```

</br>
**Inicializar o disco virtual da imagem**

```
docker run --volumes-from "ovpn-data" --rm -it kylemanna/openvpn ovpn_initpki
```

</br>
**Iniciar a imagem**

```
docker run --volumes-from "ovpn-data" -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn
```

Neste momento o Docker tem um processo ativo.
Para verificar os processos que estão a correr no momento e obter o respetivo `pid`, executar:

```
docker ps
```

</br>
**Terminar o processo**

```
docker stop <pid>
```

</br>
O próximo passo é criar clientes que possam usar a VPN:

> **Nota** Terminar o processo antes de adicionar um novo cliente através do `docker stop`.

</br>
**Criar um cliente** por ex.: Client1

```
docker run --volumes-from "ovpn-data" --rm -it kylemanna/openvpn easyrsa build-client-full Client1 nopass
```

</br>
**Download do profile** por ex.: Client1

```
docker run --volumes-from "ovpn-data" --rm kylemanna/openvpn ovpn_getclient Client1 > Client1.ovpn
```

> **Nota** O profile (`*.ovpn`) é criado na diretoria atual do terminal.

Iniciar novamente a imagem após a criação do(s) cliente(s):

```
docker run --volumes-from "ovpn-data" -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn
```

</br>
### Utilização

Depois da criação dos clientes (profiles) e da execução da imagem, é possível estabelecer ligação à VPN mas...

Antes disso, é necessário fazer download do(s) profile(s) que foram criados anteriormente. A maneira mais simples será conectar ao droplet através de um cliente SFTP (SSH File Transfer Protocol), aceder à diretoria onde foram criados os profiles e fazer download para a máquina local.

> **Nota** Por motivos de segurança, após a transferência dos profiles, será conveniente alterar as permissões da cada profile (por exemplo `chmod 600 Client1.ovpn`).

Com o profile, já é possível utilizar a VPN de forma muito simples.

Eu utilizo a VPN no Yosemite através da aplicação [Viscosity](https://www.sparklabs.com/viscosity/). Inicialmente não estava a estabelecer ligação porque não era possível encontrar o `dh.key`. Retirei o `DH Parameters` do `Client1.ovpn`, voltei a importar o profile e ficou a funcionar.

Para iOS, uso a aplicação oficial da [OpenVPN](https://itunes.apple.com/us/app/openvpn-connect/id590379981?mt=8).

Para qualquer dúvida, podem deixar comentário ou contactar-me diretamente.

Abraço,

![Ricardo Pereira](/public/img/signature.png)

