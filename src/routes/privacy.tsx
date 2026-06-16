import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية | مركز مجال العناية" },
      { name: "description", content: "سياسة خصوصية مركز مجال العناية للرعاية النهارية، متوافقة مع أنظمة وزارة الموارد البشرية والتنمية الاجتماعية بالمملكة العربية السعودية." },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1 bg-white">
        <article className="max-w-3xl mx-auto px-4 py-10 md:py-14 leading-loose text-[#1c2536]">
          <h1 className="text-3xl md:text-4xl font-black text-[#002c6d] mb-2">سياسة الخصوصية</h1>
          <p className="text-xs text-[#434651]/70 mb-6">آخر تحديث: يونيو 2026</p>

          <Section title="مقدمة">
            يلتزم <strong>مركز مجال العناية للرعاية النهارية</strong> بحماية خصوصية المستفيدين وذويهم وزوار الموقع،
            وذلك وفقاً لأنظمة المملكة العربية السعودية، خصوصاً نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي
            رقم (م/19) لعام 1443هـ، ولوائح <strong>وزارة الموارد البشرية والتنمية الاجتماعية</strong> ذات العلاقة بدور
            الرعاية النهارية لذوي الإعاقة.
          </Section>

          <Section title="البيانات التي نجمعها">
            <ul className="list-disc pr-6 space-y-1.5">
              <li>الاسم الكامل، رقم الجوال، الحي/العنوان، البريد الإلكتروني عند تعبئة نموذج طلب الخدمة.</li>
              <li>عمر المستفيد ونوع الخدمة المطلوبة لأغراض التقييم وتقديم الرعاية المناسبة.</li>
              <li>ملاحظات صحية أو سلوكية يدوّنها الفريق الطبي/التأهيلي بعد قبول المستفيد.</li>
              <li>بيانات الاستخدام التقنية (نوع المتصفح، الجهاز، عنوان الـ IP) لأغراض الأمان وتحسين الأداء.</li>
            </ul>
          </Section>

          <Section title="الغرض من جمع البيانات">
            <ul className="list-disc pr-6 space-y-1.5">
              <li>تقديم خدمات الرعاية النهارية والتأهيل وفقاً لاحتياجات المستفيد.</li>
              <li>التواصل مع ولي الأمر بخصوص المواعيد، التقييمات، والتقارير الدورية.</li>
              <li>تحسين جودة الخدمات والبرامج المقدمة.</li>
              <li>الالتزام بالتزامات المركز التنظيمية أمام وزارة الموارد البشرية والتنمية الاجتماعية والجهات الرقابية.</li>
            </ul>
          </Section>

          <Section title="مشاركة البيانات">
            لا يقوم المركز ببيع أو تأجير بياناتك الشخصية. قد تتم مشاركة بياناتك فقط في الحالات الآتية:
            <ul className="list-disc pr-6 space-y-1.5 mt-2">
              <li>عند طلب رسمي من الجهات الحكومية أو القضائية المختصة.</li>
              <li>مع مزودي خدمات تقنية ملتزمين بسرية البيانات (استضافة، رسائل، خرائط) ضمن الحد اللازم لتشغيل الخدمة.</li>
              <li>عند الحصول على موافقتك الصريحة.</li>
            </ul>
          </Section>

          <Section title="حفظ البيانات وأمنها">
            تُحفظ البيانات في خوادم آمنة وتُطبَّق إجراءات تشفير وحماية مناسبة. يُحتفظ ببيانات المستفيدين طوال فترة
            تقديم الخدمة وللمدد النظامية المطلوبة بعد انتهائها.
          </Section>

          <Section title="حقوقك">
            وفقاً لنظام حماية البيانات الشخصية، يحق لك:
            <ul className="list-disc pr-6 space-y-1.5 mt-2">
              <li>طلب الاطلاع على بياناتك أو الحصول على نسخة منها.</li>
              <li>طلب تصحيح أو تحديث أي بيانات غير صحيحة.</li>
              <li>طلب حذف بياناتك ما لم يكن هناك التزام نظامي بالاحتفاظ بها.</li>
              <li>سحب موافقتك على معالجة البيانات في أي وقت.</li>
            </ul>
          </Section>

          <Section title="ملفات تعريف الارتباط (Cookies)">
            يستخدم الموقع ملفات تعريف ارتباط أساسية لتشغيل الموقع وتحليل الأداء (مثل Google Analytics) دون الإفصاح
            عن هويتك الشخصية.
          </Section>

          <Section title="التواصل بخصوص الخصوصية">
            للاستفسار أو ممارسة أي من حقوقك، يُرجى التواصل عبر بريد المركز أو أرقام التواصل المتوفرة في صفحة{" "}
            <Link to="/contact" className="text-[#002c6d] underline">تواصل معنا</Link>.
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
