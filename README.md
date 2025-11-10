# 🌍 CESI UCAD — Site Vitrine Officiel du Club CESI

Bienvenue sur le dépôt open source du **site vitrine officiel du Club CESI (Club des Étudiants de la Section Informatique)** de l’Université Cheikh Anta Diop (UCAD), Dakar 🇸🇳.

Ce projet a pour but de **présenter l’école, le club, ses commissions, ses équipes, ses réalisations et ses membres**, tout en offrant une **plateforme d’adhésion numérique** pour les étudiants souhaitant rejoindre la communauté CESI.

---

## 🚀 Objectifs du projet

### 🎓 Promouvoir l’école et sa section informatique
- Présentation de l’**UCAD** et de la **Section Informatique (DMI)**.  
- Mise en avant des **filières et formations** proposées.  
- Publication d’actualités et d’événements académiques.

### 💻 Valoriser le Club CESI et ses réalisations
- Présentation du **club**, de ses **missions** et de son **bureau exécutif**.  
- Liste des **commissions** internes (pédagogique, communication, innovation…).  
- Présentation des **présidents successifs** du club.  
- Mise en avant des **réalisations et projets phares**.

### 🤝 Encourager la collaboration étudiante
- Mise en avant des **2 équipes affiliées** :
  - **InspiCode** → équipe dédiée au **développement web et logiciel**.
  - **AI Lab CESI** → équipe dédiée à l’**Intelligence Artificielle** et à la **recherche étudiante**.
- Espace d’**adhésion des membres** du club :
  - Chaque étudiant peut créer un profil.
  - Renseigner ses **informations personnelles**, **compétences**, **projets réalisés**, et **centre d’intérêt**.
  - **Ajouter sa photo** (stockée localement dans `/public/membres/`).

---

## 🧩 Stack Technique

| Technologie | Rôle |
|--------------|------|
| **Next.js + TypeScript** | Framework principal du site |
| **TailwindCSS** | Design rapide et responsive |
| **Framer Motion** | Animations fluides et modernes |
| **JSON Data Files** | Stockage des informations du club, des filières, membres, etc. |
| **Vercel** | Hébergement et CI/CD automatique |
| **GitHub** | Hébergement du code open source et gestion des contributions |

---

## 🗂️ Structure prévue du contenu

```
cesi-ucad/
 ├── data/
 │    ├── school.json
 │    ├── filieres.json
 │    ├── club.json
 │    ├── commissions.json
 │    ├── presidents.json
 │    ├── equipes.json
 │    ├── realisations.json
 │    ├── membres.json
 │    └── projets.json
 ├── public/
 │    └── membres/
 │         ├── amina-ndiaye.jpg
 │         ├── pape-moussa-sene.jpg
 │         └── autres photos...
 ├── pages/
 ├── components/
 ├── styles/
 └── README.md
```

---

## ⚙️ Installation locale

```bash
git clone https://github.com/<ton-compte>/cesi-ucad.git
cd cesi-ucad
npm install
npm run dev
```

Ton site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 📦 Exemples de fichiers JSON

### 🎓 school.json
```json
{
  "nom": "Université Cheikh Anta Diop de Dakar",
  "sigle": "UCAD",
  "description": "L'UCAD est une université publique sénégalaise reconnue pour son excellence académique.",
  "departement": "Département de Mathématiques et Informatique (DMI)",
  "filiere_principale": "Génie Logiciel et Systèmes Répartis",
  "localisation": "FST, UCAD, Dakar, Sénégal"
}
```

### 📘 filieres.json
```json
[
  {
    "nom": "Génie Logiciel et Systèmes Répartis",
    "description": "Formation axée sur le développement, l'architecture logicielle et les systèmes distribués."
  },
  {
    "nom": "Réseaux et Télécommunications",
    "description": "Formation centrée sur l’administration et la sécurité des réseaux informatiques."
  }
]
```

### 💻 club.json
```json
{
  "nom": "Club CESI UCAD",
  "description": "Club des Étudiants de la Section Informatique de l’UCAD.",
  "missions": [
    "Promouvoir l’excellence académique et l’innovation numérique",
    "Renforcer la solidarité entre étudiants en informatique",
    "Encourager la recherche, la créativité et le leadership"
  ]
}
```

### 🧭 commissions.json
```json
[
  { "nom": "Commission Pédagogique", "president": "Malick BA" },
  { "nom": "Commission Communication", "president": "Aïssatou Ndiaye" },
  { "nom": "Commission Innovation", "president": "Mouhamed Diop" }
]
```

### 👑 presidents.json
```json
[
  { "nom": "Ousmane Diallo", "mandat": "2022-2023" },
  { "nom": "Fatou Sow", "mandat": "2023-2024" },
  { "nom": "Malick BA", "mandat": "2024-2025" }
]
```

### 🤖 equipes.json
```json
[
  {
    "nom": "InspiCode",
    "domaine": "Développement Web et Logiciel",
    "description": "Équipe dédiée à la création d'applications modernes en JavaScript, PHP et Java."
  },
  {
    "nom": "AI Lab CESI",
    "domaine": "Intelligence Artificielle et Data Science",
    "description": "Équipe orientée sur le NLP, la Computer Vision et la recherche IA appliquée."
  }
]
```

### 🏆 realisations.json
```json
[
  {
    "titre": "Formation Git et GitHub",
    "date": "2025-02-02",
    "responsable": "Malick BA",
    "description": "Atelier de formation destiné aux étudiants sur la gestion de version et la collaboration."
  },
  {
    "titre": "Hackathon CESI Innov 2025",
    "date": "2025-03-10",
    "responsable": "Commission Innovation",
    "description": "Compétition inter-niveaux autour de la création d'applications utiles à la société."
  }
]
```

### 👥 membres.json
```json
[
  {
    "nom": "Amina Ndiaye",
    "niveau": "Licence 3",
    "specialite": "Développement Web",
    "photo": "/membres/amina-ndiaye.jpg",
    "projets": ["Application de gestion médicale", "Portfolio React"]
  },
  {
    "nom": "Pape Moussa Sène",
    "niveau": "Master 1",
    "specialite": "DevOps",
    "photo": "/membres/pape-moussa-sene.jpg",
    "projets": ["Déploiement Docker d'une API NestJS"]
  }
]
```

### 💡 projets.json
```json
[
  {
    "titre": "MoodCare",
    "auteur": "Groupe Féminin CESI",
    "description": "Application pour la santé mentale et le bien-être des étudiantes.",
    "technos": ["React", "Firebase", "Dialogflow"],
    "github": "https://github.com/CESI-UCAD/moodcare"
  },
  {
    "titre": "HerHealth",
    "auteur": "Équipe AI Lab CESI",
    "description": "Application de suivi de santé féminine utilisant le NLP.",
    "technos": ["FastAPI", "spaCy", "React Native"],
    "github": "https://github.com/CESI-UCAD/herhealth"
  }
]
```

---

# 🤝 CONTRIBUTING.md — Comment contribuer ?

Merci de ton intérêt pour le projet **CESI UCAD** ! 🙌

## 🔧 Étapes pour contribuer
1. **Fork** le dépôt.
2. **Clone** ton fork :
   ```bash
   git clone https://github.com/<ton-utilisateur>/cesi-ucad.git
   ```
3. **Crée une branche** :
   ```bash
   git checkout -b ajout-commission
   ```
4. **Apporte tes modifications** (code, design, JSON...)
5. **Commit & Push** :
   ```bash
   git commit -m "Ajout de la commission innovation"
   git push origin ajout-commission
   ```
6. **Crée une Pull Request** sur le dépôt principal.

## 🧠 Bonnes pratiques
- Code propre et typé (TypeScript).
- JSON bien formatté et documenté.
- Toujours expliquer les changements dans ta PR.

## ❤️ Crédits
Projet dirigé par **Malick BA**, Président de la Commission Pédagogique du CESI UCAD 🇸🇳.

---

## 📜 Licence
Projet open source sous licence MIT.