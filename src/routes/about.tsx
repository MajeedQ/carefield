import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { AboutSection } from "@/components/site/AboutSection";
import { GallerySection } from "@/components/site/GallerySection";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | مركز مجال العناية للرعاية النهارية" },
      { name: "description", content: "تعرف على رؤية ورسالة وأهداف مركز مجال العناية - معتمد بتصنيف A+ من وزارة الموارد البشرية لرعاية ذوي الإعاقة بالرياض." },
      { property: "og:title", content: "من نحن — مركز مجال العناية" },
      { property: "og:description", content: "رؤية ورسالة وأهداف مركز رعاية وتأهيل ذوي الإعاقة في الرياض." },
      { property: "og:url", content: "https://carefield.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-blue-50/50 to-transparent py-14 border-b border-blue-50/30 text-center px-4">
          <span className="text-[10px] font-black tracking-widest text-[#775a19] bg-amber-50 px-3.5 py-1.5 rounded-full inline-block">من نحن والاعتماد</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#002c6d] tracking-tight mt-3">ريادة الرعاية والاعتماد المهني المستدام</h1>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mt-3">
            تعرف على رسالتنا وخطواتنا المعتمدة بالكامل من وزارة الموارد البشرية لخدمة الفئات الخاصة.
          </p>
        </div>
        <AboutSection />
        <GallerySection />
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
