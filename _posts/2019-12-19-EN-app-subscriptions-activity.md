---
layout: post
lang: EN
title: Analyse the performance of your app subscriptions
tags: [iOS, Subscriptions, In-App-Subscriptions, Analytics]
---

If you have an app that includes in-app subscriptions, then hopefully one day you’ll want to analyse the performance of each subscription or even the conversion rate from an introductory offer to a standard price.

---

Let’s imagine you have an app with a monthly subscription and that subscription has a free trial of 2 weeks as an introductory offer. Now you are looking for clean data in new trial initiation and members who continue to being a paying member from their free trial. With this in mind, let’s assume you want to track the following:

1. Number of new free trials
2. Number of conversions to standard price (the trial ends and the user didn’t cancelled the subscription)
3. Total of paying users (number of active subscriptions without free trials)
4. Total of users who cancelled within the free trial period

For this, you don’t need an external service, we can gain insights by using the App Store Connect and it doesn’t require any technical implementation. The **Sales and Trends** section offers you a couple of options, categories and filters to understand the subscription activity. Let’s have a look.

<br>

## Number of new free trials
I usually start by looking at the current state. Selecting the _Sales and Trends > State_ overview will show you the total of active subscriptions, including the total of free trials (represented by the Introductory Offer).

![](/public/img/2019/sales-active-subscriptions.png)

But this doesn’t answer your initial goal. You want to know how many new free trials happened between two dates. Select the _Event_ option and in there you can see the data by event like activations, cancelations, reactivations, etc. You can also filter data by selected date ranges, which is nice.

> Go to [Subscription Events](https://help.apple.com/app-store-connect/#/itc484ef82a0) to check the explanation of each event.   

Now, select the _Activations_ event type. The _Activations_ event type will gather all type of subscription activation like an introductory price begins or a subscription begins without an introductory offer, and that’s why we need to filter the data to just include the activation data with an introductory offer: hit _Add Filter > Current State_ and select _Introductory Offer_.

![](/public/img/2019/sales-activations-trials.png)

This will show you the number of new free trials.

<br>

## Number of conversions to standard price
I like this one since it’s easy and you don’t need to filter anything. It’s already available by default and the event is called: _Conversions to Standard Price_.

![](/public/img/2019/sales-conversion-to-standard-price.png)

The member switched from an introductory offer to a standard price subscription 🙌

<br>

## Total of paying users
Just go to the _State_ overview and filter by state: _Standard Price_ & _Billing Retry_. This will give you the total of subscribers that are really paying for the subscription, excluding the introductory offers, promotional offers, etc.

![](/public/img/2019/sales-paying-users.png)

<br>

## Total of users who cancelled within the free trial period
Last but not least, since this is relevant information to understand if members enjoyed the trial or not. Select event type _Cancellations_ and filter by _Previous State_. The _Previous State_ should be Introductory Offer.

![](/public/img/2019/sales-cancelled-within-free-trial.png)

If you have 200 new free trials and after the trial you have 100 members that cancelled the subscription, then you lost half of your leads. If that’s the case, then it’s time to reflect what’s going on. For example, try to see the percentage breakdown of reasons for a cancelled subscription for a selected end date, including billing issues and price increases.

<br>

## Conclusion
It’s always important to keep some anonymous data about your app where you can understand if the app and its features are doing a good job. There are many services where you can send and analyse the data like Mixpanel, Amplitude, Google Analytics, but good metrics are hard to achieve and sometimes Apple does part of the job for us and tracking metrics about subscriptions is one of them.

Extra: [Subscription Offers Best Practices - WWDC 2019 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2019/305)

If you are interested in more about the Apple ecosystem, then follow me on [Twitter](https://twitter.com/ricardopereiraw).

Best,

![Ricardo Pereira](/public/img/signature.png)

