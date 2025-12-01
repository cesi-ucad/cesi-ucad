import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CESI UCAD - Club des Étudiants de la Section Informatique",
  description:
    "Découvrez le CESI UCAD, le Club des Étudiants de la Section Informatique de l'Université Cheikh Anta Diop de Dakar. Excellence académique, innovation et communauté dynamique.",
  keywords: [
    "CESI",
    "UCAD",
    "Club Informatique",
    "Étudiants",
    "Sénégal",
    "Dakar",
    "Université Cheikh Anta Diop",
  ],
  authors: [{ name: "CESI UCAD" }],
  creator: "CESI UCAD",
  publisher: "CESI UCAD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cesi-ucad.sn"),
  openGraph: {
    title: "CESI UCAD - Club des Étudiants de la Section Informatique",
    description:
      "Découvrez le CESI UCAD, le Club des Étudiants de la Section Informatique de l'UCAD.",
    url: "https://cesi-ucad.sn",
    siteName: "CESI UCAD",
    locale: "fr_FR",
    type: "website",
  },
};

const fontVariables = {
  sans: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace",
  ].join(","),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        style={
          {
            "--font-sans": fontVariables.sans,
            "--font-mono": fontVariables.mono,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
