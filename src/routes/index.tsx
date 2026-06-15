import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { Hero } from "@/components/site/Hero";
import { WideBannerCarousel } from "@/components/site/WideBannerCarousel";
import { TrustIndicators } from "@/components/site/TrustIndicators";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ServiceDetailModal } from "@/components/site/ServiceDetailModal";
import { GallerySection } from "@/components/site/GallerySection";
import { BranchLocations } from "@/components/site/BranchLocations";
import { LeadForm } from "@/components/site/LeadForm";
import { FAQSection } from "@/components/site/FAQSection";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { SeoOverride } from "@/components/site/SeoOverride";
import type { ServiceItem } from "@/lib/site-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مركز مجال العناية للرعاية النهارية | تأهيل ذوي الإعاقة بالرياض" },
      { name: "description", content: "مركز رعاية نهارية معتمد A+ في الرياض لتأهيل ذوي الإعاقة من 12-45 سنة. تعديل سلوك، تخاطب، علاج طبيعي، دمج أكاديمي. احجز كشف مجاني." },
      { property: "og:title", content: "مركز مجال العناية للرعاية النهارية" },
      { property: "og:description", content: "رعاية وتأهيل متخصص لذوي الإعاقة في الرياض - فروع لبن والنزهة - مواصلات مع مرافقين." },
      { property: "og:url", content: "https://carefield.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [preselectedForForm, setPreselectedForForm] = useState<string>("");
  const [reloadInquiries, setReloadInquiries] = useState<number>(0);

  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1">
        <WideBannerCarousel />
        <Hero />
        <TrustIndicators />
        <ServicesGrid onSelectService={setSelectedService} />
        <div id="lead-form-section">
          <LeadForm
            preselectedService={preselectedForForm}
            onClearPreselected={() => setPreselectedForForm("")}
            onNewInquiryAdded={() => setReloadInquiries((p) => p + 1)}
          />
        </div>
        <GallerySection />
        <BranchLocations />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppBubble />
      <SeoOverride page="home" />
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectForConsultation={(title) => setPreselectedForForm(title)}
        />
      )}
    </>
  );
}
