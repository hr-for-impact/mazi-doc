---
title: Le kanban de recrutement
description: Description du kanban de recrutement
sidebar:
  order: 6
---

Le dossier recruitment contient :
- layout.tsx : responsable de la mise en page commune et de la vérification de l'authentification pour toutes les pages du recrutement.

- page.tsx : gère l'affichage et la gestion des candidatures via un tableau Kanban.

# Le kanban 
`page.tsx` à la racine de /recruitment utilise plusieurs composants contenus dans /components/kanbanCandidates.
![Kanban Structure](../../../../public/KanbanStructure.png)

Il utilise la bibliothèque `dnd kit` pour les fonctionnalités de drag-and-drop.Voici le lien vers la [documentation officielle](https://dndkit.com/) de la librairie.

Il contient une interface `step` qui définit la structure des étapes de recrutement.
Il utilise `useList`  pour récupérer la liste des jobs depuis Strapi et les trie par date de création.


## KanbanBoardContainer
C'est le conteneur principal. Il gère le défilement horizontal pour pouvoir afficher les différentes colonnes du kanban. Le composant rend les children (tous les éléments qu'il contient) à l'intérieur de la zone de défilement horizontale.


## Kanbanboard 
C'est le composant qui contient les fonctionnalités de Drag-and-drop. Pour cela, il importe la librairie dnd kit qui est une boite à outil permettant de transformer des composants en éléments et en zones déplaçables. 
Le composant `KanbanBoard` est une fonction qui accepte des propriétés :
- onDragEnd : une fonction appelée lorsque le drag-and-drop se termine.
- children: les éléments enfants à rendre à l'intérieur du Kanban.
Des capteurs de souris `MouseSensor` et de toucher `TouchSensor` sont configurés pour activer le drag-and-drop après que l'utilisateur ait déplacé l'élément d'une distance de 5 pixels. 

La fonction `handleDragEnd` est appelée lorsque l'événement de drag-and-drop se termine. Si l'élément n'est pas placé sur une cible valide (event.over === null), la fonction se termine prématurément. Sinon, elle appelle la fonction 'onDragEnd' passée en tant que prop.

Le composant retourne une structure `div` imbriquée avec des styles pour créer la mise en page du tableau Kanban: 
- Le conteneur principal (div) a un affichage en colonne pour permettre au `div` interne d'occuper toute la hauteur disponible.
- Le conteneur interne (div) est configuré pour permettre le défilement horizontal et vertical et utilise le contexte DndContext fourni par la librairie dnd kit,  pour gérer le drag-and-drop.

## SortableContext
Le composant fourni par la librairie dnd kit gère le tri et la gestion des éléments au sein du kanban. Il permet de générer l'interface interactive du kanban.
Il accepte deux propriétés : 
- `items`: la liste des éléments à trier. Il s'agit ici d'un tableau de candidature (job apply des personnes qui ont liké un job, ou job apply des personnes qui ont postulé, ou encore job apply des candidatures dans le process de recrutement )
- `strategy`: la stratégie de tri. La stratégie choisie ici est `verticalListSortingStrategy` qui permet d'organiser les éléments verticalement.

