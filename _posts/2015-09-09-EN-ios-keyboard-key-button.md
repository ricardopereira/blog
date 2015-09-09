---
layout: post
lang: EN
title: iOS Keyboard Key Button
tags: [iOS, Swift, Keyboard]
---

If you're creating a custom iOS keyboard, this may interest you.

---

Since iOS8 it is possible to add third-party keyboards onto the system and I decided to create one because I am missing an important feature.

<p align="center">
  <img src="/public/img/2015/ios-keyboard-key-button/ios9-keyboard.png" alt="Native keyboard"/>
</p>

I'm creating a custom keyboard and I want it to have a look and feel like the native keyboard. So I downloaded the [iOS 9 GUI sketch file](https://designcode.io/ios9) from [MengTo](https://twitter.com/mengto) and analysed each button property.

<p align="center">
  <img src="/public/img/2015/ios-keyboard-key-button/key-properties.png" alt="Sketch Key properties"/>
</p>

The button needs corner radius and a bottom shadow with no blur. The shadow has only 2 points "height".

{% highlight swift %}
globeButton.setImage(UIImage(named: "Globe"), forState: .Normal)
globeButton.backgroundColor = UIColor(red: 171, green: 178, blue: 186, alpha: 1.0)
// Shadow and Radius
globeButton.layer.shadowColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.25).CGColor
globeButton.layer.shadowOffset = CGSizeMake(0.0, 2.0)
globeButton.layer.shadowOpacity = 1.0
globeButton.layer.shadowRadius = 0.0
globeButton.layer.masksToBounds = false
globeButton.layer.cornerRadius = 4.0
{% endhighlight %}

**The result:**

![Result](/public/img/2015/ios-keyboard-key-button/globe-button.png)

<br/>
Again, I hope you like it.

Cheers,

![Ricardo Pereira](/public/img/signature.png)

