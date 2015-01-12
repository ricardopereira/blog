---
layout: post
lang: PT
title: RESTful API com Node.js
tags: [NodeJS, API, REST, Case Study]
---

Hoje em dia são poucas as aplicações que não necessitam de um backend service para suporte de dados. Para um indie developer é fundamental ter esse conhecimento.

---

O mais comum para ter um backend para uma aplicação será desenvolver um web service para ser consumido. São várias as possibilidades mas as mais comuns são:

 - REST (Representational State Transfer).
 - SOAP (Simple Object Access Protocol).

<div class="message">
Não sou muito adepto de ver conceitos teóricos num blog, por isso não o vou fazer. Prefiro explicar por miúdos o que se trata e se tiveram curiosidade em explorar mais sobre o tema podem sempre utilizar o <a href="http://duckduckgo.com">DuckDuckGo</a>.
</div>

Existem muitas diferenças entre REST e SOAP porque na realidade são coisas distintas. O SOAP é um protocolo enquanto REST é um modelo de arquitectura. É possível compará-las da seguinte forma:

 - Formato da mensagem:
   - SOAP por defeito usa XML.
   - REST tem a possibilidade de usar XML, Atom, JSON, etc. Costuma-se implementar em JSON porque se torna mais simples a leitura dos dados por existirem bons interpretadores nativos em JavaScript, Java, Objective-C, Swift, etc.
 - Protocolo de comunicação:
   - SOAP pode-se usar HTTP(S), SMTP, TCP e UDP.
   - REST pode-se usar em qualquer protocolo, é independente.

Temos muitas opções para a criação de uma RESTful API. Algumas delas são:

 - [Node.js](http://nodejs.org) (JavaScript)
 - [Grape](http://intridea.github.io/grape/) (Ruby)
 - [Flask](http://flask.pocoo.org) (Python)
 - [Play](https://www.playframework.com) (Scala ou Java)
 - [Martini](http://martini.codegangsta.io) (Go)
 - [Slim](http://slimframework.com) (PHP)

<br/>
## Node.js

Neste momento estou a utilizar [Node.js](http://nodejs.org) juntamente com [Express.js](http://expressjs.com). Node é um interpretador de JavaScript do lado do servidor, enquanto que Express é uma framework para Node e dá a possibilidade de criar aplicações web de forma bastante simples.

> With a myriad of HTTP utility methods and Connect middleware at your disposal, creating a robust user-friendly API is quick and easy.
> 
> Easily building fast, scalable network applications: 
> [download](http://nodejs.org/download/)

Os binários `node` e `npm` ficam disponíveis após a instalação do Node.js. O node é o compilador e o [npm](https://www.npmjs.org) é o package manager oficial do Node.js.

<br/>
## Exemplo: api/get_users

Para se iniciar um projecto de raiz na directoria `NodeServer`:

    mkdir NodeServer
    cd NodeServer
    npm init

O comando `init` irá configurar o projecto criando o ficheiro `package.json`. O ficheiro contém toda a configuração necessária. Por exemplo, para as seguintes opções:

    name: (NodeServer)
    version: (0.0.0) 1.0.0
    description: Exemplo de um RESTful API
    entry point: (index.js) app.js
    test command:
    git repository:
    keywords: API
    author: Ricardo Pereira
    license: (ISC) MIT

irá gerar o seguinte `package.json`:

{% highlight json %}
{
  "name": "NodeServer",
  "version": "1.0.0",
  "description": "Exemplo de um RESTful API",
  "main": "app.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Ricardo Pereira",
  "license": "MIT"
}
{% endhighlight %}

Para se instalar módulos, neste caso o Express.js, basta correr o seguinte comando:

    npm install express -S

O atributo `-S` serve para guardar a dependência no `package.json`. Se formos confirmar:

    cat package.json
{% highlight json %}
{
  "name": "NodeServer",
  "version": "1.0.0",
  "description": "Exemplo de um RESTful API",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Ricardo Pereira",
  "license": "MIT",
  "dependencies": {
    "express": "~4.9.0"
  }
}
{% endhighlight %}
    
No exemplo, decidi que a aplicação iniciasse com o ficheiro `app.js`. Para o criar:

    touch app.js

<br/>
Com a framework torna-se super simples criar uma API para ser consumida em REST. Por exemplo, para se aceder a uma lista de utilizadores (colocar o código no ficheiro `app.js`):

{% highlight js %}
var express = require('express');
var app = express();
    
// Definir a route principal
app.get('/', function(req, res) {
  res.send('Welcome to API');
});

// Lista de Utilizadores
var users = [
  { id: 1, username: 'Manuel', email: 'manuel@examplo.com' },
  { id: 2, username: 'Maria', email: 'maria@examplo.com' }
];

// Definir um endpoint da API
app.get('/api/get_users', function(req, res, next) {
  res.send(users);
})

// Aplicação disponível em http://127.0.0.1:9000/
app.listen(9000);
{% endhighlight %}
    
Com uma dúzia de linhas e ficamos com uma RESTful API pronta a ser usada. Para correr a aplicação:

    node app.js

Neste momento a aplicação está à escuta na porta 9000. Para testar o acesso à API: <a href="http://localhost:9000/api/get_users" target="_blanc">http://localhost:9000/api/get_users</a>

**Resultado**:
{% highlight json %}
[
  {
    "id": 1,
    "username": "Manuel",
    "email": "manuel@exemplo.com"
  },
  {
    "id": 2,
    "username": "Maria",
    "email": "maria@exemplo.com"
  }
]
{% endhighlight %}

<br/>
## Conclusão

Neste exemplo, qualquer cliente tem acesso à API e por isso não é boa prática usá-lo em produção. O [próximo artigo](/2014/09/16/PT-access-control-for-nodejs-restful-api/) será sobre as várias estratégias de como proteger o acesso à API.

Abraço,

![Ricardo Pereira](/public/img/signature.png)

