import { createFileRoute } from "@tanstack/react-router";

const URLS = ["/", "/about", "/services", "/branches", "/contact", "/blog", "/privacy", "/terms"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const base = "https://carefield.lovable.app";
        const today = new Date().toISOString().slice(0, 10);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map((u) => `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
