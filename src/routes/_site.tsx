import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppProvider } from "@/context/AppContext";
import { ThemeStyleInjector } from "@/components/site/ThemeStyleInjector";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <AppProvider>
      <ThemeStyleInjector />
      <div dir="rtl" lang="ar" className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
        <Outlet />
      </div>
    </AppProvider>
  );
}
