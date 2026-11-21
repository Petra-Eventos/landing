import type { MetadataRoute } from "next";

// Buscadores: pueden leer toda la landing. Le dice a Google dónde está el mapa del sitio.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.petraeventos.com/sitemap.xml",
  };
}
