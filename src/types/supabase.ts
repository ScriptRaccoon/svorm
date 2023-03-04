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
      multiple_choices: {
        Row: {
          choices: string[]
          created_at: string
          id: number
          index: number
          question: string
          required: boolean
          svorm_id: number
        }
        Insert: {
          choices: string[]
          created_at?: string
          id?: number
          index: number
          question?: string
          required?: boolean
          svorm_id: number
        }
        Update: {
          choices?: string[]
          created_at?: string
          id?: number
          index?: number
          question?: string
          required?: boolean
          svorm_id?: number
        }
      }
      multiple_choices_answers: {
        Row: {
          choice: number
          created_at: string
          id: number
          question_id: number
        }
        Insert: {
          choice: number
          created_at?: string
          id?: number
          question_id: number
        }
        Update: {
          choice?: number
          created_at?: string
          id?: number
          question_id?: number
        }
      }
      simple_questions: {
        Row: {
          created_at: string
          id: number
          index: number
          question: string
          required: boolean
          svorm_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          index: number
          question?: string
          required?: boolean
          svorm_id: number
        }
        Update: {
          created_at?: string
          id?: number
          index?: number
          question?: string
          required?: boolean
          svorm_id?: number
        }
      }
      simple_questions_answers: {
        Row: {
          answer: string
          created_at: string
          id: number
          question_id: number
        }
        Insert: {
          answer?: string
          created_at?: string
          id?: number
          question_id: number
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          question_id?: number
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
