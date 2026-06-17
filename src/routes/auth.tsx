import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    reason: typeof s.reason === "string" ? s.reason : undefined,
  }),
  head: () => ({
    meta: [
      { title: "تسجيل دخول لوحة الإدارة | مركز مجال العناية" },
      { name: "description", content: "صفحة تسجيل دخول لوحة إدارة مركز مجال العناية للرعاية النهارية. مخصصة لطاقم الإدارة المعتمد فقط لإدارة المحتوى والاستفسارات." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const { reason } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    reason === "no_access"
      ? "تم تسجيل الدخول لكن لا توجد لديك صلاحية للوصول إلى لوحة التحكم. تواصل مع مدير الموقع."
      : null,
  );

  useEffect(() => {
    if (reason === "no_access") return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate, reason]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await router.invalidate();
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message ?? "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      await router.invalidate();
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message ?? "حدث خطأ أثناء تسجيل الدخول بـ Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#f8f9ff] px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-[#002c6d] text-center">
          لوحة تحكم المركز
        </h1>
        <p className="text-sm text-center text-slate-500 mt-1">
          {mode === "signin" ? "سجّل دخولك للمتابعة" : "أنشئ حساب الأدمن الأول"}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#0b1c30] block mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className="w-full rounded-xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#002c6d] focus:ring-1 focus:ring-[#002c6d] outline-none text-left"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#0b1c30] block mb-1.5">كلمة المرور</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              className="w-full rounded-xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-[#002c6d] focus:ring-1 focus:ring-[#002c6d] outline-none text-left"
            />
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#002c6d] text-white py-3 rounded-xl font-bold hover:bg-[#1a438d] transition disabled:opacity-60"
          >
            {loading ? "..." : mode === "signin" ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[10px]">
            <span className="bg-white px-3 text-slate-400">أو</span>
          </div>
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-60"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          تسجيل الدخول بـ Google
        </button>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full mt-4 text-xs text-[#002c6d] hover:underline"
        >
          {mode === "signin"
            ? "ما عندك حساب؟ سجّل أول أدمن"
            : "عندك حساب؟ تسجيل الدخول"}
        </button>

        <a
          href="/"
          className="block text-center text-[11px] text-slate-400 mt-4 hover:text-slate-600"
        >
          → العودة للموقع
        </a>
      </div>
    </div>
  );
}
