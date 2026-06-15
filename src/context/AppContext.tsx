/**
 * Drop-in replacement for the legacy AppContext.
 * `useApp()` returns a `config` aggregated from Supabase (TanStack Query),
 * a no-op admin mode (admin handled separately at /admin),
 * and `addLead` that calls a server function.
 */

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  settingsQuery,
  branchesQuery,
  galleryQuery,
  heroSlidesQuery,
  trustBadgesQuery,
  servicesQuery,
  faqsQuery,
  wideBannersQuery,
} from "@/lib/site-content";
import type { AppConfig, ServiceItem } from "@/lib/site-types";
import { submitLead } from "@/lib/leads.functions";

interface AppContextType {
  config: AppConfig;
  isAdminMode: boolean;
  setIsAdminMode: (m: boolean) => void;
  updateConfig: (next: AppConfig | ((p: AppConfig) => AppConfig)) => void;
  resetToDefaults: () => void;
  leads: never[];
  addLead: (
    raw: Omit<{ fullName: string; phone: string; district: string; ageOfBeneficiary?: string; serviceId?: string; notes?: string }, "id">,
  ) => Promise<boolean>;
  deleteLead: (id: string) => void;
  updateLeadStatus: (id: string, status: string) => void;
  activePage: "home" | "about" | "services" | "branches" | "contact";
  setActivePage: (p: "home" | "about" | "services" | "branches" | "contact") => void;
}

const Ctx = createContext<AppContextType | undefined>(undefined);

const FALLBACK: AppConfig = {
  banners: [],
  socialMedia: {
    phone1: "0560098881", phone2: "0546461647", whatsapp: "966560098881",
    whatsappMessage: "السلام عليكم ورحمة الله وبركاته، أود الاستفسار عن حجز مقعد وتحديد موعد التقييم المجاني في مركز مجال العناية للرعاية النهارية.",
    twitter: "", instagram: "", snapchat: "", tiktok: "", email: "care.f.center@gmail.com", linkedin: "",
  },
  googleSheetsUrl: "",
  pixels: { googleAnalyticsId: "", metaPixelId: "", snapchatPixelId: "", tiktokPixelId: "" },
  branches: [],
  gallery: [],
  announcement: { enabled: false, text: "", backgroundColor: "#775a19", textColor: "#fff", speed: "normal" },
  theme: {
    primaryColor: "#002c6d", accentColor: "#775a19", backgroundColor: "#f8f9ff",
    logoText: "مركز مجال العناية للرعاية النهارية", logoSubtitle: "تأهيل، تمكين، استقلالية",
    fontScale: "normal", fontFamily: "tajawal", borderRadius: "large", spacingScale: "comfortable",
  },
  services: [],
  faqs: [],
  trustBadges: [],
  heroSlides: [],
  heroStats: [
    { num: "+٨ سنوات", label: "خبرة رعاية تراكمية" },
    { num: "الفئة A+", label: "أعلى تصنيف رعاية" },
    { num: "+٢٥ متخصص", label: "أخصائي مرخص ومؤهل" },
    { num: "مجهزة بالكامل", label: "باصات توصيل مبردة بالكاميرات" },
  ],
  aboutSection: {
    title: "نبذة عن المركز", subtitle: "", description: "", vision: "", mission: "", goals: [], imageUrl: "",
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: s } = useQuery(settingsQuery());
  const { data: branches = [] } = useQuery(branchesQuery(true));
  const { data: gallery = [] } = useQuery(galleryQuery(true));
  const { data: heroSlides = [] } = useQuery(heroSlidesQuery(true));
  const { data: trust = [] } = useQuery(trustBadgesQuery(true));
  const { data: services = [] } = useQuery(servicesQuery(true));
  const { data: faqs = [] } = useQuery(faqsQuery(true));
  const { data: wide = [] } = useQuery(wideBannersQuery(true));

  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const submit = useServerFn(submitLead);

  const config = useMemo<AppConfig>(() => {
    if (!s) return FALLBACK;
    return {
      banners: wide.map((w) => ({
        id: w.id, title: w.title, subtitle: w.subtitle, imageUrl: w.image_url,
        tag: w.tag ?? "", linkUrl: w.link_url ?? "", buttonText: w.button_text ?? "",
      })),
      socialMedia: {
        phone1: s.phone1 ?? "", phone2: s.phone2 ?? "", whatsapp: s.whatsapp ?? "",
        twitter: s.twitter ?? "", instagram: s.instagram ?? "", snapchat: s.snapchat ?? "",
        tiktok: s.tiktok ?? "", email: s.email ?? "", linkedin: s.linkedin ?? "",
      },
      googleSheetsUrl: s.sheets_webhook_url ?? "",
      pixels: {
        googleAnalyticsId: s.ga_id ?? "", metaPixelId: s.meta_pixel_id ?? "",
        snapchatPixelId: s.snap_pixel_id ?? "", tiktokPixelId: s.tiktok_pixel_id ?? "",
      },
      branches: branches.map((b) => ({
        id: b.id, name: b.name, address: b.address, mapUrl: b.map_url,
        phone: b.phone ?? "", shareUrl: b.share_url ?? "",
      })),
      gallery: gallery.map((g) => ({
        id: g.id, type: g.kind, title: g.title ?? "", category: g.category ?? "",
        thumbnailUrl: g.thumbnail_url ?? g.url, videoUrl: g.kind === "video" ? g.url : undefined,
      })),
      announcement: {
        enabled: !!s.announce_enabled, text: s.announce_text ?? "", linkUrl: s.announce_link ?? "",
        backgroundColor: s.announce_bg ?? "#775a19", textColor: s.announce_color ?? "#fff",
        speed: (s.announce_speed as any) ?? "normal",
      },
      theme: {
        primaryColor: s.primary_color, accentColor: s.accent_color, backgroundColor: s.background_color,
        logoText: s.logo_text, logoSubtitle: s.logo_subtitle,
        fontScale: s.font_scale as any, fontFamily: s.font_family as any,
        borderRadius: s.border_radius as any, spacingScale: s.spacing_scale as any,
      },
      services: services.map<ServiceItem>((sv) => ({
        id: sv.id, title: sv.title, iconName: sv.icon_name,
        shortDescription: sv.short_description, detailedDescription: sv.detailed_description,
        benefits: sv.benefits ?? [], targetAge: sv.target_age ?? "", sessionsPerWeek: sv.sessions_per_week ?? "",
      })),
      faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
      trustBadges: trust.map((t) => ({ id: t.id, icon: t.icon, text: t.text })),
      heroSlides: heroSlides.map((h) => ({
        id: h.id, title: h.title, subtitle: h.subtitle, imageUrl: h.image_url, tag: h.tag ?? "",
      })),
      heroStats: FALLBACK.heroStats,
      aboutSection: {
        title: s.about_title, subtitle: s.about_subtitle, description: s.about_description,
        vision: s.about_vision, mission: s.about_mission, goals: s.about_goals ?? [],
        imageUrl: s.about_image ?? "",
      },
    };
  }, [s, branches, gallery, heroSlides, trust, services, faqs, wide]);

  const activePage = useMemo<AppContextType["activePage"]>(() => {
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/services")) return "services";
    if (pathname.startsWith("/branches")) return "branches";
    if (pathname.startsWith("/contact")) return "contact";
    return "home";
  }, [pathname]);

  const setActivePage = useCallback<AppContextType["setActivePage"]>(
    (p) => {
      const target = p === "home" ? "/" : `/${p}`;
      navigate({ to: target });
    },
    [navigate],
  );

  const addLead = useCallback<AppContextType["addLead"]>(async (raw) => {
    try {
      await submit({
        data: {
          full_name: raw.fullName,
          phone: raw.phone,
          district: raw.district,
          age: raw.ageOfBeneficiary ?? "",
          service_id: raw.serviceId ?? "",
          notes: raw.notes ?? "",
        },
      });
      return true;
    } catch (e) {
      console.error("submitLead failed", e);
      return false;
    }
  }, [submit]);

  const value: AppContextType = {
    config,
    isAdminMode: false,
    setIsAdminMode: () => {},
    updateConfig: () => {},
    resetToDefaults: () => {},
    leads: [] as never[],
    addLead,
    deleteLead: () => {},
    updateLeadStatus: () => {},
    activePage,
    setActivePage,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useApp = (): AppContextType => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used within AppProvider");
  return c;
};
