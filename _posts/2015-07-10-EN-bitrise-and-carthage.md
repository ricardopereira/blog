---
layout: post
lang: EN
title: Bitrise and Carthage
tags: [iOS, CI, ]
---

[Bitrise](https://www.bitrise.io) doesn't have a task for Carthage, at least for now. Here is how you can add [Carthage](https://github.com/Carthage/Carthage) support on your workflow.

---

Bitrise is an iOS Continuous Integration and Delivery that allows you to manage each project workflow with some nice integrations:

 - Deploy to Amazon S3
 - Run CocoaPods install
 - Fabric / Crashlytics deployer
 - HockeyApp Deploy
 - Send Email with Mailgun
 - Deploy to iTunes Connect
 - Send Push Notification with Parse
 - Select Xcode version
 - Send Slack message
 - Twilio SMS Text Message Sender
 - Xcode: Build
 - Xcode: Unit Test
 - FTP Upload
 - Git Clone Repository
 - Ruby Script runner
 - ...

You can customize your workflow with different tasks based on integrations. One of them is CocoaPods and before building the source, it will install all your pods like you do on your Mac.

Certainly, [CocoaPods](https://cocoapods.org) is a standard for 3rd party code but now we also have Carthage that give you the possibility to add dependencies and is intended to be the simplest way to add frameworks to your Cocoa application.

It doesn't have `Carthage build` task but we have `Bash Script Runner`!

Perfect, so let's do this.
<br/>
<br/>
<br/>

## <img src="https://cloud.githubusercontent.com/assets/432536/5252404/443d64f4-7952-11e4-9d26-fc5cc664cb61.png" width="64" height="64"> Carthage build

You repository need a `Brewfile` and make sure to commit your `Cartfile.resolved`, because it is necessary to build the same framework versions.

Add this `Brewfile` to your repository:

```
brew "carthage"
```

<br/>
Now, go to your workflow and add a `Bash Script Runner` after `Git Clone Repository`:

<p align="center">
  <img src="/public/img/2015/bitrise-and-carthage/bash-task.png" alt="Bash task"/>

<br/>
Then add this script:

{% highlight bash %}
#!/bin/bash

echo ""
echo "-------------------------------------------------"
echo "Installing dependencies"
echo "-------------------------------------------------"
# Brewfile
brew update
brew tap homebrew/bundle
brew bundle

# Carthage
echo ""
echo "-------------------------------------------------"
echo "Carthage"
echo "-------------------------------------------------"
carthage bootstrap
{% endhighlight %}

And you're done. I hope that Bitrise team will add this integration because it will be needed many times for me...

<br/>
Like Bitrise team says: _Happy building!_

Cheers,

![Ricardo Pereira](/public/img/signature.png)

