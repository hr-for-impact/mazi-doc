---
title: Gestion de comptes
description: A reference page in my new Starlight docs site.
sidebar:
  order: 2
---

Actuellement la connexion se fait en _passwordless_ et sur _Google auth_.
La gestion du login est géré entre Strapi et le front grace à la librairie _next-auth_

la partie Google auth était presque directe, seulement la partie JWT doit bien être connectée à Strapi.

La partie passwordless était un petit peu complexe à mettre en place mais ça a bien fonctionné au final :
1. au moment du signin, on appelle la méthode `send-link` du plugin passwordless.
2. ceci va envoyer un email avec un lien contenant un token
3. en cliquant sur le lien, on passe par la méthode `signIn` de next-auth
4. celle-ci va appeler la méthode `login` de passwordless, qui récupère le JWT depuis Strapi
