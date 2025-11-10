/** @type {import('tailwindcss').Config} */
module.exports = {
  // Mode JIT pour des builds plus rapides et un CSS plus léger
  mode: 'jit',
  
  // Chemins de scan optimisés pour les classes utilisées
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  // Activation du mode sombre basé sur la classe pour plus de contrôle
  darkMode: ['class', '[data-theme="dark"]'],
  
  // Configuration du thème optimisée
  theme: {
    // Surcharge des couleurs par défaut pour de meilleures performances
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      
      // Palette de couleurs principale
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      
      // Couleurs secondaires
      secondary: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      
      // Couleurs d'état
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        700: '#b91c1c',
      },
      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        700: '#b45309',
      },
      success: {
        50: '#ecfdf5',
        500: '#10b981',
        700: '#047857',
      },
      
      // Nuances de gris
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
    
    extend: {
      // Configuration des polices
      fontFamily: {
        sans: ['var(--font-sans, Inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono, JetBrains Mono)', 'monospace'],
      },
      
      // Animations personnalisées
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Espacement personnalisé
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // Bordures personnalisées
      borderRadius: {
        '4xl': '2rem',
      },
      
      // Opacité personnalisée
      opacity: {
        '15': '0.15',
        '85': '0.85',
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
