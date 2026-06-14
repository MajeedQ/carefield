
-- Address linter: revoke EXECUTE from anon and PUBLIC on has_role
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Rewrite anon-readable policies to avoid calling has_role as anon
DROP POLICY "Public can view active banners" ON public.banners;
CREATE POLICY "Public can view active banners" ON public.banners
FOR SELECT TO anon USING (active = true);
CREATE POLICY "Auth can view banners" ON public.banners
FOR SELECT TO authenticated USING (active = true OR public.has_role(auth.uid(),'admin'));

DROP POLICY "Public can view active gallery items" ON public.gallery_items;
CREATE POLICY "Public can view active gallery items" ON public.gallery_items
FOR SELECT TO anon USING (active = true);
CREATE POLICY "Auth can view gallery" ON public.gallery_items
FOR SELECT TO authenticated USING (active = true OR public.has_role(auth.uid(),'admin'));

-- Storage policies for site-media bucket
CREATE POLICY "Public read site-media" ON storage.objects
FOR SELECT TO anon, authenticated USING (bucket_id = 'site-media');

CREATE POLICY "Admins upload site-media" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "Admins update site-media" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'site-media' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "Admins delete site-media" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'site-media' AND public.has_role(auth.uid(),'admin'));
