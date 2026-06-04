import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Aether Learn | Next-Gen Student Portal',
  description: 'A futuristic, highly animated educational bento dashboard with live Supabase database syncing, staggered entry effects, and responsive navigation.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark antialiased scroll-smooth`}>
      {/* Set the color-scheme metadata to prevent FOUC */}
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-[#040408] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
