import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface Review {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  type: 'movie' | 'game' | 'rpg' | 'comic';
  rating: number;
  author: string;
  created_at: string;
  published: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  max_attendees: number;
  current_attendees: number;
  type: string;
  created_at: string;
}

export interface RPGGuide {
  id: string;
  title: string;
  content: string;
  game: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author: string;
  topics: string[];
  created_at: string;
  published: boolean;
}
