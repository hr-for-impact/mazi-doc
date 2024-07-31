---
title: Formulaire
description: Description des formulaires
sidebar:
  order: 2
---
## Documentation de la page de formulaire

La page de formulaire est divisée en deux sections principales : le formulaire candidat et le formulaire RQTH.

### Formulaire Candidat

Le formulaire candidat recueille toutes les informations relatives au candidat. Il est composé de plusieurs étapes (steps) permettant aux candidats de saisir leurs informations de manière structurée :

- **Step 1 : Informations personnelles**
  - Prénom du candidat.

- **Step 2 : Préférences de lieu de travail**
  - Affichage des lieux où des emplois sont disponibles.
  - Sélection du département souhaité via un champ de sélection multiple.

- **Step 3 : Secteurs souhaités**
  - Sélection des secteurs d'activité souhaités (checkbox).
  - Les secteurs sont récupérés depuis la collection "sector" dans Strapi.
  - Chaque secteur contient un nom et un "business_units" pour afficher les secteurs en fonction de la disponibilité des emplois.

- **Step 4 : Domaines d'expertise**
  - Sélection des domaines d'expertise, gérés par la collection "domain" dans Strapi.
  - Chaque domaine est lié à un emploi et possède un nom (exemple : "Développement IT").

- **Step 5 : Informations complémentaires**
  - Ajout d'informations supplémentaires pour le recruteur, y compris le téléchargement d'un CV ou un lien vers le profil LinkedIn du candidat.

### Formulaire RQTH

Le formulaire RQTH est conçu pour comprendre les besoins spécifiques des candidats en fonction de leur handicap. Il est entièrement géré par Strapi dans la collection "Question".

- **Structure des questions**
  - Chaque question a un nom et un type (question_type) qui détermine le nombre de réponses possibles.
  - Les types de questions peuvent être :
    - **Unique** : choix unique.
    - **Multiselect** : choix multiple.

- **Valeurs des réponses**
  - Chaque question contient des valeurs avec un nom et une valeur (0, 0.5 ou 1).
  - Une valeur de 1 indique des besoins particuliers pour cette question, tandis qu'une valeur de 0 indique aucun besoin.
  - Ajout de catégories aux valeurs des questions pour déterminer et scorer les besoins du candidat par catégorie (auditif, maladies invalidantes, cognitif, etc.).

- **Questions multiselect spécifiques**
  - Certaines questions multiselect auront des valeurs de 0 ou 1 et seront reliées à plusieurs catégories.

- **Relation entre questions et réponses**
  - Chaque question est reliée à plusieurs réponses, elles-mêmes reliées à un candidat pour déterminer les réponses en fonction des questions posées.

- **Organisation des questions**
  - Possibilité de définir l'ordre des questions avec le champ "order".
  - Option d'ajouter une image pour chaque question (facultatif).

Cette documentation vise à expliquer en détail la structure et la gestion des formulaires candidat et RQTH, facilitant ainsi la compréhension et l'utilisation de ces formulaires pour recueillir des informations pertinentes sur les candidats et leurs besoins spécifiques.