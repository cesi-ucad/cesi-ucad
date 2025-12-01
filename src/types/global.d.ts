import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-testid"?: string;
  }
}

interface SVGProps<T> extends React.SVGProps<SVGElement> {
  "aria-hidden"?: boolean | "false" | "true";
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      svg: React.DetailedHTMLProps<
        React.SVGProps<SVGSVGElement>,
        SVGSVGElement
      >;
      path: React.DetailedHTMLProps<
        React.SVGProps<SVGPathElement>,
        SVGPathElement
      >;
    }
  }
}
