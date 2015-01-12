---
layout: post
lang: PT
title: RESTful API com Controlo de Acesso
tags: [NodeJS, API, REST, OAuth, OAuth2]
---

Duas estratégias de controlo de acesso aos vários endpoints de uma API. Exemplo de implementação em Node.js.

---

Uma API (Application Programming Interface) serve para partilhar serviços já implementados de uma forma segura e controlada. É controlada porque só quem implementa a API é que decide as funções que quer disponibilizar, enquanto que a questão da segurança está dependente da concepção utilizada no momento do desenvolvimento da API.

É possível proteger o acesso à API com OpenID, OAuth (open standard to authorization), e outras especificações. No caso da OAuth, existem várias versões:

 - OAuth ([RFC 5849](http://tools.ietf.org/html/rfc5849)
 - OAuth 2.0 ([RFC 6749](http://tools.ietf.org/html/rfc6749))

Cada uma delas têm sub-versões, por exemplo, a OAuth 2.0 pode ser utilizada com bearer tokens ([RFC 6750](http://tools.ietf.org/html/rfc6750)).

<br/>
## OAuth

Com OAuth, o mais correcto seria implementar um Token provider e um API provider. O API provider simplesmente seria o servidor web que fornece o serviço da API mas apenas será possível aceder as suas funções com um token válido e associado a uma conta. Esse token é obtido pelo Token provider através das credenciais do utilizador. Dessa forma as credenciais nunca são expostas ao acesso à API.

Adaptando este conceito a uma aplicação que quer consumir uma API, apenas seria necessário uma chave secreta conhecida por ambos: API (servidor) e 3rd Part (cliente). A chave secreta servia para gerar o token para o acesso à API.

{% highlight js %}
var express = require('express');
var jwt = require('jwt-simple');
var app = express();

// Random secret key
app.set('secret', 'dq89"#wud_981h3-du2h3d37a3A_SD_!#E_"#dsd');

// Criar o token para o acesso
var token = jwt.encode({
  iss: 'ios'
}, app.get('secret'));

// Mostrar o token gerado para testar o acesso
console.log(token);

app.get('/', function(req, res) {
  res.send('API: <a href="api/get_users">get_users</a>');
});

app.get('/api/get_users', function(req, res, next) {
  var token = (req.query && req.query.access_token) ||
    (req.headers['x-access-token']); //Headers values

  // Verificar se o parâmetro existe
  if (token) {
    try {
      // Verificar token com a secret key
      jwt.decode(token, app.get('secret'));
      res.send('Success');
    } catch (err) {
      // Se não for possível fazer o decode, dá erro!
      res.end('No access', 400);
    }
  } else {
    next(); //Cannot GET /api/get_users
  }
});

app.listen(9000);
{% endhighlight %}

Token que é gerado com essa Secret Key:

    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpb3MifQ.nBNb_26D7hxaDk6J2rvvS3Kwn8PBCceBtW4C_WYfv_w

Para testar o acesso podemos utilizar o browser:

    http://localhost:9000/api/get_users?access_token=

Este método é suficientemente seguro para uma ligação em HTTPS, onde existe uma encriptação dos dados enviados à API. No caso de se usar HTTP sem a camada SSL/TLS, existe a possibilidade do token ser capturado e garantir o acesso a um intruso.

<br/>
## OAuth 2.0

A intenção do OAuth 2.0 foi de agilizar o processo da  criação de tokens. Conforme o [RFC 6750](http://tools.ietf.org/html/rfc6750):

> The access token provides an abstraction, replacing different authorization constructs (e.g., username and password, assertion) for a single token understood by the resource server.  This abstraction enables issuing access tokens valid for a short time period...

Deixa de existir a validação das credenciais dum Token provider para ser substituído por um single token válido por um periodo de tempo estabelecido pelo Authorization Server.

Depois de ter investigado um pouco sobre OAuth 2.0 encontrei um artigo bastante explicativo e completo: [OAuth Bearer Tokens are a Terrible Idea](http://hueniverse.com/2010/09/29/oauth-bearer-tokens-are-a-terrible-idea/) by Eran Hammer.

Resumindo explica que os single tokens apenas são seguros em HTTPS e será necessário mais algum recurso para garantir a protecção do acesso a uma API.

A estratégia que irei descrever futuramente, será com recurso ao `Passport.js`.

Abraço,

![Ricardo Pereira](/public/img/signature.png)

