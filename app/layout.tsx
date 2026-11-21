import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
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

// Dirección oficial de la landing: arma los links absolutos (canonical, imagen para compartir).
export const metadata: Metadata = {
  metadataBase: new URL("https://www.petraeventos.com"),
  alternates: { canonical: "/" },
  title: "Petra · Cotizador para eventos",
  description:
    "Respondé primero, gestioná más fiestas. Generá un link para que tus clientes coticen su evento las 24 horas, con tu marca. Empezá gratis.",
  openGraph: {
    title: "Petra · Cotizador para eventos",
    description:
      "Respondé primero, gestioná más fiestas. Generá un link para que tus clientes coticen su evento las 24 horas, con tu marca. Empezá gratis.",
    locale: "es_AR",
    type: "website",
    url: "/",
    siteName: "Petra",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#E3C9AE",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        {children}
        {/* Visitas (Vercel Web Analytics): sin cookies ni datos personales. Se ven en el panel de Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
