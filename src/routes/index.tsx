import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مركز مجال العناية — رعاية وتأهيل ذوي الاحتياجات الخاصة" },
      {
        name: "description",
        content:
          "مركز مجال العناية يقدم خدمات تأهيلية متكاملة لذوي الاحتياجات الخاصة في الرياض، بنخبة من الأخصائيين المعتمدين وبيئة آمنة ومتطورة.",
      },
      { property: "og:title", content: "مركز مجال العناية" },
      {
        property: "og:description",
        content: "رعاية وتأهيل ذوي الاحتياجات الخاصة في الرياض.",
      },
    ],
  }),
  component: Index,
});

const services = [
  { icon: "🎓", title: "فصول تعليمية" },
  { icon: "🧑‍🏫", title: "جلسات تدريبية فردية" },
  { icon: "🧠", title: "جلسات تعديل وبناء سلوك" },
  { icon: "🗣️", title: "النطق والتخاطب" },
  { icon: "🧘", title: "العلاج الطبيعي" },
  { icon: "🤚", title: "العلاج الوظيفي" },
  { icon: "🧩", title: "غرفة تكامل حسي وتنمية مهارات" },
  { icon: "⚽", title: "أنشطة رياضية وترفيهية" },
  { icon: "🤝", title: "التأهيل النفسي والاجتماعي" },
  { icon: "🌱", title: "مهارات استقلالية واجتماعية" },
  { icon: "💻", title: "مهارات الحاسب الآلي" },
  { icon: "🛠️", title: "مهارات التعلم المهني والفني" },
  { icon: "👥", title: "التأهيل للدمج" },
  { icon: "🩺", title: "رعاية طبية" },
  { icon: "🏆", title: "مشاركة بطولات رياضية" },
];

const trust = [
  { icon: "🏅", text: "أكثر من 8 سنوات خبرة وتصنيف A+" },
  { icon: "👨‍👩‍👧", text: "الفئات العمرية من 12 إلى 45 سنة" },
  { icon: "🏙️", text: "فروعنا: لبن والنزهة (بنين)" },
  { icon: "🚌", text: "مواصلات لجميع أحياء الرياض مع مرافقة" },
];

function Index() {
  const [form, setForm] = useState({ name: "", phone: "", district: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div dir="rtl" lang="ar" className="min-h-screen flex flex-col bg-background text-foreground">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap"
      />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/966560098881"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل واتساب"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Header */}
      <header className="bg-surface border-b border-outline-variant/40 sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg shadow-md">
              م
            </div>
            <div>
              <div className="font-bold text-on-surface leading-tight">مركز مجال العناية</div>
              <div className="text-xs text-on-surface-variant">للتأهيل والرعاية</div>
            </div>
          </div>
          <a
            href="#lead-form"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold shadow hover:opacity-90 transition"
          >
            تواصل معنا
          </a>
        </div>
      </header>

      {/* Registration banner */}
      <div className="bg-secondary-container text-on-secondary-container py-3 px-6 text-center text-sm font-medium shadow-sm">
        <p>
          يبدأ التسجيل للعام التأهيلي الجديد 1448هـ يوم الأحد 21/06/2026 وينتهي يوم الخميس 16/07/2026
        </p>
      </div>

      {/* Hero */}
      <section className="relative pt-12 pb-12 px-6 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5 z-10 text-center md:text-right">
          <span className="self-center md:self-start inline-block bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold">
            مرخص ومعتمد · تصنيف A+
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
            الرعاية الأمثل لأطفالنا
            <br />
            <span className="text-secondary">ذوي الاحتياجات الخاصة</span>
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-xl mx-auto md:mx-0 leading-relaxed">
            في مركز مجال العناية، نقدم بيئة آمنة ومتطورة لتأهيل وتطوير مهارات الأطفال، مع نخبة من
            الأخصائيين المعتمدين.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full md:w-auto md:self-start"
            >
              <span>اطلب التواصل الآن</span>
              <span>←</span>
            </a>
            <p className="text-xs text-on-surface-variant/70 text-center md:text-right">
              * هذا النموذج لطلب استشارة مبدئية للتواصل معكم، وليس تسجيلاً في الرعاية النهارية
              الحكومية.
            </p>
          </div>
        </div>

        <div className="relative w-full h-[320px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/20 z-10 mix-blend-overlay" />
          <img
            alt="بيئة رعاية متطورة"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtmrKHWruhd8B7jOPSXzUNaz0LSxp3ywigDxzGiXIrMGThLH_UtXSv_6M4mvqL-i7yDTFvdQGwSMApodmIPbTv3qX6kCX3GdwR52rIdgPCHgwgFGQfCsaTh7RzYQqqmefBQGsg0w2BvyfZAbTzvAQg-qvQMtgU9y3rSoX73gt0mZYwiA5lsKmiDOL7pO3r15YaQZWOdQ_AsgAolu7kmCjpHnyFWWjO2UVqaSS2GiIkNnyKNZiEEVIJFWlgrVqOjx0aUmpYlEKdyYSXVw"
          />
          <div className="absolute bottom-5 right-5 z-20 glass-panel px-4 py-3 rounded-xl shadow-lg border border-white/40">
            <div className="flex items-center gap-2">
              <span className="text-secondary text-xl">✓</span>
              <span className="font-bold text-primary text-sm">رعاية معتمدة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="bg-surface-container py-6 px-6 w-full border-y border-outline-variant/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trust.map((t) => (
            <div
              key={t.text}
              className="flex items-center gap-3 bg-surface p-4 rounded-xl shadow-sm border border-secondary/15"
            >
              <span className="text-3xl">{t.icon}</span>
              <span className="font-semibold text-on-surface text-sm">{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-secondary font-bold text-sm tracking-wide">خدماتنا</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2 mb-3">
            الخدمات المقدمة
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات التأهيلية المصممة خصيصاً لتلبية احتياجات كل فرد.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-surface rounded-2xl p-6 shadow-sm border-t-4 border-secondary hover:shadow-xl transition-all hover:-translate-y-1 duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="font-bold text-on-surface text-lg">{s.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 bg-surface-container w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              معرض الصور والفيديو
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              جانب من أنشطتنا وفعالياتنا وبيئة العمل داخل المركز
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
              "https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=600&q=80",
              "https://images.unsplash.com/photo-1564429097439-e4ffac8e3c2c?w=600&q=80",
              "https://images.unsplash.com/photo-1607582544224-a32e4ce6d52c?w=600&q=80",
              "https://images.unsplash.com/photo-1544776527-68e63addedf7?w=600&q=80",
              "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
              "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square bg-surface rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 group"
              >
                <img
                  src={src}
                  alt={`نشاط ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section
        id="lead-form"
        className="py-20 px-6 bg-surface-container-low w-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-3xl mx-auto bg-surface rounded-3xl shadow-xl p-8 md:p-12 relative z-10 border border-outline-variant/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              سجل بياناتك للتواصل معك
            </h2>
            <p className="text-on-surface-variant">
              يرجى تعبئة النموذج أدناه وسيقوم فريقنا بالتواصل معكم في أقرب وقت لتقديم الاستشارة
              المناسبة.
            </p>
          </div>
          {submitted ? (
            <div className="text-center bg-primary-container text-on-primary-container rounded-2xl p-8">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="font-bold text-xl mb-2">تم استلام طلبك بنجاح</h3>
              <p>سنقوم بالتواصل معكم في أقرب وقت ممكن. شكراً لثقتكم بنا.</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-on-surface text-right" htmlFor="fullName">
                  الاسم الكامل
                </label>
                <input
                  required
                  id="fullName"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="أدخل اسمك الكريم"
                  className="rounded-xl border border-outline-variant bg-surface px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-on-surface text-right" htmlFor="phone">
                  رقم الجوال
                </label>
                <input
                  required
                  id="phone"
                  type="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="05X XXX XXXX"
                  className="rounded-xl border border-outline-variant bg-surface px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all text-right w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-on-surface text-right" htmlFor="district">
                  الحي أو المدينة
                </label>
                <input
                  required
                  id="district"
                  type="text"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  placeholder="مثال: الرياض - حي النزهة"
                  className="rounded-xl border border-outline-variant bg-surface px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-md hover:opacity-90 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>اطلب التواصل الآن</span>
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <div className="font-extrabold text-xl mb-2">مركز مجال العناية</div>
            <p className="text-sm opacity-80 leading-relaxed">
              مركز متخصص في تأهيل ورعاية ذوي الاحتياجات الخاصة في الرياض.
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">الفروع</div>
            <ul className="text-sm opacity-90 space-y-1">
              <li>فرع لبن — الرياض</li>
              <li>فرع النزهة (بنين) — الرياض</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">تواصل معنا</div>
            <a
              href="https://wa.me/966560098881"
              className="text-sm opacity-90 hover:opacity-100"
              dir="ltr"
            >
              📱 +966 56 009 8881
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-primary-foreground/20 mt-8 pt-4 text-center text-xs opacity-70">
          © {new Date().getFullYear()} مركز مجال العناية. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
