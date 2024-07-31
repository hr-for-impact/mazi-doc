---
title: Page "Home"
description: Description de la page home
sidebar:
  order: 1
---

La page d'accueil est actuellement gérée via Strapi. Sur Strapi, chaque élément de la page est géré par deux types de composants : un titre ou un composant de type "**blocks**".
### Composant de type "Blocks"
Le composant de type "blocks" est constitué des éléments suivants :

- **Titre du block** : Un titre spécifique pour ce block.
- **Image (facultatif)** : Une image associée au block.
- **Description** : Une zone de texte prenant en charge l'éditeur de texte Strapi.
- **Disposition (Side)** : Permet de gérer la disposition des éléments :
    - Left : L'image se trouve à gauche et le texte ainsi que le CTA (Call To Action) à droite.
    - Right : L'image se trouve à droite et le texte ainsi que le CTA à gauche.
    - Center : Tous les éléments sont centrés.
- **CTA (Call To Action)** : Un bouton permettant de rediriger l'utilisateur soit vers une page en ouvrant un nouvel onglet, soit en redirigeant directement (nommé "external").
SEO

Le SEO de la page d'accueil est également géré par Strapi et inclut les éléments suivants :

- **Meta Title** : Le titre de la page, affiché dans l'onglet du navigateur et utilisé par les moteurs de recherche.
- **Meta Description** : Une brève description de la page pour les moteurs de recherche.
- **Meta Image** : Une image utilisée pour les partages sur les réseaux sociaux.
- **Keywords** : Une liste de mots-clés pertinents pour la page.
- **Meta Robots** : Des directives pour les moteurs de recherche concernant l'indexation et le suivi des liens.
- **Structured Data** : Des données structurées pour améliorer la visibilité de la page dans les résultats de recherche.
- **Meta Viewport** : Des réglages pour le viewport afin d'assurer la compatibilité mobile.
- **Canonical URL** : L'URL canonique de la page pour éviter le contenu dupliqué.

Cette structure permet une gestion flexible de la page d'accueil, assurant à la fois une présentation visuelle et une optimisation pour les moteurs de recherche.