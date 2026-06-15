DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
CREATE POLICY "Anyone can submit leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(full_name)) BETWEEN 2 AND 120
    AND length(btrim(phone)) BETWEEN 5 AND 30
    AND length(coalesce(district,'')) <= 120
    AND length(coalesce(notes,'')) <= 2000
  );