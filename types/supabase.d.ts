export type Database = {
  public: {
    Tables: {
      habits: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          level_full: string;
          level_adjusted: string;
          level_emergency: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          level_full: string;
          level_adjusted: string;
          level_emergency: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          level_full?: string;
          level_adjusted?: string;
          level_emergency?: string;
          created_at?: string;
        };
      };
      habit_logs: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          completed_at: string;
          level_achieved: 'full' | 'adjusted' | 'emergency';
        };
        Insert: {
          id?: string;
          habit_id: string;
          user_id: string;
          completed_at?: string;
          level_achieved: 'full' | 'adjusted' | 'emergency';
        };
        Update: {
          id?: string;
          habit_id?: string;
          user_id?: string;
          completed_at?: string;
          level_achieved?: 'full' | 'adjusted' | 'emergency';
        };
      };
      habit_notes: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          habit_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          habit_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};