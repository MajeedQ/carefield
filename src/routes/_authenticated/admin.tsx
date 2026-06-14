import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Image as ImageIcon, Megaphone, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { BannerManager } from "@/components/admin/BannerManager";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [tab, setTab] = useState<"banners" | "gallery">("banners");
  const navigate = useNavigate();
  const qc = useQueryClient();

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-[#f8f9ff] font-sans">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-base md:text-lg font-extrabold text-[#002c6d]">لوحة تحكم المركز</h1>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002c6d] hover:bg-blue-50 px-3 py-1.5 rounded-lg"
            >
              <Home className="w-3.5 h-3.5" /> الموقع
            </a>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5" /> خروج
            </button>
          </div>
        </div>
        <nav className="max-w-5xl mx-auto px-4 flex gap-1">
          <TabButton active={tab === "banners"} onClick={() => setTab("banners")}>
            <Megaphone className="w-4 h-4" /> البنرات
          </TabButton>
          <TabButton active={tab === "gallery"} onClick={() => setTab("gallery")}>
            <ImageIcon className="w-4 h-4" /> المعرض
          </TabButton>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {tab === "banners" ? <BannerManager /> : <GalleryManager />}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold border-b-2 transition ${
        active
          ? "border-[#002c6d] text-[#002c6d]"
          : "border-transparent text-slate-500 hover:text-[#002c6d]"
      }`}
    >
      {children}
    </button>
  );
}
