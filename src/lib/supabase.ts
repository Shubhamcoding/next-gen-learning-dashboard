import { createClient } from '@supabase/supabase-js';

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Seed Mock Data
export const MOCK_COURSES: Course[] = [
  {
    id: 'mock-1',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Code2',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Next.js App Router Masterclass',
    progress: 42,
    icon_name: 'Cpu',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Framer Motion & Micro-interactions',
    progress: 90,
    icon_name: 'Sparkles',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Database Architecture & SQL',
    progress: 15,
    icon_name: 'Database',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Determine if we can connect to Supabase
const hasSupabaseCreds = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-supabase-project-url');

export const supabase = hasSupabaseCreds
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getCourses(): Promise<{
  data: Course[];
  error: string | null;
  isMock: boolean;
}> {
  if (!supabase) {
    // Graceful fallback to mock data when Supabase credentials are not configured
    // Wait a brief simulated latency (500ms) to show skeleton loaders
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      data: MOCK_COURSES,
      error: null,
      isMock: true,
    };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error, falling back to mock data:', error);
      return {
        data: MOCK_COURSES,
        error: `Supabase Error: ${error.message}. Loaded mock data instead.`,
        isMock: true,
      };
    }

    if (!data || data.length === 0) {
      return {
        data: MOCK_COURSES,
        error: 'No courses found in database. Loaded seed mock data.',
        isMock: true,
      };
    }

    return {
      data: data as Course[],
      error: null,
      isMock: false,
    };
  } catch (err: any) {
    console.error('Failed to fetch from Supabase, falling back to mock data:', err);
    return {
      data: MOCK_COURSES,
      error: err?.message || 'Unknown network error. Loaded mock data.',
      isMock: true,
    };
  }
}
