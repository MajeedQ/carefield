import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  content: string;
  category: string;
  author: string;
  tags: string[];
  published: boolean;
  published_at: string;
  sort_order: number;
  active: boolean;
};

export const blogPostsQuery = (onlyPublished = true) =>
  queryOptions({
    queryKey: ["blog_posts", onlyPublished],
    queryFn: async (): Promise<BlogPost[]> => {
      let q = (supabase.from("blog_posts" as any) as any)
        .select("*")
        .order("published_at", { ascending: false });
      if (onlyPublished) q = q.eq("active", true).eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });

export const blogPostBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog_post", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await (supabase.from("blog_posts" as any) as any)
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as BlogPost | null;
    },
  });
