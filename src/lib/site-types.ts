/**
 * Public-facing types used by site components (mirror of legacy AppConfig shape).
 */

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
  targetAge: string;
  sessionsPerWeek: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl?: string;
  description?: string;
  externalVideoUrl?: string;
}

export interface GallerySettings {
  layout: "grid" | "slider" | "carousel";
  columns: number;
  autoplay: boolean;
  autoplaySpeed: number;
  showTitles: boolean;
  showCategories: boolean;
  showArrows: boolean;
  showDots: boolean;
  title: string;
  subtitle: string;
  description: string;
}


export interface LeadSubmission {
  id: string;
  fullName: string;
  phone: string;
  district: string;
  ageOfBeneficiary?: string;
  serviceId?: string;
  notes?: string;
  createdAt: string;
  status: "pending" | "contacted" | "scheduled";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BranchInfo {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
  phone: string;
  shareUrl?: string;
}

export interface WideBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  linkUrl?: string;
  buttonText?: string;
}

export interface MarketingPixels {
  googleAnalyticsId: string;
  metaPixelId: string;
  snapchatPixelId: string;
  tiktokPixelId: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  text: string;
  linkUrl?: string;
  backgroundColor: string;
  textColor: string;
  speed: "slow" | "normal" | "fast";
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  logoText: string;
  logoSubtitle: string;
  fontScale: "compact" | "normal" | "large" | "huge";
  fontFamily: "system" | "inter" | "cairo" | "tajawal" | "grotesk";
  borderRadius: "none" | "small" | "medium" | "large" | "xlarge" | "full";
  spacingScale: "compact" | "normal" | "comfortable" | "loose";
  logoImageUrl?: string;
  logoSize?: "sm" | "md" | "lg" | "xl";
  logoShape?: "circle" | "rounded" | "square";
  logoShowFrame?: boolean;
  logoSizeMobile?: "sm" | "md" | "lg" | "xl";
  logoSizeTablet?: "sm" | "md" | "lg" | "xl";
  logoSizeDesktop?: "sm" | "md" | "lg" | "xl";
  logoShapeMobile?: "circle" | "rounded" | "square";
  logoShapeTablet?: "circle" | "rounded" | "square";
  logoShapeDesktop?: "circle" | "rounded" | "square";
  logoShowFrameMobile?: boolean | null;
  logoShowFrameTablet?: boolean | null;
  logoShowFrameDesktop?: boolean | null;
}

export interface AboutSectionData {
  title: string;
  subtitle: string;
  description: string;
  vision: string;
  mission: string;
  goals: string[];
  imageUrl: string;
}

export interface SocialMedia {
  phone1: string;
  phone2: string;
  whatsapp: string;
  whatsappMessage: string;
  whatsappBubbleTag?: string;
  whatsappBubbleText?: string;
  whatsappBubbleCta?: string;
  twitter: string;
  instagram: string;
  snapchat: string;
  tiktok: string;
  email: string;
  linkedin?: string;
}

export interface AppConfig {
  banners: WideBanner[];
  socialMedia: SocialMedia;
  googleSheetsUrl: string;
  pixels: MarketingPixels;
  branches: BranchInfo[];
  gallery: GalleryItem[];
  announcement: AnnouncementConfig;
  theme: ThemeConfig;
  services: ServiceItem[];
  faqs: FAQItem[];
  trustBadges: { id: string; icon: string; text: string }[];
  heroSlides: { id: string; title: string; subtitle: string; imageUrl: string; tag: string }[];
  heroStats: { num: string; label: string }[];
  aboutSection: AboutSectionData;
  content: Record<string, string>;
  seo: Record<string, string>;
  footerDescription: string;
  footerCopyright: string;
}
