import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { blogPostBySlugQuery } from "@/lib/blog";
import { Calendar, ArrowRight, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} | مدونة مركز مجال العناية` },
      { name: "description", content: "مقال من مدونة مركز مجال العناية للرعاية النهارية." },
    ],
  }),
  component: BlogPostPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-extrabold text-[#002c6d]">حدث خطأ</h1>
        <p className="text-[#434651] mt-2">{(error as Error)?.message ?? ""}</p>
        <Link to="/blog" className="inline-block mt-4 text-[#002c6d] underline">العودة للمدونة</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-extrabold text-[#002c6d]">المقال غير موجود</h1>
        <Link to="/blog" className="inline-block mt-4 text-[#002c6d] underline">العودة للمدونة</Link>
      </div>
    </div>
  ),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery(blogPostBySlugQuery(slug));

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">جارٍ التحميل…</div>;
  }
  if (!post) throw notFound();

  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1 bg-white">
        <article className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002c6d] hover:underline mb-6">
            <ArrowRight className="w-4 h-4" /> العودة للمدونة
          </Link>

          {post.category && (
            <span className="text-[11px] font-black tracking-widest text-[#775a19] bg-amber-50 px-3 py-1.5 rounded-full inline-block">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-[#002c6d] tracking-tight mt-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-5 text-xs text-[#434651]/80 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </span>
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
            )}
          </div>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full rounded-2xl shadow-lg my-8 aspect-[16/9] object-cover"
            />
          )}

          {post.excerpt && (
            <p className="text-lg text-[#434651] leading-relaxed border-r-4 border-[#775a19] pr-4 my-6">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose prose-slate max-w-none rtl:text-right text-[#1c2536] leading-loose [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-[#002c6d] [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#002c6d] [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pr-6 [&_ol]:list-decimal [&_ol]:pr-6 [&_li]:my-1 [&_a]:text-[#002c6d] [&_a]:underline [&_img]:rounded-xl [&_img]:my-4"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-[#002c6d] font-bold">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}

// Allow simple markdown-like content: if starts with <, treat as HTML; otherwise wrap paragraphs.
function renderContent(raw: string): string {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("<")) return trimmed;
  return trimmed
    .split(/\n{2,}/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
