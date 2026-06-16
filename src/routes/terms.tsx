import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "شروط الاستخدام | مركز مجال العناية" },
      { name: "description", content: "شروط وأحكام استخدام موقع مركز مجال العناية للرعاية النهارية، متوافقة مع أنظمة وزارة الموارد البشرية والتنمية الاجتماعية." },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1 bg-white">
        <article className="max-w-3xl mx-auto px-4 py-10 md:py-14 leading-loose text-[#1c2536]">
          <h1 className="text-3xl md:text-4xl font-black text-[#002c6d] mb-2">شروط الاستخدام والأحكام</h1>
          <p className="text-xs text-[#434651]/70 mb-6">آخر تحديث: يونيو 2026</p>

          <Section title="القبول بالشروط">
            باستخدامك موقع <strong>مركز مجال العناية للرعاية النهارية</strong> فإنك توافق على الالتزام بهذه الشروط
            والأحكام، ولوائح وأنظمة المملكة العربية السعودية، ولوائح <strong>وزارة الموارد البشرية والتنمية الاجتماعية</strong> المنظِّمة
            لدور الرعاية النهارية لذوي الإعاقة.
          </Section>

          <Section title="طبيعة الخدمات">
            يقدّم المركز خدمات تأهيلية وسلوكية وعلاجية ضمن مرخّص رسمي من وزارة الموارد البشرية والتنمية الاجتماعية،
            ولا يُعد بديلاً عن العلاج الطبي الطارئ أو خدمات المستشفيات.
          </Section>

          <Section title="التزامات ولي الأمر / المستفيد">
            <ul className="list-disc pr-6 space-y-1.5">
              <li>تقديم بيانات صحيحة وكاملة عند التسجيل والتقييم.</li>
              <li>الالتزام بالمواعيد والبرامج المعتمدة من فريق التأهيل.</li>
              <li>إبلاغ المركز بأي تغيير في الحالة الصحية أو الأدوية أو الحساسية.</li>
              <li>سداد الرسوم المتفق عليها وفق سياسات المركز المالية.</li>
            </ul>
          </Section>

          <Section title="التزامات المركز">
            <ul className="list-disc pr-6 space-y-1.5">
              <li>تقديم الخدمات بإشراف فريق مرخّص ومؤهّل وفق الاشتراطات الوزارية.</li>
              <li>الحفاظ على بيئة آمنة وصحية ومراقَبة.</li>
              <li>الحفاظ على سرية بيانات المستفيد كما هو موضّح في{" "}
                <Link to="/privacy" className="text-[#002c6d] underline">سياسة الخصوصية</Link>.
              </li>
              <li>إصدار تقارير دورية حول تقدّم الحالة.</li>
            </ul>
          </Section>

          <Section title="الملكية الفكرية">
            جميع المحتويات (نصوص، صور، شعار، تصاميم) المعروضة في الموقع مملوكة للمركز ولا يجوز نسخها أو إعادة
            نشرها دون إذن خطي مسبق.
          </Section>

          <Section title="إخلاء المسؤولية">
            يبذل المركز قصارى جهده لضمان دقة المحتوى المنشور، لكنه لا يضمن خلوّه التام من الأخطاء أو الانقطاعات
            التقنية، ولا يتحمل مسؤولية الأضرار الناتجة عن استخدام معلومات الموقع خارج نطاق العلاقة التعاقدية مع المركز.
          </Section>

          <Section title="إنهاء الخدمة">
            يحق للمركز إنهاء الخدمة أو تعليقها في حال الإخلال بأي من شروط التسجيل، أو لأسباب صحية أو سلوكية تستدعي
            ذلك، وفق ما تنصّ عليه لوائح الوزارة وسياسات المركز الداخلية.
          </Section>

          <Section title="القانون المعمول به والاختصاص القضائي">
            تخضع هذه الشروط لأنظمة المملكة العربية السعودية، ويختص بالنظر في أي نزاع ينشأ عنها الجهات القضائية المختصة
            في مدينة الرياض.
          </Section>

          <Section title="تعديل الشروط">
            يحتفظ المركز بحق تعديل هذه الشروط في أي وقت، ويعتبر استمرار استخدامك للموقع موافقةً ضمنية على التعديلات
            المنشورة.
          </Section>
        </article>
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="text-xl md:text-2xl font-extrabold text-[#002c6d] mb-2">{title}</h2>
      <div className="text-[15px] text-[#1c2536]">{children}</div>
    </section>
  );
}
