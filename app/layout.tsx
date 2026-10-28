import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fraunces y Manrope (las mismas de Google Fonts), incluidas en el proyecto.
const fraunces = localFont({
  src: "./fonts/Fraunces.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Petra · Herramientas digitales para tu salón de eventos",
  description:
    "Ofrecele a tus invitados toda la tecnología que necesitan, con la marca de tu salón. Empezá gratis.",
  openGraph: {
    title: "Petra · Herramientas digitales para tu salón de eventos",
    description:
      "Ofrecele a tus invitados toda la tecnología que necesitan, con la marca de tu salón. Empezá gratis.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1A33",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
