---
title: Le kanban de recrutement
description: Description du kanban de recrutement
sidebar:
  order: 6
---

Le dossier recruitment contient :
- layout.tsx : responsable de la mise en page commune et de la vérification de l'authentification pour toutes les pages du recrutement.

- page.tsx : gère l'affichage et la gestion des candidatures via un tableau Kanban.

## Le kanban 
`page.tsx` à la racine de /recruitment utilise la bibliothèque `dnd kit` pour les fonctionnalités de drag-and-drop. Il s'agit une boite à outil permettant de transformer des composants en éléments et en zones déplaçables. Voici le lien vers la [documentation officielle](https://dndkit.com/) de la librairie.


### La gestion des jobs
`useList` est utilisé pour récupérer la liste des jobs depuis Strapi et les trie par date de création (du plus récent au plus ancien).
Un composant de sélection `Select` de la bibliothèque Ant Design permet à l'utilisateur de choisir un job parmi la liste des jobs récupérés.
La valeur sélectionnée est `selectedJobId` qui est une variable d'état contenant l'ID du job actuellement sélectionné.
A chaque fois que la sélection change, la fonction `handleJobChange` est appelée. Elle met à jour l'ID du job sélectionné (selectedJobId), le titre du job (selectedJobTitle) ainsi que l'url de la page.

### La gestion des étapes du process de recrutement
Une interface `step` définit la structure des étapes de recrutement.
La liste des étapes de recrutement est récupérée avec `useList` de la collection `JobApplyStep` dans strapi. Ces étapes sont triés dans l'ordre croissant par le champ "order". **L'ajout d'une nouvelle étape de candidature se fait donc dans Strapi en veillant à bien modifier l'ordre des étapes.**

### La gestion des candidatures
`useList`est utilisé pour récupérer la liste des candidatures (job-apply) à partir des jobs, incluant également les informations sur `candidate`et `job_apply_step`. Les candidatures sont triées de la plus récente à la plus ancienne. La pagination est désactivée pour récupérer toutes les informations disponibles et les affichées d'un seul coup. Un filtre est appliqué à la sélection d'un job (via le select).
La fonction `refetchApplications`permet de redéclencher une requête API et mettre à jour les données récupérées.

La variable `applicationSteps` est la liste des job-applies dans un format structuré pour le kanban. C'est un objet contenant 3 tableaux :
- `interested`: regroupe les job-apply des candidats qui ont liké le job
- `applied`: regroupe les job-apply des candidats qui ont postulé au job
- `steps`: regroupe les job-apply des candidats qui ont intégré le process de recrutement (à contacter, entretien Rh planifié, ...)
Ici, useMemo est utilisé pour mémoriser cette liste des candidatures et ne la mettre à jour que si la liste des étapes de candidature change (steps) ou la liste des job-applies change (applications).

A chaque déplacement des cards de candidature, les job-applies sont mise à jour dans strapi en utilisant le hook `useUpdate`. La fonction `updateApplication`est utilisée pour déclencher la mutation des données. `mutationOptions:{retry: 2}` permet d'ajouter une option supplémentaire à `mutate` qui est renommé ici `updateapplication`: il s'agit de la propriété `onSucess` qui met à jour la liste des job-applies à chaque fois que la mutation réussit, via  refetchApplications.

Le kanban utilise plusieurs composants contenus dans /components/kanbanCandidates.
![Kanban Structure](../../../../public/KanbanStructure.png)

### KanbanBoardContainer
C'est le conteneur principal. Il gère le défilement horizontal pour pouvoir afficher les différentes colonnes du kanban. Le composant rend les children (tous les éléments qu'il contient) à l'intérieur de la zone de défilement horizontale.


### Kanbanboard 
C'est le composant qui contient les fonctionnalités de Drag-and-drop de la librairie dnd kit.  
Le composant `KanbanBoard` est une fonction qui accepte des propriétés :
- onDragEnd : une fonction appelée lorsque le drag-and-drop se termine.
- children: les éléments enfants à rendre à l'intérieur du Kanban.
Des capteurs de souris `MouseSensor` et de toucher `TouchSensor` sont configurés pour activer le drag-and-drop après que l'utilisateur ait déplacé l'élément d'une distance de 5 pixels. 

La fonction `handleDragEnd` est appelée lorsque l'événement de drag-and-drop se termine. Si l'élément n'est pas placé sur une cible valide (event.over === null), la fonction se termine prématurément.
`handleDragEnd` est définie dans /recruitment/page.tsx et passé en prop dans `KanbanBoard`. Elle orchestre la logique du drag-and-drop en gérant le déplacement des cards et en déclenchant des notifications à l'utilsateur.

Le composant retourne une structure `div` imbriquée avec des styles pour créer la mise en page du tableau Kanban: 
- Le conteneur principal (div) a un affichage en colonne pour permettre au `div` interne d'occuper toute la hauteur disponible.
- Le conteneur interne (div) est configuré pour permettre le défilement horizontal et vertical et utilise le contexte DndContext fourni par la librairie dnd kit,  pour gérer le drag-and-drop.

### SortableContext
Le composant fourni par la librairie dnd kit gère le tri et la gestion des éléments au sein du kanban. Il permet de générer l'interface interactive du kanban.
Il accepte deux propriétés : 
- `items`: la liste des éléments à trier. Il s'agit ici d'un tableau de candidature.
- `strategy`: la stratégie de tri. La stratégie choisie ici est `verticalListSortingStrategy` qui permet d'organiser les éléments verticalement.
Le composant est appelé trois fois:
- dans un premier temps, il trie la liste des job-applies des candidats qui ont liké (tableau `intersted`)
- ensuite il trie la liste des job-applies des candidats qui ont liké (tableau `applied`)
- La liste des job-applies des candidats intégrés dans le process de recrutement (tableau `steps`) est transformé pour avoir la liste des candidatures pour chaque étape. Chacune de ces listes est trié par la suite.


