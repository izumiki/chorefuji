export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          pixiv_url: string | null
          profile: string | null
          skeb_url: string | null
          software_used: string | null
          tumblr_url: string | null
          twitter_url: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          pixiv_url?: string | null
          profile?: string | null
          skeb_url?: string | null
          software_used?: string | null
          tumblr_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          pixiv_url?: string | null
          profile?: string | null
          skeb_url?: string | null
          software_used?: string | null
          tumblr_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
      }
      contacts: {
        Row: {
          created_at: string | null
          delivery_deadline: string | null
          email: string | null
          email_sender: string | null
          id: string
          is_accepted: boolean | null
          reply_deadline: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_deadline?: string | null
          email?: string | null
          email_sender?: string | null
          id: string
          is_accepted?: boolean | null
          reply_deadline?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_deadline?: string | null
          email?: string | null
          email_sender?: string | null
          id?: string
          is_accepted?: boolean | null
          reply_deadline?: string | null
          updated_at?: string | null
        }
      }
      works: {
        Row: {
          client: string | null
          created_at: string | null
          department: string | null
          email: string | null
          id: string
          title: string | null
          updated_at: string | null
          url: string | null
          works_id: string
        }
        Insert: {
          client?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          id: string
          title?: string | null
          updated_at?: string | null
          url?: string | null
          works_id: string
        }
        Update: {
          client?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          url?: string | null
          works_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
