import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ServiceDetailModal } from "@/components/site/ServiceDetailModal";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import type { ServiceItem } from "@/lib/site-types";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدماتنا التأهيلية | مركز مجال العناية" },
      { name: "description", content: "تعديل سلوك، علاج تخاطب، علاج طبيعي ووظيفي، دمج أكاديمي، تدريب مهني، أنشطة ترفيهية - جلسات فردية بإشراف نخبة معتمدة." },
      { property: "og:title", content: "خدماتنا التأهيلية" },
      { property: "og:description", content: "برامج تأهيل متخصصة لذوي الإعاقة بإشراف أخصائيين معتمدين." },
      { property: "og:url", content: "https://carefield.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [selected, setSelected] = useState<ServiceItem | null>(null);
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-blue-50/50 to-transparent py-14 border-b border-blue-50/30 text-center px-4">
          <span className="text-[10px] font-black tracking-widest text-[#002c6d] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">برامجنا المتخصصة</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#002c6d] tracking-tight mt-3">أفضل باقة من الخدمات التأهيلية الفردية</h1>
        </div>
        <ServicesGrid onSelectService={setSelected} />
      </main>
      <Footer />
      <WhatsAppBubble />
      {selected && (
        <ServiceDetailModal
          service={selected}
          onClose={() => setSelected(null)}
          onSelectForConsultation={() => { setSelected(null); window.location.href = "/contact"; }}
        />
      )}
    </>
  );
}
