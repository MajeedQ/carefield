import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import { bannersQuery } from "@/lib/site-content";

export const RegistrationBanner: React.FC = () => {
  const { data: banners = [] } = useQuery(bannersQuery(true));
  const textBanners = banners.filter((b) => b.kind === "text");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (textBanners.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % textBanners.length), 6000);
    return () => clearInterval(t);
  }, [textBanners.length]);

  // Fallback default if nothing in DB
  if (textBanners.length === 0) {
    return (
      <div className="bg-amber-100 text-[#775a19] border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-amber-500/20"
          >
            <Award className="w-3.5 h-3.5" />
            <span>تنبيه التسجيل</span>
          </motion.div>
          <p className="font-medium text-sm md:text-base leading-relaxed">
            يبدأ التسجيل للعام التأهيلي الجديد <strong>1448هـ</strong> يوم الأحد{" "}
            <strong>21/06/2026</strong> وينتهي يوم الخميس <strong>16/07/2026</strong>
          </p>
        </div>
      </div>
    );
  }

  const b = textBanners[idx % textBanners.length];
  return (
    <div
      className="border-b transition-colors"
      style={{
        background: b.bg_color || "#fef3c7",
        color: b.text_color || "#775a19",
        borderColor: "rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-3 text-center min-h-[56px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-3"
          >
            {b.title && (
              <span className="flex items-center gap-1 bg-black/5 px-3 py-1 rounded-full text-xs font-bold border border-black/10">
                <Award className="w-3.5 h-3.5" /> {b.title}
              </span>
            )}
            {b.body && (
              <p className="font-medium text-sm md:text-base leading-relaxed">
                {b.link_url ? (
                  <a href={b.link_url} className="hover:underline">
                    {b.body}
                  </a>
                ) : (
                  b.body
                )}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
        {textBanners.length > 1 && (
          <div className="flex gap-1">
            {textBanners.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === idx % textBanners.length ? "bg-current" : "bg-current/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
