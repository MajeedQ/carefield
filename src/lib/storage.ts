import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-media";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function uploadMedia(file: File): Promise<{ url: string; path: string }> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, ONE_YEAR);
  if (signErr || !data) throw signErr ?? new Error("Sign failed");
  return { url: data.signedUrl, path };
}

export async function deleteMedia(url: string) {
  // url may be a signed URL — extract the object path after /site-media/
  const m = url.match(/\/site-media\/([^?]+)/);
  if (!m) return;
  await supabase.storage.from(BUCKET).remove([m[1]]);
}
