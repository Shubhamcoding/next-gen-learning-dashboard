import React from 'react';
import { getCourses } from '@/lib/supabase';
import DashboardContainer from '@/components/DashboardContainer';

export const revalidate = 0; // Dynamic rendering, fetch latest database values

export default async function Home() {
  // Fetch courses on the server using Next.js Server Components (RSC)
  const { data, error, isMock } = await getCourses();

  return (
    <DashboardContainer
      initialCourses={data}
      isMock={isMock}
      dbError={error}
    />
  );
}
