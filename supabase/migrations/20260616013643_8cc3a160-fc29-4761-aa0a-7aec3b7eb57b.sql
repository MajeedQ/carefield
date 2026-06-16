GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='gallery_items' AND policyname='Public read gallery') THEN
    CREATE POLICY "Public read gallery" ON public.gallery_items FOR SELECT TO anon, authenticated
      USING (active = true OR public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='banners' AND policyname='Public read banners') THEN
    CREATE POLICY "Public read banners" ON public.banners FOR SELECT TO anon, authenticated
      USING (active = true OR public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='site_settings' AND policyname='Public read settings') THEN
    CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT TO anon, authenticated
      USING (true);
  END IF;
END $$;