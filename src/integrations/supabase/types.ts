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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author: string | null
          author_image: string | null
          author_role: string | null
          body: string | null
          category: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          author_image?: string | null
          author_role?: string | null
          body?: string | null
          category?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          author_image?: string | null
          author_role?: string | null
          body?: string | null
          category?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_leads: {
        Row: {
          city: string | null
          created_at: string
          email: string | null
          form_type: string
          id: string
          menu_link: string | null
          message: string | null
          name: string | null
          phone: string | null
          position: string | null
          references_count: string | null
          restaurant: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email?: string | null
          form_type?: string
          id?: string
          menu_link?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
          position?: string | null
          references_count?: string | null
          restaurant?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string | null
          form_type?: string
          id?: string
          menu_link?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
          position?: string | null
          references_count?: string | null
          restaurant?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_key: string
          content_value: string
          id: string
          page: string
          section: string
          updated_at: string
        }
        Insert: {
          content_key: string
          content_value: string
          id?: string
          page: string
          section: string
          updated_at?: string
        }
        Update: {
          content_key?: string
          content_value?: string
          id?: string
          page?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_pages: {
        Row: {
          body: Json
          canonical_url: string | null
          cluster: Database["public"]["Enums"]["seo_cluster"]
          created_at: string
          cta_primary_text: string | null
          cta_primary_url: string | null
          cta_secondary_text: string | null
          cta_secondary_url: string | null
          faqs: Json | null
          hero_badge: string | null
          hero_subtitle: string | null
          hero_title: string
          id: string
          lang: string
          meta_description: string
          meta_title: string
          og_image: string | null
          published: boolean
          published_at: string | null
          related_pages: string[] | null
          schema_type: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          body?: Json
          canonical_url?: string | null
          cluster: Database["public"]["Enums"]["seo_cluster"]
          created_at?: string
          cta_primary_text?: string | null
          cta_primary_url?: string | null
          cta_secondary_text?: string | null
          cta_secondary_url?: string | null
          faqs?: Json | null
          hero_badge?: string | null
          hero_subtitle?: string | null
          hero_title: string
          id?: string
          lang?: string
          meta_description: string
          meta_title: string
          og_image?: string | null
          published?: boolean
          published_at?: string | null
          related_pages?: string[] | null
          schema_type?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          body?: Json
          canonical_url?: string | null
          cluster?: Database["public"]["Enums"]["seo_cluster"]
          created_at?: string
          cta_primary_text?: string | null
          cta_primary_url?: string | null
          cta_secondary_text?: string | null
          cta_secondary_url?: string | null
          faqs?: Json | null
          hero_badge?: string | null
          hero_subtitle?: string | null
          hero_title?: string
          id?: string
          lang?: string
          meta_description?: string
          meta_title?: string
          og_image?: string | null
          published?: boolean
          published_at?: string | null
          related_pages?: string[] | null
          schema_type?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_taxonomies: {
        Row: {
          id: string
          page_id: string
          taxonomy_type: string
          taxonomy_value: string
        }
        Insert: {
          id?: string
          page_id: string
          taxonomy_type: string
          taxonomy_value: string
        }
        Update: {
          id?: string
          page_id?: string
          taxonomy_type?: string
          taxonomy_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_taxonomies_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "seo_pages"
            referencedColumns: ["id"]
          },
        ]
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
      app_role: "admin" | "editor"
      seo_cluster:
        | "city"
        | "restaurant_type"
        | "country"
        | "grape"
        | "region"
        | "style"
        | "pairing"
        | "guide"
        | "problem"
        | "comparison"
        | "resource"
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
      app_role: ["admin", "editor"],
      seo_cluster: [
        "city",
        "restaurant_type",
        "country",
        "grape",
        "region",
        "style",
        "pairing",
        "guide",
        "problem",
        "comparison",
        "resource",
      ],
    },
  },
} as const
