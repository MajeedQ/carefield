import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

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
