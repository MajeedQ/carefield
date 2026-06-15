import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

/**
 * Client-side SEO override: reads CMS-managed seo titles/descriptions from
 * site_settings.seo and updates document.title and <meta name="description">.
 * Static head() in each route still provides SSR defaults; this layer lets
 * the admin override them without code edits.
 */
export function SeoOverride({ page }: { page: "home" | "about" | "services" | "branches" | "contact" }) {
  const { config } = useApp();
  useEffect(() => {
    const seo = config.seo || {};
    const title = seo[`${page}_title`];
    const desc = seo[`${page}_description`];
    if (title) document.title = title;
    if (desc) {
      let m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", desc);
    }
  }, [config.seo, page]);
  return null;
}
