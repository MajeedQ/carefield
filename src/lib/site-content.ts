import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DbBanner = {
  id: string;
  kind: "text" | "image";
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  bg_color: string | null;
  text_color: string | null;
  link_url: string | null;
  sort_order: number;
  active: boolean;
};

export type DbGalleryItem = {
  id: string;
  kind: "image" | "video";
  title: string | null;
  category: string | null;
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
  active: boolean;
};

export const bannersQuery = (onlyActive = true) =>
  queryOptions({
    queryKey: ["banners", onlyActive],
    queryFn: async (): Promise<DbBanner[]> => {
      let q = supabase
        .from("banners")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (onlyActive) q = q.eq("active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as DbBanner[];
    },
  });

export const galleryQuery = (onlyActive = true) =>
  queryOptions({
    queryKey: ["gallery_items", onlyActive],
    queryFn: async (): Promise<DbGalleryItem[]> => {
      let q = supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (onlyActive) q = q.eq("active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as DbGalleryItem[];
    },
  });
