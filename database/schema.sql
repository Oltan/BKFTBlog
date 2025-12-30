-- BKFT Blog Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.profiles(id),
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  type TEXT NOT NULL CHECK (type IN ('movie', 'game', 'rpg', 'comic')),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  author_id UUID REFERENCES public.profiles(id),
  author TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event registrations table
CREATE TABLE public.event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- RPG Guides table
CREATE TABLE public.rpg_guides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  game TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  topics TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.profiles(id),
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table (for articles, reviews, guides)
CREATE TABLE public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id),
  author_name TEXT NOT NULL,
  parent_type TEXT NOT NULL CHECK (parent_type IN ('article', 'review', 'guide')),
  parent_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_articles_author ON public.articles(author_id);
CREATE INDEX idx_articles_published ON public.articles(published);
CREATE INDEX idx_articles_created ON public.articles(created_at DESC);

CREATE INDEX idx_reviews_author ON public.reviews(author_id);
CREATE INDEX idx_reviews_type ON public.reviews(type);
CREATE INDEX idx_reviews_published ON public.reviews(published);

CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_type ON public.events(type);

CREATE INDEX idx_rpg_guides_game ON public.rpg_guides(game);
CREATE INDEX idx_rpg_guides_difficulty ON public.rpg_guides(difficulty);
CREATE INDEX idx_rpg_guides_published ON public.rpg_guides(published);

CREATE INDEX idx_comments_parent ON public.comments(parent_type, parent_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rpg_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Public read, users can update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Articles: Public read published, authenticated can create
CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (published = true OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create articles"
  ON public.articles FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own articles"
  ON public.articles FOR UPDATE
  USING (auth.uid() = author_id);

-- Similar policies for reviews
CREATE POLICY "Published reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (published = true OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = author_id);

-- Events: Public read, authenticated can register
CREATE POLICY "Events are viewable by everyone"
  ON public.events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON public.events FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events"
  ON public.events FOR UPDATE
  USING (auth.uid() = created_by);

-- Event registrations
CREATE POLICY "Users can view their own registrations"
  ON public.event_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON public.event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations"
  ON public.event_registrations FOR DELETE
  USING (auth.uid() = user_id);

-- RPG Guides
CREATE POLICY "Published guides are viewable by everyone"
  ON public.rpg_guides FOR SELECT
  USING (published = true OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create guides"
  ON public.rpg_guides FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own guides"
  ON public.rpg_guides FOR UPDATE
  USING (auth.uid() = author_id);

-- Comments
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = author_id);

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rpg_guides_updated_at BEFORE UPDATE ON public.rpg_guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
