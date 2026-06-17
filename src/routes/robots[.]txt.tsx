import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const txt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth
Sitemap: https://carefieldc.com/sitemap.xml
`;
        return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
