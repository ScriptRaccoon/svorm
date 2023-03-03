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
      answers: {
        Row: {
          answer: string | null
          choice: number | null
          created_at: string
          id: number
          question_id: number
        }
        Insert: {
          answer?: string | null
          choice?: number | null
          created_at?: string
          id?: number
          question_id: number
        }
        Update: {
          answer?: string | null
          choice?: number | null
          created_at?: string
          id?: number
          question_id?: number
        }
      }
      "question types": {
        Row: {
          type: string
        }
        Insert: {
          type: string
        }
        Update: {
          type?: string
        }
      }
      questions: {
        Row: {
          choices: string[] | null
          created_at: string
          id: number
          index: number
          question: string
          required: boolean
          svorm_id: number
          type: string
        }
        Insert: {
          choices?: string[] | null
          created_at?: string
          id?: number
          index: number
          question?: string
          required?: boolean
          svorm_id: number
          type: string
        }
        Update: {
          choices?: string[] | null
          created_at?: string
          id?: number
          index?: number
          question?: string
          required?: boolean
          svorm_id?: number
          type?: string
        }
      }
      svorms: {
        Row: {
          created_at: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
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
