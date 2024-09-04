---
title: La gestion des jobs
description: Description de la gestion des jobs
sidebar:
  order: 6
---

L'architecture du dossier pour la gestion des jobs est organisée comme suit :

```plaintext
jobs/
  ├── create/
  ├── edit/
  ├── layout.tsx
  └── page.tsx
`````

- create/ : Ce dossier contient la page permettant de créer un job.

- edit/ : Ce dossier contient la page permettant d'éditer un job.

- layout.tsx : responsable de la mise en page commune utilisée par les différentes pages de gestion des jobs. Il inclut également une vérification d'authentification pour s'assurer que l'utilisateur est connecté avant d'afficher le contenu.

- page.tsx : Le fichier situé à la racine du dossier jobs est responsable de l'affichage de la liste des jobs et de la gestion de plusieurs actions pour le recruteur à savoir la création, l'édition, la suppression et la duplication des jobs.

## La liste des jobs

La fonction principale JobsList utilise plusieurs hooks :
- `useGetIdentity` pour obtenir les informations de l'utilisateur
- `useUpdate` pour mettre à jour un job
- `useCreate` pour créer un job
- `useRouter` de next/navigation est utilisé pour la navigation.
- `useTable` est utilisé pour configurer les propriétés du tableau affichant les jobs. Les données sont synchronisées avec l'URL (syncWithLocation). Des métadonnées (meta) spécifient les relations à peupler, et des filtres et trieurs permanents sont définis pour restreindre les jobs affichées en fonction des business units et des entreprises auxquelles l'utilisateur connecté est associé; ainsi que pour trier les jobs par statut (activée/désactivée) et date de création (du plus récent au plus ancien)

La fonction `toggleJobStatus` permet de basculer le statut d'un job entre activé et désactivé en utilisant le hook useUpdate.

La fonction `generateUniqueSlug` génère un slug unique basé sur un titre donné, en évitant les duplicatas avec des slugs existants.

La fonction cloneJob duplique un job existant en créant une nouvelle entrée avec les mêmes propriétés, à l'exception de l'ID, des dates de création et de mise à jour, et du slug. Pour s'assurer que le job dupliqué comporte un slug unique, elle utilise la fonction `generateUniqueSlug`.

## La création d'un job 
Le plugin [`slugify`](https://market.strapi.io/plugins/strapi-plugin-slugify) est utilisé pour générer des slugs uniques basés sur les titres des questions.

La fonction principale JobCreate utilise `useGetIdentity` pour obtenir les informations de l'utilisateur connecté.
Elle utilise `useCreate` pour créer de nouveaux jobs et `useList` pour obtenir les questions des recruteurs pour le scoring.

La création d'un job se fait à partir d'un formulaire divisé en deux étapes grâce à `useStepsForm` :
- La 1ère étape permet au recruteur de renseigner les diverses informations sur le job (le titre, la description, l'unité d'affaires, le domaine, le type de contrat, etc...).
- Dans la 2e étape, le recruteur répond aux questions pour établir le scoring du poste.

Avant de soumettre le formulaire, les valeurs sont transformées pour correspondre au format attendu par strapi grâce à la fonction `transformedValues`.

La fonction `onMutationSuccess` gère le succès de la mutation en créant un environnement de travail pour le job basé sur les réponses aux questions du recruteur. En cas d'erreur, la fonction `onMutationError` affiche les erreurs pertinentes.

Les options de sélection pour les business units et les domaines sont fournies par les hooks `useSelect`, qui récupèrent les données nécessaires et les filtrent en fonction des permissions de l'utilisateur.

## L'édition d'un job
De même que pour la création d'un job, la page utilise le plugin [`slugify`](https://market.strapi.io/plugins/strapi-plugin-slugify).

La fonction principale *JobEdit* initialise plusieurs hooks pour obtenir les informations de l'utilisateur (useGetIdentity), créer de nouvelles entrées (useCreate), et mettre à jour des entrées existantes (useUpdate). Elle récupère également les questions des recruteurs via `useList` pour les intégrer dans le formulaire.

Le formulaire d'édition est également configuré en deux étapes en utilisant `useStepsForm`:  une première étape qui affiche les données du job et une deuxième étape qui affichent les réponses aux questions pour le scoring. Les données du job à éditer sont récupérées via queryResult.

Une fonction `extractInitialValues` est définie pour extraire les valeurs initiales des blocs de données strapi du job (bloks Contract Type et Job item list). Cette fonction traite les différents blocs et les transforme en un format approprié pour être utilisé comme valeurs initiales dans le formulaire.

Lorsque le formulaire est soumis, les données sont à nouveau transformées pour correspondre au format attendu par strapi. Si le job possède déjà un environnement de travail, les données sont mises à jour en utilisant `useUpdate`. Sinon, un nouvel environnement de travail est créé en utilisant `useCreate`. Les mutations sont gérées de manière asynchrone, avec des notifications de succès et de gestion des erreurs appropriées.

## La localisation des jobs
En créant ou en éditant un job, le recruteur choisit dans une liste de département (dans le select).
Cette liste dépend de la business unit selectionnée:
- Si il y a un plusieurs départements rattachés à la business unit, la liste contient uniquement ces départements.
- Si aucun département n'est rattaché à la business unit selectionné, la liste contient tous les département de France (dans locations).