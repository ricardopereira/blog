---
layout: post
lang: PT
title: Jekyll, passo a passo
tags: [Jekyll, Tutorial]
---

A descrição das várias tecnologias utilizadas para a construção deste blog. Estão descritas todas as etapas necessárias.

---

<p class="message">
O artigo, nesta semana, irá sofrer algumas alterações porque ainda estou a fazer alterações ao meu blog.
</p>

No meu primeiro [artigo](/2014/09/05/PT-a-new-blog/) decidi partilhar a pesquisa que fiz sobre várias plataformas que poderiam substituir o meu antigo blog.

Dos requisitos que estabeleci o vencedor foi o [Jekyll](http://jekyllrb.com), um gerador de páginas estáticas muito simples de se usar e com grandes funcionalidades.

Vou explicar todos os passos percorridos que foram necessários para a criação do blog desde da configuração do alojamento, configuração de um sub-domínio, configuração do gestor de comentários, entre outros pormenores que decidi implementar.

<br/>
## Opções & Requisitos

 - [1](#github-pages) - [GitHub Pages](https://pages.github.com), alojamento
 - [GoDaddy](https://www.godaddy.com), sub-domínio
 - [Disqus](https://disqus.com), comentários
 - [Google Analytics](http://www.google.com/analytics/), dados estatísticos
 - [FontAwesome](http://fortawesome.github.io/Font-Awesome/), fonte de ícones escaláveis
 - [Hover.css](http://ianlunn.github.io/Hover/), efeitos
 - [MacDown](http://macdown.uranusjr.com), editor de markdown
 - Tags
 - Tabelas
 - Breakline
 - Kudos
 - Centrar imagens

<br/>
<a name="github-pages"></a>
### GitHub Pages

Por defeito, GitHub Pages está alojado no repositório `<username>.github.com`. Para se alojar uma página de um projecto, apenas é necessário criar um branch do repositório do projecto `gh-pages`. No meu caso, criei um repositório chamado "**blog**" e reproduzi-o na minha máquina local. Criei o branch e fiz `push`.
...

    git clone <repo> blog
    
    touch index.html
    
    git add -A
    
    git commit -m"init"

    git push origin master

    git checkout -b gh-pages

Alteração para assumir o sub-domínio:

    nano CNAME

adicionar o sub-domínio: blog.ricardopereira.eu e fazer push das alterações:

    git add -A
    
    git commit -m"Blog init"

    git push origin gh-pages

Para que o `master` fique actualizado apenas temos que garantir que apenas efectuados as alterações no branch.

    git checkout master
    
    git merge gh-pages
    
    git push origin master

    git checkout gh-pages


Logo, podemos aceder à página do repositório com:

    <username>.github.io/blog ou blog.ricardopereira.eu

#### Configuração do GoDaddy

...

#### Instalação do Jekyll

(Instalação do GEM)

    gem update --system
    
    gem install jekyll
    
    cd blog
    
    jekyll serve


Fiz download do Poole, para testar no local apenas é necessário
http://jekyllbootstrap.com
https://github.com/poole/poole
https://github.com/poole/hyde
https://github.com/poole/lanyon
e existem mais

<br/>
### Disqus

Comentários com DISQUS

Criar uma conta: https://ricardopereira.disqus.com/admin/universalcode/

<p align="center">
  <img src="/public/img/2014/jekyll-step-by-step/disuqs.png" alt="Gestor de comentários"/>
</p>

Nas configurações: https://ricardopereira.disqus.com/admin/settings/

Website Name, Website URL, Moderação - Non-verified,

No tabulador Advanced:
Trusted Domains coloquei o blog.ricardopereira.eu

https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions

Verificar o total dos comentários:

    <a href="http://erjjones.github.com{{ page.url }}#disqus_thread" data-disqus-identifier="{{ page.url }}"></a

<br/>
### Google Analytics
...

<br/>
### FontAwesome
...

<br/>
### Hover.css
...

<br/>
### MacDown
...

<br/>
### Tags
...

<br/>
### Tabelas
...

<br/>
### Breakline
...

<br/>
### Kudos
...

<br/>
### Centrar imagens
...

Abraço,

![Ricardo Pereira](/public/img/signature.png)
