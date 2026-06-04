-- Next-Gen Learning Dashboard Database Schema
-- Run this in your Supabase SQL Editor to set up the courses table and seed data.

-- Drop table if it exists
DROP TABLE IF EXISTS courses;

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL, -- The Lucide icon string to render dynamically (e.g. 'BookOpen', 'Code2', etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read courses (public access)
CREATE POLICY "Allow public read access" ON courses
  FOR SELECT USING (true);

-- Seed Data (3-4 mock rows as requested)
INSERT INTO courses (title, progress, icon_name) VALUES
('Advanced React Patterns', 75, 'Code2'),
('Next.js App Router Masterclass', 42, 'Cpu'),
('Framer Motion & Micro-interactions', 90, 'Sparkles'),
('Database Architecture & SQL', 15, 'Database');
