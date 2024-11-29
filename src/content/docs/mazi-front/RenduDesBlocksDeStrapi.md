---
title: Rendu des blocks de Strapi 
description: Rendu des blocks de Strapi avec Strapi Blocks React Renderer
sidebar:
  order: 2
---

## Utilisation de Strapi Blocks React Renderer pour le rendu des Blocks de Strapi.

La librairie est utilisée pour afficher dynamiquement des blocs de contenu provenant de Strapi. Voici quelques indications pour l'utiliser, sans avoir à consulter la documentation officielle.
Pour plus d'informations, aller sur ce lien pour découvrir la documentation officielle : [https://github.com/strapi/blocks-react-renderer](https://github.com/strapi/blocks-react-renderer).

## Importation

Dans le fichier où vous souhaitez utiliser le BlocksRenderer, importez-le au début du fichier.

```jsx
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
```

## Utilisation de base

Le composant `BlocksRenderer` prend un prop `content` qui correspond à un tableau d'objets représentant les blocs de contenu. Voici un exemple simple d'utilisation :

```jsx
"use client";
import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const CguComponent = ({ blocks }) => {
  if (!blocks) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <BlocksRenderer content={blocks} />
    </div>
  );
};

export default CguComponent;

```

Dans cet exemple, `blocks` représente le contenu des CGU récupéré depuis Strapi.

## Personnalisation des blocs

Les blocs peuvent être de plusieurs types tels que *paragraph*, *heading* ou encore *list*.

Selon le type de blocs, on peut personnaliser la façon dont chaque type de bloc est rendu en passant un objet `blocks` au composant `BlocksRenderer`. Voici un exemple qui personnalise l'affichage des paragraphes et des listes :

```jsx
<BlocksRenderer 
  content={blocks} 
  blocks={{
    paragraph: ({ children }) => <p className="text-gray-700">{children}</p>,
    list: ({ children, format }) => format === 'unordered' ? 
      <ul className="list-disc list-inside">{children}</ul> : 
      <ol className="list-decimal list-inside">{children}</ol>,
    'list-item': ({ children }) => <li>{children}</li>,
  }}
/>
```

Dans cet exemple :

- Les paragraphes (`paragraph`) sont stylisés avec une couleur de texte personnalisée.
- Les listes peuvent être ordonnées (`ol`) ou non ordonnées (`ul`), avec des classes Tailwind CSS appliquées pour la mise en forme.

##