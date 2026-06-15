export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      banners: {
        Row: {
          active: boolean
          bg_color: string | null
          body: string | null
          created_at: string
          id: string
          image_url: string | null
          kind: string
          link_url: string | null
          sort_order: number
          subtitle: string | null
          text_color: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          bg_color?: string | null
          body?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          kind: string
          link_url?: string | null
          sort_order?: number
          subtitle?: string | null
          text_color?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          bg_color?: string | null
          body?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          kind?: string
          link_url?: string | null
          sort_order?: number
          subtitle?: string | null
          text_color?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      branches: {
        Row: {
          active: boolean
          address: string
          created_at: string
          id: string
          map_url: string
          name: string
          phone: string | null
          share_url: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          address?: string
          created_at?: string
          id?: string
          map_url?: string
          name: string
          phone?: string | null
          share_url?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          address?: string
          created_at?: string
          id?: string
          map_url?: string
          name?: string
          phone?: string | null
          share_url?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          active: boolean
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          answer: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          id: string
          kind: string
          sort_order: number
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          id?: string
          kind: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          id?: string
          kind?: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          active: boolean
          created_at: string
          id: string
          image_url: string
          sort_order: number
          subtitle: string
          tag: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
          subtitle?: string
          tag?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
          subtitle?: string
          tag?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          age: string | null
          created_at: string
          district: string
          full_name: string
          id: string
          notes: string | null
          phone: string
          service_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          age?: string | null
          created_at?: string
          district?: string
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          service_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          age?: string | null
          created_at?: string
          district?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          service_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          benefits: string[]
          created_at: string
          detailed_description: string
          icon_name: string
          id: string
          sessions_per_week: string | null
          short_description: string
          sort_order: number
          target_age: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          benefits?: string[]
          created_at?: string
          detailed_description?: string
          icon_name?: string
          id?: string
          sessions_per_week?: string | null
          short_description?: string
          sort_order?: number
          target_age?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          benefits?: string[]
          created_at?: string
          detailed_description?: string
          icon_name?: string
          id?: string
          sessions_per_week?: string | null
          short_description?: string
          sort_order?: number
          target_age?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_description: string
          about_goals: string[]
          about_image: string | null
          about_mission: string
          about_subtitle: string
          about_title: string
          about_vision: string
          accent_color: string
          announce_bg: string
          announce_color: string
          announce_enabled: boolean
          announce_link: string | null
          announce_speed: string
          announce_text: string
          background_color: string
          border_radius: string
          email: string | null
          font_family: string
          font_scale: string
          ga_id: string | null
          id: string
          instagram: string | null
          linkedin: string | null
          logo_subtitle: string
          logo_text: string
          meta_pixel_id: string | null
          phone1: string | null
          phone2: string | null
          primary_color: string
          sheets_webhook_url: string | null
          snap_pixel_id: string | null
          snapchat: string | null
          spacing_scale: string
          tiktok: string | null
          tiktok_pixel_id: string | null
          twitter: string | null
          updated_at: string
          whatsapp: string | null
          whatsapp_message: string
        }
        Insert: {
          about_description?: string
          about_goals?: string[]
          about_image?: string | null
          about_mission?: string
          about_subtitle?: string
          about_title?: string
          about_vision?: string
          accent_color?: string
          announce_bg?: string
          announce_color?: string
          announce_enabled?: boolean
          announce_link?: string | null
          announce_speed?: string
          announce_text?: string
          background_color?: string
          border_radius?: string
          email?: string | null
          font_family?: string
          font_scale?: string
          ga_id?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          logo_subtitle?: string
          logo_text?: string
          meta_pixel_id?: string | null
          phone1?: string | null
          phone2?: string | null
          primary_color?: string
          sheets_webhook_url?: string | null
          snap_pixel_id?: string | null
          snapchat?: string | null
          spacing_scale?: string
          tiktok?: string | null
          tiktok_pixel_id?: string | null
          twitter?: string | null
          updated_at?: string
          whatsapp?: string | null
          whatsapp_message?: string
        }
        Update: {
          about_description?: string
          about_goals?: string[]
          about_image?: string | null
          about_mission?: string
          about_subtitle?: string
          about_title?: string
          about_vision?: string
          accent_color?: string
          announce_bg?: string
          announce_color?: string
          announce_enabled?: boolean
          announce_link?: string | null
          announce_speed?: string
          announce_text?: string
          background_color?: string
          border_radius?: string
          email?: string | null
          font_family?: string
          font_scale?: string
          ga_id?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          logo_subtitle?: string
          logo_text?: string
          meta_pixel_id?: string | null
          phone1?: string | null
          phone2?: string | null
          primary_color?: string
          sheets_webhook_url?: string | null
          snap_pixel_id?: string | null
          snapchat?: string | null
          spacing_scale?: string
          tiktok?: string | null
          tiktok_pixel_id?: string | null
          twitter?: string | null
          updated_at?: string
          whatsapp?: string | null
          whatsapp_message?: string
        }
        Relationships: []
      }
      trust_badges: {
        Row: {
          active: boolean
          created_at: string
          icon: string
          id: string
          sort_order: number
          text: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          icon?: string
          id?: string
          sort_order?: number
          text: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          icon?: string
          id?: string
          sort_order?: number
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wide_banners: {
        Row: {
          active: boolean
          button_text: string | null
          created_at: string
          id: string
          image_url: string
          link_url: string | null
          sort_order: number
          subtitle: string
          tag: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          button_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          link_url?: string | null
          sort_order?: number
          subtitle?: string
          tag?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          button_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          link_url?: string | null
          sort_order?: number
          subtitle?: string
          tag?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
