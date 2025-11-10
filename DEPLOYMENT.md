# Déploiement sur Netlify

Ce guide explique comment déployer cette application sur Netlify avec CI/CD.

## Prérequis

1. Un compte [GitHub](https://github.com/)
2. Un compte [Netlify](https://www.netlify.com/)
3. Node.js 18+ et npm installés localement

## Configuration initiale

### 1. Configuration des secrets GitHub

1. Allez dans les paramètres de votre dépôt GitHub
2. Naviguez vers "Secrets and variables" > "Actions"
3. Ajoutez les secrets suivants :
   - `NETLIFY_AUTH_TOKEN`: Votre token d'authentification personnel Netlify
   - `NETLIFY_SITE_ID`: L'ID de votre site Netlify

### 2. Configuration de Netlify

1. Connectez-vous à votre compte Netlify
2. Créez un nouveau site depuis Git
3. Sélectionnez votre dépôt GitHub
4. Configurez les paramètres de build :
   - Build command: `npm run build`
   - Publish directory: `out`
   - Variables d'environnement :
     - `NODE_VERSION`: `18.x`
     - `NPM_VERSION`: `9.x`
     - `NEXT_TELEMETRY_DISABLED`: `1`

## Déploiement continu

Le déploiement se fera automatiquement à chaque :
- Push sur la branche `main` ou `master`
- Ouverture d'une pull request vers `main` ou `master`

## Déploiement manuel

Pour forcer un déploiement manuel :

1. Poussez vos modifications sur GitHub :
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
2. Attendez que le workflow GitHub Actions se termine
3. Vérifiez le déploiement dans votre tableau de bord Netlify

## Variables d'environnement

Si votre application utilise des variables d'environnement, assurez-vous de les ajouter dans les paramètres de votre site Netlify :

1. Allez dans "Site settings" > "Build & deploy" > "Environment"
2. Ajoutez vos variables d'environnement

## Support

Pour tout problème de déploiement, consultez les logs de build dans Netlify ou dans l'onglet "Actions" de votre dépôt GitHub.
