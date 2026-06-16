
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text DEFAULT '',
  cover_image text DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text DEFAULT '',
  author text DEFAULT '',
  tags text[] DEFAULT ARRAY[]::text[],
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON public.blog_posts FOR SELECT
  USING (active = true AND published = true);

CREATE POLICY "Admins manage blog posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER blog_posts_set_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at DESC);
