GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

GRANT SELECT ON public.branches TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.branches TO authenticated;
GRANT ALL ON public.branches TO service_role;

GRANT SELECT ON public.wide_banners TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wide_banners TO authenticated;
GRANT ALL ON public.wide_banners TO service_role;

GRANT SELECT ON public.hero_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;

GRANT SELECT ON public.hero_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_stats TO authenticated;
GRANT ALL ON public.hero_stats TO service_role;

GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;

GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;

GRANT SELECT ON public.trust_badges TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trust_badges TO authenticated;
GRANT ALL ON public.trust_badges TO service_role;

GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;

GRANT SELECT ON public.banners TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.banners TO authenticated;
GRANT ALL ON public.banners TO service_role;

GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;