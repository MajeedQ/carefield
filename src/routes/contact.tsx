import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { LeadForm } from "@/components/site/LeadForm";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { SeoOverride } from "@/components/site/SeoOverride";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا واحجز كشف مجاني | مركز مجال العناية" },
      { name: "description", content: "احجز موعد كشف وتقييم سلوكي مجاني لطفلك. سيتواصل معك منسق الحالات لترتيب الزيارة." },
      { property: "og:title", content: "تواصل معنا — كشف مجاني" },
      { property: "og:description", content: "احجز موعد الكشف والتقييم المجاني الآن." },
      { property: "og:url", content: "https://carefield.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [preselected, setPreselected] = useState("");
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-blue-50/50 to-transparent py-14 border-b border-blue-50/30 text-center px-4">
          <span className="text-[10px] font-black tracking-widest text-[#002c6d] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">جلسات واستشارات</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#002c6d] tracking-tight mt-3">احجز موعد الكشف والتقييم المجاني</h1>
        </div>
        <LeadForm
          preselectedService={preselected}
          onClearPreselected={() => setPreselected("")}
          onNewInquiryAdded={() => {}}
        />
      </main>
      <Footer />
      <WhatsAppBubble />
      <SeoOverride page="contact" />
    </>
  );
}
