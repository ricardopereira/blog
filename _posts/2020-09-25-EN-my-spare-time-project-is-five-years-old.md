---
layout: post
lang: EN
title: My spare time project is five years old!
tags: [iOS, Money, Finance]
---

[Money](https://itunes.apple.com/pt/app/money-the-fastest-expense-tracker/id1076339783?l=en) v5 has been released with iOS 14 support.

---

![Money version five cover](/public/img/2020/money-v5-cover.png)

I never believed I would still work on this small project I created five years ago to control my expenses, but here I am. At that time, I used many bank accounts looking for the best bank of the market and having transactions from different accounts, handling expenses that I bought without a card, handling transactions with my cashback credit card... wasn't easy.

I know, I know, there are plenty of financial apps in the App Store and I tried many of them (believe me), but none of them offered me simplicity, focused analytics, and privacy.

> Money is a **basic income & expense tracker, a budget manager focused on simplicity.**

With [Money](https://itunes.apple.com/pt/app/money-the-fastest-expense-tracker/id1076339783?l=en), tracking my daily transactions is extremely fast and easy (it remembers your spending), and I can review them daily, weekly, and monthly. The app is focused on privacy. It stores the data safely in Apple servers using iCloud, and it offers secure access using technologies like Keychain, Face ID & Touch ID provided by the system. Unlike many other financial apps, the app doesn't require account creation. The user "account" is the Apple ID that's already signed into the device.

## Version 5

It's been a long time since the last update. That certainly wasn't intended, but since I want to create a macOS app for [Money](https://itunes.apple.com/pt/app/money-the-fastest-expense-tracker/id1076339783?l=en), I needed data synchronization in the app to use the same database in both platforms. Initially, the data was stored locally using Realm, but, since I wanted to enable iCloud synchronization, I decided to upgrade the whole app and use CoreData with CloudKit support. It was a long run, but finally it's done. I decided to improve the test suite (core functionality and business logic is fully tested) in the middle. I introduced SwiftUI and replaced RxSwift with Combine in the app, so I had to bump the minimum deployment target to iOS 13. And last but not least, I implemented a Financial Insights widget for iOS 14. It's a focused and configurable widget where you can choose the balance's date interval and choose specific categories and tags to check during the day.

Anyway, the wait is over and I believe it was worth it! Version 5.0 of Money for iOS is now available in the App Store.

<br>

If you are interested in more about the mobile development and/or personal finance, then follow me on [Twitter](https://twitter.com/ricardopereiraw).

Thanks for reading,

RP
