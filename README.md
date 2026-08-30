# ✈ Pocket Guide

Application compagnon de voyage en **PWA** (Progressive Web App), conçue pour **Détours Madagascar**.
Projet de stage — statut : prototypage, avec un niveau de soin de vrai livrable (l'agence pourrait l'adopter si elle est convaincue).

---

## 🎯 Objectif du projet

Offrir à chaque client de l'agence un carnet de voyage numérique, **personnalisé au séjour réservé**, centralisant :
- une carte interactive,
- le programme jour par jour,
- une checklist de voyage,
- des phrases utiles français ↔ malagasy.

Le tout **utilisable sans connexion** (offline-first), installable en un geste depuis le navigateur, sans compte ni mot de passe.
Chaque voyage est accessible via un **lien unique + QR code**, généré automatiquement à partir d'Airtable, remis au client par l'agence (mail, impression, en rendez-vous — au choix de l'agence, sans impact technique).

---

## 🧱 Stack technique

> ⚠️ Mise à jour v0.2 par rapport au cahier des charges initial : **React remplace Next.js**.

| Besoin | Outil | Rôle |
|---|---|---|
| Framework | **React (Vite)** | Structure du projet — Vite choisi comme socle par défaut (build rapide, pas de couche serveur superflue vu que l'app est 100 % côté client). *À confirmer en équipe : voir section [Décisions techniques ouvertes](#-décisions-techniques-encore-ouvertes).* |
| Style | **Tailwind CSS** | Mise en page rapide et cohérente entre les deux développeurs |
| PWA / offline | **vite-plugin-pwa** (Workbox) | Génère et gère le Service Worker : mise en cache et mises à jour automatiques. Remplace le nom "react-pwa-plugin" évoqué initialement, qui n'est pas un package standard. |
| Carte | **Leaflet** + **OpenStreetMap** | Carte légère, tuiles pré-téléchargeables pour l'usage offline |
| Stockage local | **Dexie.js** (IndexedDB) | Contenu, checklist, favoris — persistant hors-ligne |
| Contenu / back-end | **Airtable** (Option A confirmée) | Gestion des voyages, jours, activités, lieux — sans back-end dédié |
| Génération de lien/QR | ID d'enregistrement Airtable + route `/v/:id` | Chaque voyage a un lien unique `pocketguide.app/v/{id}` et un QR code téléchargeable |
| Déploiement | **Vercel** | Hébergement gratuit, déploiement automatique à chaque push |
| Intégration continue | **GitHub Actions** | Build + lint avant chaque mise en ligne |

### 🔓 Décisions techniques encore ouvertes
- **Vite seul vs. framework additionnel** : à trancher en équipe avant le Sprint 1 si un besoin de routing serveur ou de SSR apparaît (a priori non nécessaire pour une PWA offline-first).
- **Nom exact du package PWA** : `vite-plugin-pwa` est l'option standard actuelle — à valider ensemble avant de l'ajouter au projet.

---

## 📦 Fonctionnalités

### Essentiel (Sprint 1-3)
- Carte interactive offline (pins par catégorie, tuiles pré-téléchargées)
- Programme jour par jour
- Checklist de voyage par catégorie
- Phrases utiles français ↔ malagasy
- Chargement du voyage via lien unique / QR code (`/v/:id`)

### Bonus (si le temps le permet — Sprint 4)
- Convertisseur de devises (taux mis en cache)
- Urgences / SOS (contacts police, hôpital, ambassade, agence)
- Journal de voyage
- Scan automatique de documents (OCR)
- **Portefeuille de documents** — priorité personnelle, mais implémenté **en tout dernier**, une fois le reste stabilisé (nécessite un chiffrement local soigné)

---

## 🚀 Installation et lancement en local

### Prérequis
- [Node.js](https://nodejs.org/) version 18 ou supérieure
- [Git](https://git-scm.com/)
- Un compte GitHub avec accès au dépôt (membre de l'organisation)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/<organisation>/pocket-guide.git
cd pocket-guide

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement et le compléter
cp .env.example .env
# → renseigner la clé API Airtable (voir Notion > Décisions pour l'obtenir)

# 4. Lancer le projet en local
npm run dev
```

L'application est alors accessible sur **http://localhost:5173**.

### Autres commandes utiles

```bash
npm run build      # génère la version de production (dossier /dist)
npm run preview    # prévisualise la version buildée en local
npm run lint        # vérifie le code avant de pousser sur GitHub
```

> 💡 Le Service Worker (mode offline) ne s'active pas en `dev`, seulement sur `npm run build` + `npm run preview` ou en production. Pour tester le mode offline, toujours utiliser `preview`.

---

## 🗂 Structure du projet (à respecter)

```
pocket-guide/
├── src/
│   ├── components/     # composants réutilisables (UI)
│   ├── pages/           # écrans (Carte, Programme, Checklist, Phrases, /v/:id...)
│   ├── data/             # accès Airtable + modèles de données (Voyage, Jour, Activité, Lieu)
│   ├── storage/         # logique Dexie.js (IndexedDB)
│   └── assets/           # images, tuiles carte, icônes
├── public/
├── .env.example
└── README.md
```

Découpage du travail recommandé : par **domaine fonctionnel** (ex. carte & données géographiques d'un côté, programme/checklist/contenus de l'autre) plutôt que par couche technique, pour limiter les conflits de fusion.

---

## 🧩 Organisation & outils d'équipe

| Besoin | Outil |
|---|---|
| Code | GitHub |
| Suivi des tâches | GitHub Projects |
| Travail en direct | VS Code Live Share |
| Points d'équipe | Discord |
| Design | Stitch |
| Documentation | Notion |

Liens vers les espaces de travail : *(à compléter par l'équipe dès leur création)*
- GitHub Projects : `https://github.com/orgs/dev-dm-team/projects/1`
- Discord : `https://discord.com/channels/1543223821949992981/1543223823246172222`
- Stitch : `https://stitch.withgoogle.com/projects/1830679795573398770`
- Notion : `https://app.notion.com/p/Pocket-Guide-doc-3cb7ba05fa1280ed9377edb893bc751b`

---

## 🗓 Méthodologie & sprints

Conception des données selon **Merise** (MCD → MLD) autour des entités `Voyage`, `Jour`, `Activité`, `Lieu`, avant tout développement — même si le stockage final est en JSON local via Airtable.

| Sprint | Focus |
|---|---|
| 1 | Cadrage — maquettes, mise en place technique, structure des données |
| 2 | Cœur de l'app — carte offline, données de contenu, réception logo/couleurs/contenu agence |
| 3 | Fonctions clés — programme, checklist, phrases utiles, tests hors-ligne |
| 4 | Finalisation — bonus, retours agence, déploiement, documentation |

---

## 📌 Statut

Document de travail — v0.2. Se référer à Notion > `Décisions` pour l'historique complet des arbitrages.
