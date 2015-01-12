---
layout: post
lang: PT
title: Swift, a nova linguagem
tags: [Swift, iOS]
---

Uma nova linguagem desenvolvida pela Apple que reune o que de melhor existe num conjunto vasto de linguagens desde Objective-C, Rust, Haskell, Ruby, Python, C#, Java, ...

---

Desde o lançamento da versão beta, em Junho de 2014, que tenho vindo a acompanhar ligeiramente a evolução de Swift. Para além de estar atento às novidades que vão surgindo, também estou a embarcar na codificação de aplicações iOS com Swift.

Tenho cerca de 2 anos de experiência em iOS e como é óbvio, ainda me considero um programador junior em Objective-C. Da experiência que tenho, considero o Swift uma linguagem promissora!

{% highlight objective-c %}
// Objective-C
NSString *const trimmedText = [text stringByTrimmingCharactersInSet: [NSCharacterSet whitespaceAndNewlineCharacterSet]];
{% endhighlight %}

{% highlight swift %}
// Swift
let trimmedText = text.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceCharacterSet())
{% endhighlight %}

É possível reparar que não é necessário indicar ponto e vírgula, não é necessário indicar o tipo da variável (inferência do tipo pelo dado atribuído), a definição de uma variável constante através do operador `let`, etc.

Outras funcionalidades interessantes que poderão investigar pela [documentação oficial](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/):

 - Opcionals
 - Tuples
 - Generics
 - Advanced Operatores
 - Custom Operatores
 - Higher-order functions: map, filter, reduce
 - Type inference
 - ...

Mas muito mais para além da sintaxe e novas funcionalidades, com Swift temos: Type safety!

Objective-C é uma linguagem extremamente dinâmica, nenhum tipo é realmente conhecido no momento da compliação. Com isto, é permitido adicionar métodos e até classes em runtime, o que parece ser muito interessante para um programador mas por fim... será a desgraça dele próprio ;)

Uma linguagem dinâmica é um pau de dois bicos. Pode ser bastante flexível mas também pode dificultar imenso o debug de uma falha no momento em que existem problemas numa aplicação. Se fosse possível detectar todos os erros possíveis no momento da compilação, não seria um sonho? Ter a certeza que aquilo que compilamos não vai ter nenhuma consequência imprevisível! Isso é quase possível com o _Type safety_.

Abraço,

![Ricardo Pereira](/public/img/signature.png)

