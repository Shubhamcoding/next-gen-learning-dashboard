# Next-Gen Student Learning Dashboard

A futuristic, highly-animated, dark-themed Student Dashboard prototype built with Next.js (App Router), Tailwind CSS, Framer Motion, and Supabase.

## ✨ Core Features

* **Bento Grid Layout**: Dynamic and fully responsive dashboard tiles displaying active course details, study progress, calendar heatmaps, and learning statistics.
* **Server-Driven Data Fetching (RSC)**: Courses are fetched directly on the server from Supabase PostgreSQL database to ensure zero layout shift and optimal rendering.
* **Mock Fallback (Zero Setup)**: If Supabase connection variables are not provided, the application automatically falls back to an interactive Mock Mode with a friendly configuration notice.
* **Interactive Animations (Framer Motion)**:
  * **Staggered Entry**: Bento cards fade in and slide up sequentially on initial load.
  * **Hardware-Accelerated Hover Glow**: Cards scale up slightly with spring-physics (`stiffness: 300, damping: 20`) and reveal a cursor-following border glow.
  * **Collapsible Sidebar Layout Transitions**: The active sidebar navigation highlight slides smoothly from button to button using Framer Motion's `layoutId`.
* **Fully Responsive**:
  * **Desktop (>1024px)**: Complete expanded sidebar + bento grid.
  * **Tablet (768px - 1024px)**: Collapsed icon-only sidebar + 2-column bento layout.
  * **Mobile (<768px)**: Floating bottom navigation bar + 1-column vertically scrolling layout.

---

## 🛠 Tech Stack

* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
* **Database**: [Supabase PostgreSQL](https://supabase.com/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Integration (Optional)
To connect your live database, follow these steps:
1. Log in to your **Supabase Dashboard** and create a new project.
2. Go to the SQL Editor and paste the code from [schema.sql](./schema.sql) to set up the `courses` table and seed initial rows.
3. Create a `.env.local` file in the root directory based on the `.env.example` template:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🏛 Architectural Highlights & Split

### Server vs. Client Component Split
* **Server Components (`src/app/page.tsx`, `src/app/loading.tsx`)**:
  * Fetches the data directly from Supabase at request time (`revalidate = 0`), hiding DB connection keys and improving initial load speed.
  * Shows a custom pulsed skeleton layout (`loading.tsx`) while the RSC data loading promise is resolving.
* **Client Components (`src/components/*`, `src/components/DashboardContainer.tsx`)**:
  * Handles interactive tab switching, collapsed state logic, and Framer Motion mouse-tracking hover events.
  * Dynamically maps database string labels to React SVG icons via `lucide-react`.

### Challenges Resolved
1. **Preventing Flash of Unstyled Content (FOUC)**: Added a root `<meta name="color-scheme" content="dark" />` meta tag to ensure the browser paints a dark backdrop canvas prior to loading CSS.
2. **Preventing Cumulative Layout Shift (CLS)**: The collapsible sidebar transitions do not push components or trigger viewport recalculations. Card hover animations use hardware-accelerated CSS `transform` and `opacity` properties exclusively.
3. **Cursor-Following Border Glows**: Calculated coordinates using relative client coordinates on standard mouse move events, passing them to Framer Motion's `useMotionValue` to render dynamic radial background-mask gradients efficiently without triggering standard React re-renders.
