---
layout: post
lang: EN
title: UITableView with CAGradientLayer
tags: [iOS, Swift, UITableView]
---

How to create a nice fade effect on a `UITableView`.

---

I was looking a way to build something like this:

<p align="center">
  <img src="/public/img/2015/uitableview-with-cagradientlayer/example.jpg" alt="Result example"/>
</p>

<br/>

Initially I thought using `shadowImage` property where it is possible to render a shadow using an image which basically performs as any other UIImageView. However, I wanted to draw the shadow from code so I decided to use `CAGradientLayer`.

<br/>

{% highlight swift %}
let gradient = CAGradientLayer()

if let superview = tableView.superview {
    gradient.frame = superview.bounds

    let clearColor = UIColor.clearColor().CGColor
    let blackColor = UIColor.blackColor().CGColor    

    gradient.colors = [clearColor, clearColor, blackColor, blackColor, clearColor, clearColor]
    gradient.locations = [0.0, 0.15, 0.25, 0.75, 0.85, 1.0]
    superview.layer.mask = gradient
}

tableView.backgroundColor = UIColor.clearColor()
{% endhighlight %}

<br/>

Shadow from code could lead to performance issues where it is very easy to lose the 60 fps scroll on a table view if you set any shadow on a cell. You can draw a shadow based on path using the `shadowPath` property. The performance is way better than standard shadow drawing but it has a flaw - it does not resize. This can be easily achieved by subclassing the view and updating the shadow path with the `layoutSubviews` method. Last but not least, you can rasterize the shadow drawing with `shouldRasterize` property and setting the `rasterizationScale`.

The result:

<p align="center">
  <img src="/public/img/2015/uitableview-with-cagradientlayer/gradientlayer-mask.gif" alt="Result example"/>
</p>

<br/>
I hope you like it.

Cheers,

![Ricardo Pereira](/public/img/signature.png)

