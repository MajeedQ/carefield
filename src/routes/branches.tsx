import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { BranchLocations } from "@/components/site/BranchLocations";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "فروعنا في الرياض | مركز مجال العناية" },
      { name: "description", content: "فروع المركز للبنين: ضاحية لبن وحي النزهة - مع مواصلات لكل أحياء الرياض ومرافقين معتمدين." },
      { property: "og:title", content: "فروعنا في الرياض" },
      { property: "og:description", content: "تفضل بزيارتنا في فرعَي ضاحية لبن وحي النزهة." },
      { property: "og:url", content: "https://carefield.lovable.app/branches" },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/branches" }],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-blue-50/50 to-transparent py-14 border-b border-blue-50/30 text-center px-4">
          <span className="text-[10px] font-black tracking-widest text-[#775a19] bg-amber-50 px-3.5 py-1.5 rounded-full inline-block">العثور على فرع</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#002c6d] tracking-tight mt-3">فروعنا وتغطيتنا الجغرافية بالمملكة</h1>
        </div>
        <BranchLocations />
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
