import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { CARGA_FIN, CARGA_INICIO, PantallaCarga } from "@/components/pantalla-carga";
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
    // suppressHydrationWarning: el script de carga le agrega la clase "cargando" a <html> antes que React.
    <html lang="es-AR" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CARGA_INICIO }} />
      </head>
      <body>
        <PantallaCarga />
        <script dangerouslySetInnerHTML={{ __html: CARGA_FIN }} />
        {children}
        {/* Visitas (Cloudflare Web Analytics, gratis): sin cookies ni datos personales. Se ven en
            dash.cloudflare.com → Analytics & Logs → Web Analytics. El token es público (no es una clave). */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "d0bac71d23b24048bcb3a6c9bb8bd6e5"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
