# ScholarSync

ScholarSync is a high-performance, industry-focused educational discovery platform designed to help students and professionals in India discover modern career paths, curated learning resources, and job opportunities.

## 🌐 Live Demo

Check out the live application: [https://scholar-sync-puce.vercel.app/](https://scholar-sync-puce.vercel.app/)

## 🚀 Features

- **Search Accuracy Engine**: Client-side query intent parsing, typo tolerance, alias expansion, and category bias matching using Fuse.js.
- **Career Discovery Hub**: Explore 50+ modern industry roles with detailed insights into skills, salary, and growth.
- **Learning Hub**: 
  - **Curated Resources**: Hand-picked courses and materials for specific skill levels.
  - **Global Library**: Search millions of free educational books via the Open Library API.
  - **Video Tutorials**: Discover high-quality educational videos via the YouTube Search API.
- **Job Board**: Find relevant job openings tailored to your career interests.
- **Wishlist System**: Save careers, resources, and jobs to your personal dashboard for later study.
- **Modern UI**: A clean, Notion-inspired design with dark mode support and smooth animations.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & Framer Motion for animations
- **Icons**: Lucide React
- **Search**: Fuse.js for high-performance client-side fuzzy searching
- **AI Integration**: Google Genkit for intelligent career matching
- **Database/Auth**: Firebase

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muzafer26/ScholarSync.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and copy from `.env.example`:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key
   ADZUNA_APP_ID=your_adzuna_app_id
   ADZUNA_APP_KEY=your_adzuna_app_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Pre-deployment Verification

ScholarSync includes a rigorous pre-deployment automated check script to sweep for secrets, check external resource link availability, scan for banned content, and audit taxonomies.

To run the verification suite:
```bash
npm run verify
```

This will run the `scripts/verify-deploy.ts` script and output a detailed status report.
