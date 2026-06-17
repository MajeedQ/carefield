import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";
import { Header } from "@/components/site/Header";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { SeoOverride } from "@/components/site/SeoOverride";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "تم استلام طلبك بنجاح | مركز مجال العناية" },
      { name: "description", content: "شكراً لثقتك بمركز مجال العناية. تم استلام طلبك وسنتواصل معك خلال 24 ساعة." },
      { property: "og:title", content: "تم استلام طلبك بنجاح | مركز مجال العناية" },
      { property: "og:description", content: "شكراً لثقتك بمركز مجال العناية. تم استلام طلبك وسنتواصل معك خلال 24 ساعة." },
      { property: "og:url", content: "https://carefieldc.com/thank-you" },
    ],
    links: [{ rel: "canonical", href: "https://carefieldc.com/thank-you" }],
  }),
  component: ThankYouPage,
});

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const checkmarkVariants: any = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 180, damping: 10, delay: 0.15 },
  },
};

function ThankYouPage() {
  const { config } = useApp();
  const c = config.content || {};
  const search = Route.useSearch() as { ticket?: string };
  const ticketId = search.ticket || "";

  const waRaw = String(config?.socialMedia?.whatsapp || "966560098881").trim();
  const waText = encodeURIComponent(
    config?.socialMedia?.whatsappMessage ||
      "السلام عليكم، أرسلت طلب تسجيل عبر الموقع وأرغب بتأكيد موعد التقييم المجاني."
  );
  const whatsappUrl = waRaw.startsWith("http")
    ? waRaw.includes("?")
      ? waRaw
      : `${waRaw}?text=${waText}`
    : `https://wa.me/${waRaw.replace(/\+/g, "")}?text=${waText}`;

  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-[#f4f7fc]/50 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
          <div className="absolute top-0 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,44,109,0.04),0_1px_3px_rgba(0,0,0,0.01)] p-6 md:p-10 relative z-10 border border-blue-100/50 text-center">
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#002c6d] via-amber-500 to-[#002c6d] rounded-t-[24px]" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="py-6 flex flex-col items-center"
            >
              <motion.div
                variants={checkmarkVariants}
                className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-5 shadow-xs"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              {ticketId && (
                <motion.span
                  variants={itemVariants}
                  className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full"
                >
                  تم استلام طلبك بنجاح · رقم التذكرة {ticketId}
                </motion.span>
              )}

              <motion.h1
                variants={itemVariants}
                className="text-xl md:text-2xl font-black text-[#002c6d] mt-4 mb-3"
              >
                {c.form_success_title ||
                  "وصلَنا طلبك 💚 وسنتواصل معك خلال 24 ساعة"}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xs md:text-sm text-[#434651] font-light leading-relaxed max-w-xl mx-auto"
              >
                {c.form_success_body ||
                  "شكراً لثقتك بمركز مجال العناية. تم تحويل طلبك مباشرةً إلى منسّق القبول والاستشارات، وسيتواصل معك على الرقم الذي أرسلته لترتيب موعد التقييم السلوكي المجاني في الفرع الأقرب."}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-6 bg-[#002c6d]/5 p-5 rounded-2xl border border-blue-50 max-w-lg w-full text-right flex flex-col gap-3 shadow-6xs"
              >
                <h4 className="font-bold text-[#002c6d] text-xs">
                  خطواتك القادمة:
                </h4>
                <div className="space-y-2 text-xs text-[#434651] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002c6d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      1
                    </span>
                    <span>
                      {c.form_step_1 ||
                        "مكالمة ترحيبية قصيرة من فريق القبول لتحديد موعد الزيارة."}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002c6d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      2
                    </span>
                    <span>
                      {c.form_step_2 ||
                        "تقييم سلوكي وحركي مجاني داخل المركز يحدد الخدمة الأنسب لطفلك."}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002c6d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      3
                    </span>
                    <span>
                      {c.form_step_3 ||
                        "عرض خطة تأهيل واضحة مع المواعيد ووسائل النقل عند الحاجة."}
                    </span>
                  </div>
                </div>
                {ticketId && (
                  <p className="text-[11px] text-slate-500 mt-1">
                    احتفظ برقم التذكرة{" "}
                    <strong className="text-[#002c6d]">{ticketId}</strong>{" "}
                    للرجوع إليه عند التواصل.
                  </p>
                )}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center"
              >
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#434651] hover:bg-slate-50 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  {c.form_new_btn || "تسجيل مستفيد آخر"}
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-[0.99] transition-transform shadow-md cursor-pointer"
                >
                  <span>
                    {c.form_whatsapp_btn || "متابعة فورية على الواتساب"}
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppBubble />
      <SeoOverride page="contact" />
    </>
  );
}
