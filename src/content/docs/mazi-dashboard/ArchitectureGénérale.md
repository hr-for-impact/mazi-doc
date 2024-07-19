---
title: Architecture générale
description: architecture générale.
sidebar:
  order: 1
---

# Structure Générale
Le repo `mazi-dashboard`contient le dossier src ainsi que plusieurs fichiers à la racine.

```plaintext
mazi-dashboard/
├── src/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── providers/
│   ├── utility/
├── .dockerignore
├── .env
├── .env.sample
├── .eslintrc.json
├── .gitignore
├── .npmrc
├── Dockerfile
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```
Les fichiers racine sont :
- dockerignore : spécifie les fichiers et dossiers à ignorer lors de la création de l'image Docker.
- .env : contient les variables d'environnement pour la configuration de l'application.
- .env.sample : Exemple de fichier des variables d'environnement.
- .eslintrc.json : configuration pour ESLint, l'outil de linting pour JavaScript et TypeScript.
- .gitignore : spécifie les fichiers et dossiers à ignorer par Git.
- .npmrc : Configuration pour npm. L'outil de gestion des packages JavaScript.
- Dockerfile : fichier de configuration pour la création de l'image Docker de l'application.
- next-env.d.ts : Déclarations de types pour Next.js, fournissant les types de base et globaux nécessaires au fonctionnement de Next.js avec TypeScript. Ce fichier est généré automatiquement et **ne doit pas être édité manuellement**.
- next.config.mjs : configuration pour Next.js.
- package.json : fichier de configuration des dépendances npm et des scripts de l'application.
- pnpm-lock.yaml : fichier de lock pour gérer les versions exactes des dépendances installées avec pnpm.
- README.md : fichier de documentation générale du projet. Ce fichier fournit notamment une vue d'ensemble du projet ainsi que des instructions pour démarrer
- tsconfig.json : configuration pour TypeScript.

## Le répertoire src
Le dossier `src` contient l'ensemble du code source de l'application organisé comme suit :
- **app** : contient les composants principaux de l'application.
- **components** : contient les composants réutilisables utilisés dans l'application.
- **[contexts](../contexts/)** : contient les définitions et les implémentations des contextes React utilisés pour gérer l'état global de l'application.
- **[providers](../providers/)** : contient les fournisseurs de services utilisés pour injecter des dépendances ou des services dans l'application via le contexte..
- **[utility](../utility/)**: contient des fonctions utilitaires et d'autres éléments qui sont utilisés dans l'application.

#### Fichiers à la racine de src/app
- **icon.ico** : fichier d'icône pour l'application.
- **layout.tsx** : composant de layout principal de l'application.
- **not-found.tsx** : page de gestion des erreurs 404.
- **page.tsx** : page principale ou point d'entrée de l'application.

