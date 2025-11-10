import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Ajoutez ici des attributs HTML personnalisés si nécessaire
    'data-testid'?: string;
  }
}

// Déclaration pour les éléments SVG
interface SVGProps<T> extends React.SVGProps<SVGElement> {
  // Ajoutez ici des propriétés SVG personnalisées si nécessaire
  'aria-hidden'?: boolean | 'false' | 'true';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Déclarez ici les éléments personnalisés si nécessaire
      'svg': React.DetailedHTMLProps<React.SVGProps<SVGSVGElement>, SVGSVGElement>;
      'path': React.DetailedHTMLProps<React.SVGProps<SVGPathElement>, SVGPathElement>;
      // Ajoutez d'autres éléments SVG au besoin
    }
  }
}
