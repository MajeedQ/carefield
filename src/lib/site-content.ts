import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ============ Existing tables ============
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

// ============ New CMS tables ============
export type DbSettings = {
  id: string;
  primary_color: string;
  accent_color: string;
  background_color: string;
  logo_text: string;
  logo_subtitle: string;
  font_scale: string;
  font_family: string;
  border_radius: string;
  spacing_scale: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  twitter: string;
  instagram: string;
  snapchat: string;
  tiktok: string;
  email: string;
  linkedin: string;
  ga_id: string;
  meta_pixel_id: string;
  snap_pixel_id: string;
  tiktok_pixel_id: string;
  announce_enabled: boolean;
  announce_text: string;
  announce_link: string;
  announce_bg: string;
  announce_color: string;
  announce_speed: string;
  about_title: string;
  about_subtitle: string;
  about_description: string;
  about_vision: string;
  about_mission: string;
  about_goals: string[];
  about_image: string;
  sheets_webhook_url: string;
};

export type DbBranch = {
  id: string;
  name: string;
  address: string;
  map_url: string;
  share_url: string | null;
  phone: string | null;
  sort_order: number;
  active: boolean;
};

export type DbHeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  tag: string | null;
  sort_order: number;
  active: boolean;
};

export type DbTrustBadge = {
  id: string;
  icon: string;
  text: string;
  sort_order: number;
  active: boolean;
};

export type DbService = {
  id: string;
  title: string;
  icon_name: string;
  short_description: string;
  detailed_description: string;
  benefits: string[];
  target_age: string | null;
  sessions_per_week: string | null;
  sort_order: number;
  active: boolean;
};

export type DbFaq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
};

export type DbWideBanner = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  tag: string | null;
  link_url: string | null;
  button_text: string | null;
  sort_order: number;
  active: boolean;
};

export type DbLead = {
  id: string;
  full_name: string;
  phone: string;
  district: string;
  age: string | null;
  service_id: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

// ============ Query options ============
const sortedList = <T,>(table: string, key: string, onlyActive: boolean) =>
  queryOptions({
    queryKey: [key, onlyActive],
    queryFn: async (): Promise<T[]> => {
      let q = (supabase.from(table as any) as any)
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (onlyActive) q = q.eq("active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });

export const bannersQuery = (onlyActive = true) =>
  sortedList<DbBanner>("banners", "banners", onlyActive);

export const galleryQuery = (onlyActive = true) =>
  sortedList<DbGalleryItem>("gallery_items", "gallery_items", onlyActive);

export const branchesQuery = (onlyActive = true) =>
  sortedList<DbBranch>("branches", "branches", onlyActive);

export const heroSlidesQuery = (onlyActive = true) =>
  sortedList<DbHeroSlide>("hero_slides", "hero_slides", onlyActive);

export const trustBadgesQuery = (onlyActive = true) =>
  sortedList<DbTrustBadge>("trust_badges", "trust_badges", onlyActive);

export const servicesQuery = (onlyActive = true) =>
  sortedList<DbService>("services", "services", onlyActive);

export const faqsQuery = (onlyActive = true) =>
  sortedList<DbFaq>("faqs", "faqs", onlyActive);

export const wideBannersQuery = (onlyActive = true) =>
  sortedList<DbWideBanner>("wide_banners", "wide_banners", onlyActive);

export const settingsQuery = () =>
  queryOptions({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<DbSettings> => {
      const { data, error } = await (supabase.from("site_settings" as any) as any)
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as DbSettings;
    },
  });

export const leadsQuery = () =>
  queryOptions({
    queryKey: ["leads"],
    queryFn: async (): Promise<DbLead[]> => {
      const { data, error } = await (supabase.from("leads" as any) as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as DbLead[];
    },
  });
