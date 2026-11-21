import type { MetadataRoute } from "next";

// Mapa del sitio para buscadores. La landing es una sola página; si se suman páginas, van acá.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.petraeventos.com", changeFrequency: "weekly", priority: 1 }];
}
