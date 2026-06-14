import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { Hero } from "@/components/site/Hero";
import { TrustIndicators } from "@/components/site/TrustIndicators";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ServiceDetailModal } from "@/components/site/ServiceDetailModal";
import { GallerySection } from "@/components/site/GallerySection";
import { LeadForm } from "@/components/site/LeadForm";
import { FAQSection } from "@/components/site/FAQSection";
import { InquiryDashboard } from "@/components/site/InquiryDashboard";
import { Footer } from "@/components/site/Footer";
import type { ServiceItem } from "@/lib/site-types";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [preselectedForForm, setPreselectedForForm] = useState<string>("");
  const [reloadInquiries, setReloadInquiries] = useState<number>(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <RegistrationBanner />
      <Header />
      <Hero />
      <TrustIndicators />
      <ServicesGrid onSelectService={setSelectedService} />
      <GallerySection />
      <div id="lead-form">
        <LeadForm
          preselectedService={preselectedForForm}
          onClearPreselected={() => setPreselectedForForm("")}
          onNewInquiryAdded={() => setReloadInquiries((p) => p + 1)}
        />
      </div>
      <InquiryDashboard reloadTrigger={reloadInquiries} />
      <FAQSection />
      <Footer />
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectForConsultation={(title) => setPreselectedForForm(title)}
        />
      )}
    </div>
  );
}
