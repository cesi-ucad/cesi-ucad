#!/bin/bash

# Nettoyage des dépendances inutiles
npm uninstall @tailwindcss/aspect-ratio @tailwindcss/forms @tailwindcss/typography

# Nettoyage des fichiers de cache
rm -rf .next/
rm -rf node_modules/.cache/
rm -rf .eslintcache

# Suppression des fichiers de développement
find . -name "*.log" -type f -delete
find . -name "*.log.*" -type f -delete
find . -name "*.tmp" -type f -delete
find . -name "*.swp" -type f -delete
find . -name "*.swo" -type f -delete
find . -name ".DS_Store" -type f -delete
find . -name "Thumbs.db" -type f -delete

# Suppression des dossiers de développement
rm -rf .idea/
rm -rf .vscode/
rm -rf .github/workflows/

# Nettoyage des dépendances
npm cache clean --force
rm -rf node_modules/
npm install --production

# Suppression des fichiers de configuration inutiles
rm -f .eslintrc.json
rm -f .prettierrc
rm -f tsconfig.json

# Recréation d'une configuration TypeScript minimale
cat > tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOL

echo "Nettoyage terminé !"
