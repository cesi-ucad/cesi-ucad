const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Fonction pour exécuter des commandes shell de manière sécurisée
const runCommand = (command, cwd = process.cwd()) => {
  try {
    console.log(`Exécution: ${command}`);
    execSync(command, { stdio: 'inherit', cwd });
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'exécution de la commande: ${command}`, error);
    return false;
  }
};

// Fonction pour supprimer des fichiers et dossiers de manière récursive
const cleanPaths = (basePath, paths) => {
  paths.forEach(item => {
    const fullPath = path.join(basePath, item);
    if (fs.existsSync(fullPath)) {
      console.log(`Suppression: ${fullPath}`);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  });
};

// Fonction principale de nettoyage
const cleanProject = () => {
  const projectRoot = process.cwd();
  
  console.log('🚀 Démarrage du nettoyage du projet...\n');
  
  // 1. Nettoyage des dossiers de build et de cache
  console.log('🧹 Nettoyage des dossiers de build et de cache...');
  cleanPaths(projectRoot, [
    '.next',
    'out',
    'node_modules/.cache',
    '.turbo',
    '.vercel',
    '.netlify',
    '.eslintcache',
    '.rts2*',
    'coverage',
    'dist',
    'build',
  ]);
  
  // 2. Suppression des fichiers de logs et temporaires
  console.log('\n🗑️  Suppression des fichiers temporaires et de logs...');
  cleanPaths(projectRoot, [
    '*.log',
    '*.log.*',
    '*.tmp',
    '*.swp',
    '*.swo',
    '.DS_Store',
    'Thumbs.db',
    '.env*.local',
    '.env',
  ]);
  
  // 3. Nettoyage des dépendances
  console.log('\n♻️  Nettoyage des dépendances...');
  runCommand('npm cache clean --force');
  
  // 4. Réinstallation des dépendances de production uniquement
  console.log('\n🔄 Réinstallation des dépendances de production...');
  cleanPaths(projectRoot, ['node_modules']);
  runCommand('npm install --production=false'); // Réinstallation de toutes les dépendances pour le développement
  
  // 5. Nettoyage des fichiers de configuration inutiles
  console.log('\n🧼 Nettoyage des fichiers de configuration inutiles...');
  const configFilesToKeep = [
    'next.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'package.json',
    'package-lock.json',
    'README.md',
    '.gitignore',
    '.npmrc',
    '.dockerignore',
    'netlify.toml',
  ];
  
  const allFiles = fs.readdirSync(projectRoot);
  allFiles.forEach(file => {
    if (
      file.endsWith('.config.js') && 
      !configFilesToKeep.includes(file) &&
      !file.startsWith('eslint')
    ) {
      fs.unlinkSync(path.join(projectRoot, file));
    }
  });
  
  // 6. Vérification de la configuration TypeScript
  console.log('\n🔍 Vérification de la configuration TypeScript...');
  const tsConfigPath = path.join(projectRoot, 'tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    
    // Mise à jour de la configuration TypeScript si nécessaire
    const updatedTsConfig = {
      ...tsConfig,
      compilerOptions: {
        ...(tsConfig.compilerOptions || {}),
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      exclude: [...new Set([
        ...(tsConfig.exclude || []),
        'node_modules',
        '.next',
        'out',
        'dist',
        'build',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        '**/__tests__',
        '**/__mocks__',
      ])],
    };
    
    fs.writeFileSync(
      tsConfigPath, 
      JSON.stringify(updatedTsConfig, null, 2) + '\n',
      'utf-8'
    );
  }
  
  console.log('\n✅ Nettoyage terminé avec succès !');
  console.log('\nProchaines étapes recommandées :');
  console.log('1. Exécutez \'npm run build\' pour vérifier que tout fonctionne correctement');
  console.log('2. Poussez vos modifications vers le dépôt distant');
  console.log('3. Vérifiez que le déploiement CI/CD fonctionne comme prévu\n');
};

// Exécution du script
cleanProject();
