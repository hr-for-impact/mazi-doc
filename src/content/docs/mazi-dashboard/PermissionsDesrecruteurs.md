---
title: Les droits d'accès des recruteurs
description: Description des différents types de recruteurs et de leurs accès
sidebar:
  order: 5
---

Il y a 3 rôles au niveau des recruteurs
- recruiter: il a une ou plusieurs business units (BU) rattachée(s) ainsi qu'une compagnie. Il a uniquement accès au informations concernant les BU associées. Il peut par exemple créer/éditer/dupliquer des jobs pour ces BU ou encore éditer la description de ces BU.
- recruiter-chief: il a une compagnie rattachée et aucune BU. Il a accès aux informations concernant toutes les BU de l'netreprise.
- admin : il n'a aucune BU rattachée ni entreprise rattachée. Il a accès à toutes les informations des entreprises.

Les permissions sont définies dans src > providers > auth-provider.ts.
on a la fonction asynchrone `getPermissions`qui récupère et les traite les permissions d'un recruteur connecté:
-  Elle commence par récupérer un jeton d'authentification (token) à partir des cookies
- un type `IUserMaazi` est défini qui pour structurer les données récupérées (`data`).
- les données sont récupérées en faisant appel à la méthode `me()`fournies par `strapiAuthHelper`. Elle contienent le tableau des BU (qui peut être vide) et les informations de l'entreprise dans company (qu peut être null).
- Si les données sont bien récupérées, on construit un objet maaziData qui contient les détails de company (id et name) et la liste des BU (tableau avec pour chacune des BU l'id et le name). Si le tableau contenant la liste des BU est vide, on fait un autre appel via `dataProvider.getOne()` pour récupérer la liste de toutes les BU de la compagnie et les stocker dans la liste des BU dans maaziData

Dans les différents onglets (comme Business units ou encore jobs), on récupère dataPermissions qui est l'objet contenant le tableau des BU rattachés au recruteur et la compagnie.
On filtre les données des BU récupérées pour ne garder que celle des BU auxquels le recruteur a accès.