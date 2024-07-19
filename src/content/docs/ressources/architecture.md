---
title: Architecture
description: Architecture choisie.
sidebar:
  order: 1
---

Le projet se rapproche assez de l'architecture aerowork, nous avons : 

- une partie front dévéloppé avec NextJs qui correspond au repo **mazi**
- une partie backend/api sur Strapi qui correspond au repo **masi-backoffice**
- une partie dashboard sur Refine qui correspond au repo **[mazi-dashboard](../../mazi-dashboard/architecturegénérale/)**
- une base de donnnées sur Postgres

Le front et le dashboard va discuter avec les API de Strapi pour récupérer les données et enregistrer
