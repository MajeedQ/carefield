import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppBubble } from "@/components/site/WhatsAppBubble";
import { RegistrationBanner } from "@/components/site/RegistrationBanner";
import { blogPostsQuery } from "@/lib/blog";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "المدونة | مركز مجال العناية للرعاية النهارية" },
      { name: "description", content: "مقالات ومحتوى متخصص في الرعاية النهارية، التأهيل السلوكي، علاج النطق، التخاطب وذوي الإعاقة." },
      { property: "og:title", content: "المدونة - مركز مجال العناية" },
      { property: "og:description", content: "مقالات ومحتوى متخصص في الرعاية والتأهيل." },
      { property: "og:url", content: "https://carefield.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://carefield.lovable.app/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts = [], isLoading } = useQuery(blogPostsQuery(true));
  return (
    <>
      <RegistrationBanner />
      <Header />
      <main className="flex-1 bg-[#f8f9ff]">
        <div className="bg-gradient-to-b from-blue-50/50 to-transparent py-14 border-b border-blue-50/30 text-center px-4">
          <span className="text-[10px] font-black tracking-widest text-[#002c6d] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">مقالاتنا</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#002c6d] tracking-tight mt-3">المدونة</h1>
          <p className="text-sm md:text-base text-[#434651] mt-3 max-w-2xl mx-auto leading-relaxed">
            محتوى متخصص في الرعاية النهارية، التأهيل السلوكي، علاج النطق والتخاطب وذوي الإعاقة.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          {isLoading && <p className="text-center text-[#434651]">جارٍ التحميل…</p>}
          {!isLoading && posts.length === 0 && (
            <p className="text-center text-[#434651]">لا توجد مقالات منشورة حالياً.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-white rounded-2xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                {p.cover_image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-blue-50">
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 to-amber-50/50" />
                )}
                <div className="p-5 flex flex-col gap-2.5 flex-1">
                  {p.category && (
                    <span className="text-[10px] font-bold tracking-wide text-[#775a19] bg-amber-50 px-2 py-1 rounded-md self-start">
                      {p.category}
                    </span>
                  )}
                  <h2 className="text-lg font-extrabold text-[#002c6d] leading-snug line-clamp-2">{p.title}</h2>
                  {p.excerpt && <p className="text-sm text-[#434651] leading-relaxed line-clamp-3">{p.excerpt}</p>}
                  <div className="flex items-center gap-2 text-[11px] text-[#434651]/70 mt-auto pt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={p.published_at}>
                      {new Date(p.published_at).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <ArrowLeft className="w-4 h-4 ms-auto text-[#002c6d] group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
