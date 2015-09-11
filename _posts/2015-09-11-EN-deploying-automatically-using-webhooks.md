---
layout: post
lang: EN
title: Deploying Automatically using WebHooks
tags: [GitHub, NodeJS]
---

Time is precious.
Automate your processes.

---

Imagine you have a server running a website and you want to deploy a bunch of changes that you pushed to your GitHub repository. Ok... instead of login into the server and execute some commands to pull the changes, you can just setup a [WebHook](https://developer.github.com/webhooks/).

> Webhooks allow you to build or set up integrations which subscribe to certain events on GitHub.com. When one of those events is triggered, we’ll send a HTTP POST payload to the webhook’s configured URL.

Sounds simple and it is. I will use Node.js to interpret the triggered event from the repository (POST payload). Let's get started.

<br/>

# Node.js

(If your server don't have Node.js: [Installing Node.js via package manager](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager))

**Installation**

{% highlight bash %}
$ [sudo] apt-get install --yes nodejs
{% endhighlight %}

**Initialise**

{% highlight bash %}
$ [sudo] npm install npm -g

$ mkdir webhook
$ cd webhook

$ npm init
{% endhighlight %}

This command will prompt for a number of things such as the name and version of your application. For now, you can simply hit `RETURN` to accept the defaults for most of them.

We also need to install some dependencies.

{% highlight bash %}
$ npm install express -s
$ npm install shelljs -s
{% endhighlight %}

After that, if your choice for `entry point: (index.js)` was the default value then you need to create the file `index.js` with your preferred text editor.

I decided to run `git pull` when the server receives an event:

{% highlight javascript %}
var express = require('express');
var app = express();
var sh = require('shelljs');

app.get('/', function (req, res) {
  res.send('WebHook Receiver');
});

// Accept POST request
app.post('/run', function (req, res) {
  res.send('Request accepted');
  sh.exec('cd /path/to/www; git pull', function(code, output) {
    console.log('Exit code:', code);
    console.log('Program output:', output);
  });
});

var server = app.listen(4000, function () {
  var port = server.address().port;
  console.log('Listening at port: %s', port);
});
{% endhighlight %}

Finally, we can run the _WebHook Receiver_ forever and ever:

{% highlight bash %}
$ [sudo] npm install forever -g

$ forever start index.js

# You can check if it's running
$ forever logs
{% endhighlight %}

<br/>

# GitHub Settings

Now go to your repository settings -> _Webhooks & services_ -> _Add webhook_ and assign the _Payload URL_ with your server, for example: `http://x.x.x.x:4000/run`. Done.

Please consider [securing your webhooks](https://developer.github.com/webhooks/securing/).

<br/>

Best,

![Ricardo Pereira](/public/img/signature.png)

