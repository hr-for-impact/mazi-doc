---
title: Le kanban de recrutement
description: Description du kanban de recrutement
sidebar:
  order: 7
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
`useList`est utilisé pour récupérer la liste des candidatures (job-apply) à partir des jobs, incluant également les informations sur `candidate`et `job_apply_step`. Les candidatures sont triées de la plus récente à la plus ancienne. La pagination est désactivée pour récupérer toutes les informations disponibles et les afficher d'un seul coup. Un filtre est appliqué lorsqu'un job est sélectionné (via le select).
La fonction `refetchApplications`permet de redéclencher une requête API et mettre à jour les données récupérées.

La variable `applicationSteps` est la liste des job-applies dans un format structuré pour le kanban. C'est un objet contient 3 tableaux :
- `interested`: regroupe les job-applies des candidats qui ont liké le job
- `applied`: regroupe les job-applies des candidats qui ont postulé au job
- `steps`: regroupe les job-applies des candidats qui ont intégré le process de recrutement (à contacter, entretien Rh planifié, ...)
Ici, useMemo est utilisé pour mémoriser cette liste des candidatures et ne la mettre à jour que si la liste des étapes de candidature change (steps) ou la liste des job-applies change (applications).

A chaque déplacement des cards de candidature, les job-applies sont mise à jour dans strapi en utilisant le hook `useUpdate`. La fonction `updateApplication`est utilisée pour déclencher la mutation des données. `mutationOptions:{retry: 2}` permet d'ajouter une option supplémentaire à `mutate` qui est renommé ici en `updateapplication`: il s'agit de la propriété `onSucess` qui met à jour la liste des job-applies à chaque fois que la mutation réussit, via  refetchApplications.

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
`handleDragEnd` est définie dans /recruitment/page.tsx et passé en prop dans `KanbanBoard`. Elle orchestre la logique du drag-and-drop en gérant le déplacement des cards et en déclenchant des notifications à l'utilisateur.

Le composant retourne une structure `div` imbriquée avec des styles pour créer la mise en page du tableau Kanban: 
- Le conteneur principal (div) a un affichage en colonne pour permettre au `div` interne d'occuper toute la hauteur disponible.
- Le conteneur interne (div) est configuré pour permettre le défilement horizontal et vertical et utilise le contexte DndContext fourni par la librairie dnd kit,  pour gérer le drag-and-drop.

### SortableContext
Le composant fourni par la librairie dnd kit fournit un contexte pour les éléments qui peuvent être triés par glisser-déposer, permettant ainsi une réorganisation interactive de ces éléments.
Il accepte deux propriétés : 
- `items`: tableau d'identifiants représentant les éléments triables dans le contexte.
- `strategy`: la stratégie de tri. La stratégie choisie ici est `verticalListSortingStrategy` qui permet d'organiser les éléments verticalement.


### KanbanColumn
Chaque étape de candidature est rendue dans une colonne.
`kanbanColumn` accepte 5 props: 
- **id** : l'identifiant unique de la colonne,
- **title** : le titre de la colonne. Le nom est donné pour les deux premières colonnes ("a liké" et "a postulé"). Les colonnes suivantes prennent le nom des label des job_apply_step.
- **count** : le nombre d'éléments actuellement dans la colonne.
- **data** (optionnel): données supplémentaires passées au contexte de drag-and-drop, permettant de personnaliser le comportement du glisser-déposer pour la colonne.
- **children** : les éléments enfant à rendre dans la colonne.

Le composant utilise `useDroppable` de dnd-kit pour rendre la colonne réceptive au drag-and-drop. Il crée une zone de dépôt qui interagit avec les éléments qui peuvent être déplacés dans le tableau Kanban.
Le composant affiche un badge avec le nombre d'éléments (count) et utilise des icônes de tooltip pour fournir des informations supplémentaires aux utilisateurs. On y gère le scroll par colonne.

### KanbanItem
Le composant `KanbanItem` représente un élément individuel d'une colonne dans le tableau Kanban.
Il accepte 4 props:
- **id** : l'identifiant unique de l'élément qui est ici l'id du job-appy.
- **data** : l'objet contenant la candidature ainsi que l'identifiant de l'étape actuelle dans laquelle se trouve la candidature.
- **draggable** (optionnel) : booléen pour indiquer si l'élément peut être déplacé. Par défaut, il est à *true* pour les éléments de `kanbanItem`. Il est à *false* pour tous les éléments de la colonne "a liké".
- **children** : les éléments enfant à rendre dans la card.

`KanbanItem` utilise le hook `useDraggable` de dnd-kit pour rendre l'élément déplaçable. 
Le composant utilise `DragOverlay` pour afficher une version en surbrillance de l'élément lorsqu'il est en cours de déplacement. Cela offre un retour visuel immédiat à l'utilisateur.

### JobApplyCardMemo
Le composant `JobApplyCardMemo` affiche les informations sur une candidature à un job sous forme de carte.
Ce composant est mémorisé à l'aide de la fonction memo de React, ce qui optimise le rendu en évitant les re-rendus inutiles si les propriétés de la carte ne changent pas.
Il prend les propriétés suivantes :
- **id** : L'id du job apply en chaine de caractère.
- **name** : Le nom du candidat.
- **date** : La date de candidature.
- **rqth** : Le statut RQTH déclaré par le candidat.

Lorsqu'un utilisateur clique sur le nom du candidat, une fenêtre modale s'ouvre pour afficher plus d'informations.

Le composant utilise `ConfigProvider` d'Ant Design pour appliquer un thème personnalisé.

### JobApplyModal
Le composant `JobApplyModal` affiche les détails d'une candidature à un job dans une modale.
Il utilise notamment `react-pdf` pour afficher le CV du candidat.
La fonction `renderTextField` permet de rendre les champs de texte de manière uniforme. Si une valeur n'est pas spécifiée, elle affiche "Non spécifié".