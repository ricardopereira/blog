---
layout: post
lang: PT
title: Um novo blog
---

A satisfação e o processo de mudança de plataforma e de atitude. Tive em conta várias alternativas mas acabei por construir o meu novo blog em Jekyll.

---

## Valor e Personalidade

A leitura deste [artigo](https://medium.com/@gsto/how-i-used-writing-to-double-my-freelancing-rate-as-a-programmer-7b321bedecdc) incentivou-me a recriar o meu blog e a motivar-me a escrever tudo aquilo que eu considero relevante partilhar.

De uma forma resumida, o artigo revela a importância da escrita e da partilha de conhecimento de forma a criar valor. Ser valorizado garante credibilidade e confiança a qualquer profissional.

<br/>

> #### You Can Build Value and Authority By Teaching
> "The more a client believes that you can provide value, then the more likely they are to pay you to provide value for them."

<br/>

Para além de concordar com o que Glenn Stovall escreveu, tenho tomado consciência de que para um indie developer ou para um freelancer é necessário visibilidade na internet para conseguir mostrar o seu trabalho e com isto "angariar" possíveis clientes.

Pessoas como [Jared Sinclair](http://blog.jaredsinclair.com/post/93784230655), [Jeremy Olson](https://medium.com/@jerols/how-hours-became-a-top-grossing-app-c9b5abfcda7f), [Alex Cican](http://alexcican.com/post/455k-users/) ou [Pieter Leves](https://levels.io/product-hunt-hacker-news-number-one/) são prova de que a visibilidade na internet faz uma grande diferença.

<br/>
#### Mais vantagens em ter um blog?

Os portfólios online são cada mais homogéneos e um blog será uma boa maneira de demonstrar a nossa atitude, organização e empenho e de uma certa forma traçar a nossa personalidade. Considero que um blog seja importante para reter as minhas ideias, opiniões e experiências que vou tendo. E como sozinhos não somos nada, também o feedback que possa surgir com as minhas partilhas será um bom motivo para ter um blog.

E por fim... a missão de ajudar o próximo! ; )

<br/>
## Missão

O meu antigo blog foi um fracasso pelo simples facto de nunca ter escrito nenhum artigo (assim torna-se difícil, eu sei). Daí eu ter noção que será necessário fazer um compromisso.

A minha ideia será lançar um artigo de 2 em 2 semanas e para mim "missão dada é missão cumprida" : )

<br/>
## Escolha da Plataforma

O meu antigo blog estava alojado num Raspberry Pi utilizando a plataforma [Ghost](https://ghost.org). Era um servidor web bastante caseiro, ligado à internet por um router vulgar.

### Contratempos
 - **Truques do ISP:** a infelicidade do provedor de internet reconfigurar o router fazendo com que os redireccionamentos que tinha configurado fossem à vida... o resultado: sem acesso ao blog.
 - **Raspberry Pi:** o backoffice do Ghost demorava cerca de 7 minutos a abrir.
 - **Actualizações:** Ghost é uma plataforma potente mas ainda está em constante desenvolvimento e por isso é importante mantê-lo actualizado.

<br/>
### Requisitos
**Por ordem de prioridade**

 1. Livre e sem custos
 2. Artigos escritos em _Markdown_
 3. RSS
 4. Domínio próprio
 5. Destaque de sintaxe de várias linguagens de programação
 6. Implementação rápida
 7. Comentários
 8. Responsivo
 9. Páginas estáticas
 10. Histórico dos artigos

<br/>
### Plataformas

Esta é a lista de plataformas que investiguei para o meu blog:

 - [Medium](https://medium.com) - "Everyone's stories and ideas."
 - [Svbtle](https://svbtle.com) - "A blogging platform designed to help you think."
 - [Octopress](http://octopress.org) - "A blogging framework for hackers."
 - [Tumblr](https://www.tumblr.com) - "Follow the blogs you've been hearing about.
Share the things you love."
 - [Ghost](https://ghost.org) - "Just a blogging platform."
 - [Middleman](http://middlemanapp.com) - "Static site generator using all the shortcuts and tools in modern web development."
 - [Jekyll](http://jekyllrb.com) - "Static site generator, an open-source tool for creating simple yet powerful websites of all shapes and sizes."

De todas elas, as que descartei de imediato foram:

- **Ghost:** é sem dúvida uma das minhas favoritas mas... não preciso de "tanta artilharia para o meu canhão".
- **Middleman:** a base é Sinatra, uma framework em ruby e nunca programei nessa linguagem. Falhou no requisito **6**.
- **Tumblr:** não sei bem explicar o motivo mas talvez por ser muito mainstream e teria que criar o meu próprio tema. Falhou no requisito **6**.

<br/>

Features | Medium | Svbtle | Jekyll / Octopress\* |
------------ | ------ | ------ | ------ |
Markdown | no | yes | yes |
Responsive | yes | yes | yes |
Custom domain | no | yes ($6/month) | yes ([GitHub Pages](https://pages.github.com)) |
RSS | yes | yes | yes |
Comments | yes | no | yes ([Disqus](http://disqus.com)) |
Static pages | no | no | yes |
Notes | Possibilidade de adicionar comentários a um parágrafo, incorporar vídeos, recomendação de histórias, seguidores e aplicação para iOS | Integração com Google Analytics, kudos e guardar artigo como rascunho | Integração com o GitHub, possibilidade de implementar _Tags_,... liberdade de construção |

<sub>
\* Octopress é baseado em Jekyll.
</sub>

<br/>
### Vencedor

Daquilo que andava à procura é sem dúvida o mais indicado e para além de não necessitar de base de dados será uma mais valia para o alojamento do blog. Um simples serviço para armazenamento de arquivos serve para o blog ficar disponível publicamente.

Tem cerca de 17.000 favoritos no GitHub!

<p align="center">
  <img src="/public/img/a-new-blog/jekyll-github-favs.png" alt="Total de favoritos do repositório do Jekyll no GitHub"/>
</p>

> Jekyll is a simple, blog aware, static site generator. It takes a template directory [...] and spits out a complete, static website suitable for serving with Apache or your favorite web server. This is also the engine behind GitHub Pages, which you can use to host your project’s page or blog right here from GitHub.

O próximo artigo será sobre a criação do blog e irei explicar todos os passos necessários.

Bem-vindos,

![Ricardo Pereira](/public/img/signature.png)