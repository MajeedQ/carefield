import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  full_name: z.string().min(2).max(120),
  phone: z.string().min(8).max(20),
  district: z.string().min(1).max(120),
  age: z.string().max(40).optional().default(""),
  service_id: z.string().max(200).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        full_name: data.full_name,
        phone: data.phone,
        district: data.district,
        age: data.age ?? "",
        service_id: data.service_id ?? "",
        notes: data.notes ?? "",
        status: "pending",
      })
      .select("id, created_at")
      .single();

    if (error) throw new Error(error.message);

    // Optional: forward to Google Sheets webhook if configured
    try {
      const { data: settings } = await supabaseAdmin
        .from("site_settings")
        .select("sheets_webhook_url")
        .limit(1)
        .maybeSingle();
      const url = (settings as any)?.sheets_webhook_url;
      if (url) {
        // Fire and forget
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: row?.id, created_at: row?.created_at }),
        }).catch(() => {});
      }
    } catch {
      // ignore webhook errors
    }

    return { id: row?.id, ok: true };
  });
