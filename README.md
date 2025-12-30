# BKFT Blog - Science Fiction & Fantasy Culture Club

A modern, fully-featured blog website for a university science fiction and fantasy culture club. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### Content Management
- 📝 **Articles & Blog Posts** - Submit and read news, analysis, and discussions
- ⭐ **Reviews** - Submit and rate movies, comics, video games, and tabletop RPGs (1-5 stars)
- 🎲 **RPG Guides** - Create and share tutorials for role-playing games
- 🎉 **Events System** - Create club activities with registration and attendee tracking

### User Features
- 🔐 **Full Authentication** - Register, login, and logout functionality
- 👤 **User Profiles** - Manage your profile and view your contributions
- 📊 **Personal Dashboard** - Track all your submitted content in one place
- ✍️ **Content Submission** - Easy-to-use forms for articles, reviews, events, and guides
- ✅ **Moderation System** - All submissions are reviewed before publishing

### Design & Experience
- 🎨 **4 Unique Themes** - Switch between Cyberpunk, Medieval Fantasy, Space Opera, and Default
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Modern** - Built with Next.js 14 for optimal performance
- 🎯 **Intuitive Navigation** - Easy-to-use interface for all users

## 🚀 100% Free Hosting Stack

This project is designed to run completely free using:

- **Frontend Hosting**: [Vercel](https://vercel.com) (Free tier)
- **Database & Auth**: [Supabase](https://supabase.com) (Free tier - 500MB database, 1GB storage)
- **No credit card required** for either service!

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A free Supabase account
- A free Vercel account (for deployment)

## 🛠️ Local Development Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd BKFTBlog
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a region close to you)
3. Wait for the project to be set up (~2 minutes)
4. Go to **Project Settings** → **API** and copy:
   - Project URL
   - `anon` `public` key

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `database/schema.sql` from this project
3. Copy all the SQL and paste it into the Supabase SQL Editor
4. Click **Run** to create all tables and policies

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎨 Theme System

The website includes four unique themes:

- **Default** - Clean, modern design
- **Cyberpunk** 🌆 - Neon colors, dark UI, glitch effects
- **Medieval Fantasy** 🏰 - Parchment textures, gold accents
- **Space Opera** 🚀 - Cosmic backgrounds, sleek gradients

Users can switch themes using the buttons in the top navigation bar.

## 📂 Project Structure

```
BKFTBlog/
├── app/                    # Next.js App Router pages
│   ├── articles/          # Articles listing and detail pages
│   ├── reviews/           # Reviews section
│   ├── events/            # Events and registration
│   ├── rpg-guides/        # RPG tutorials and guides
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and theme definitions
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   └── ThemeSwitcher.tsx  # Theme selector component
├── lib/                   # Utility functions and configs
│   ├── supabase.ts        # Supabase client and types
│   └── theme-context.tsx  # Theme context provider
├── database/              # Database schemas
│   └── schema.sql         # Complete database setup
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## 🚢 Deployment to Vercel (Free)

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click **"New Project"**
4. Import your GitHub repository
5. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

Your site will be live in ~2 minutes at `your-project.vercel.app`!

### Custom Domain (Optional)

Vercel's free tier supports custom domains:
1. Go to your project settings
2. Add your domain
3. Update your DNS records as instructed

## 📊 Database Tables

The database includes:

- **profiles** - User profiles and information
- **articles** - Blog articles and news posts
- **reviews** - Movie, game, comic, and RPG reviews
- **events** - Club activities and gatherings
- **event_registrations** - Event sign-ups
- **rpg_guides** - RPG tutorials and guides
- **comments** - User comments on content

All tables include Row Level Security (RLS) policies for secure access.

## 🔐 Authentication

User authentication is handled by Supabase Auth, which includes:

- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- Magic link authentication
- Password reset functionality

To enable authentication features, you'll need to configure Supabase Auth in your project dashboard.

## 👤 User Management

### Registration & Login

Users can register and login at:
- `/auth/register` - Create a new account
- `/auth/login` - Login to existing account

After logging in, users get access to:
- Personal dashboard at `/dashboard`
- Content submission forms
- Profile management

### Submitting Content

Authenticated users can submit content through these pages:

1. **Submit Article** (`/submit/article`):
   - Title, category, excerpt, and full content
   - Supports categories: Analysis, News, Discussion, Lists, Educational, Opinion

2. **Submit Review** (`/submit/review`):
   - Title, type (Movie/Game/RPG/Comic), rating (1-5 stars)
   - Quick take and full review

3. **Create Event** (`/submit/event`):
   - Title, type, date, time, location
   - Maximum attendees (optional)
   - Full description

4. **Submit RPG Guide** (`/submit/guide`):
   - Title, game system, difficulty level
   - Topics (comma-separated)
   - Full guide content

### Dashboard Features

The dashboard (`/dashboard`) shows:
- User profile information
- All submitted articles (with publication status)
- All submitted reviews (with publication status)
- All created events
- All submitted RPG guides (with publication status)

### Moderation System

- All user-submitted content starts as **Pending**
- Moderators can review and approve content
- Only **Published** content appears on public pages
- Users can track their submission status in the dashboard

## 🎯 Next Steps

1. **Enable Email Authentication** (Required):
   - Go to Supabase → Authentication → Settings
   - Configure email templates
   - Enable email confirmations (optional)
   - Or enable OAuth providers (Google, GitHub, etc.)

2. **Test User Flow**:
   - Register a test account
   - Submit an article, review, event, or guide
   - View submissions in dashboard
   - Manually approve content in Supabase

3. **Customize Themes**:
   - Edit `tailwind.config.ts` to adjust colors
   - Modify `app/globals.css` for theme-specific styles
   - Add custom fonts or animations

4. **Optional Enhancements**:
   - Add admin panel for content moderation
   - Implement comment system
   - Add search functionality
   - Create email notifications
   - Add image upload for content

## 🛠️ Tech Stack Details

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 💡 Tips for Free Tier Limits

**Supabase Free Tier** (plenty for a university club!):
- 500MB database storage
- 1GB file storage
- 2GB bandwidth/month
- 50,000 monthly active users

**Vercel Free Tier**:
- Unlimited bandwidth
- 100GB-hours compute time
- Perfect for personal/educational projects

## 🤝 Contributing

This is a university project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

ISC License - Free for educational and personal use

## 🆘 Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

Built with ❤️ for the BKFT Science Fiction & Fantasy Culture Club
