# Swagata Ganguly — Portfolio

A production-grade full-stack portfolio built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and PostgreSQL via Prisma.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Folder Structure](#folder-structure)
3. [Tech Stack](#tech-stack)
4. [Local Development Setup](#local-development-setup)
5. [Database Setup](#database-setup)
6. [Email Setup (Nodemailer)](#email-setup)
7. [Adding / Editing Projects](#adding--editing-projects)
8. [Deployment — Vercel + Railway](#deployment)
9. [Environment Variables Reference](#environment-variables-reference)
10. [Design System](#design-system)

---

## Architecture Overview

```
Browser
  └── Next.js 14 (App Router)
        ├── Server Components (data fetching, SEO)
        ├── Client Components (animations, forms, filters)
        └── API Routes
              ├── POST /api/contact    → Save message + send email
              ├── GET  /api/contact    → List messages (admin-keyed)
              └── GET  /api/projects   → Project data (optional REST endpoint)

Data Layer
  └── Prisma ORM → PostgreSQL
        ├── Project (slug, title, description, techStack, category, etc.)
        ├── Skill   (name, level, category)
        └── ContactMessage (name, email, subject, message, status)

Email
  └── Nodemailer → Gmail SMTP (or any SMTP relay)
```

**Request flow for contact form:**
1. User fills form → client-side Zod validation
2. `fetch POST /api/contact` with JSON body
3. Server validates again with Zod (never trust client validation alone)
4. Rate-limit check (3 submissions / 60s per IP)
5. Save to `ContactMessage` table via Prisma
6. Trigger async Nodemailer email notification (non-blocking)
7. Return `201 Created` → client shows success state

---

## Folder Structure

```
swagata-portfolio/
├── app/
│   ├── layout.tsx                  # Root layout, metadata, fonts
│   ├── page.tsx                    # Homepage (server component)
│   ├── globals.css                 # Design tokens, base styles
│   ├── not-found.tsx               # Custom 404
│   ├── api/
│   │   ├── contact/route.ts        # Contact form API
│   │   └── projects/route.ts       # Projects REST API
│   └── projects/
│       ├── page.tsx                # /projects — all projects
│       ├── AllProjectsClient.tsx   # Filterable grid (client)
│       └── [slug]/
│           ├── page.tsx            # /projects/[slug] — case study
│           └── ProjectDetailClient.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Sticky glass nav with mobile drawer
│   │   └── Footer.tsx             # Minimal footer
│   └── sections/
│       ├── HeroSection.tsx         # Full-viewport hero with typing animation
│       ├── ProjectsSection.tsx     # Featured projects grid
│       ├── SkillsSection.tsx       # Animated skill bars with category tabs
│       ├── AboutSection.tsx        # Bio + timeline + stats
│       └── ContactSection.tsx      # Validated form + contact channels
│
├── lib/
│   ├── prisma.ts                   # Singleton Prisma client
│   ├── projects.ts                 # Project data access functions
│   ├── skills.ts                   # Skills data access functions
│   ├── email.ts                    # Nodemailer email helper
│   └── utils.ts                    # cn(), formatDate(), slugify(), etc.
│
├── prisma/
│   ├── schema.prisma               # DB schema (Project, Skill, ContactMessage)
│   └── seed.js                     # Seed script with real project data
│
├── public/
│   ├── images/projects/            # Project cover images
│   └── resume/
│       └── swagata-ganguly-resume.pdf
│
├── types/
│   └── index.ts                    # Shared TypeScript types
│
├── .env.example                    # Environment variable template
├── next.config.mjs                 # Next.js config (headers, redirects)
├── tailwind.config.ts              # Custom design system tokens
├── tsconfig.json
└── package.json
```

---

## Tech Stack

| Layer      | Technology                              | Why                                              |
|------------|-----------------------------------------|--------------------------------------------------|
| Framework  | Next.js 14 (App Router)                 | Server components, file-based routing, SEO       |
| Styling    | Tailwind CSS (custom config)            | Utility-first, custom design tokens              |
| Animation  | Framer Motion                           | Production-quality motion with minimal API       |
| Database   | PostgreSQL                              | Relational, reliable, free tier on Railway/Neon  |
| ORM        | Prisma                                  | Type-safe queries, easy migrations, great DX     |
| Validation | Zod                                     | Schema validation on both client and server      |
| Forms      | react-hook-form + Zod                   | Performant forms with integrated validation      |
| Email      | Nodemailer                              | Battle-tested, works with any SMTP               |
| Deployment | Vercel (frontend) + Railway (database)  | Zero-config Next.js deploy + managed Postgres    |
| Fonts      | Syne + DM Sans + JetBrains Mono         | Distinctive, technical, readable                 |

---

## Local Development Setup

### Prerequisites

- Node.js 18.17+ (`node --version`)
- npm 9+ or pnpm
- PostgreSQL (local) **or** a free cloud DB (see [Database Setup](#database-setup))
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/swagata-ganguly/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and fill in your DATABASE_URL and email credentials

# 4. Set up the database (run migrations + seed data)
npm run db:push       # Push schema to DB (creates tables)
npm run db:generate   # Generate Prisma client types
npm run db:seed       # Seed with your projects and skills

# 5. Start the development server
npm run dev
# → Open http://localhost:3000
```

### Useful dev commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # ESLint check
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run db:seed      # Re-seed data (safe to re-run — clears existing first)
```

---

## Database Setup

### Option A: Local PostgreSQL (recommended for dev)

```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15
createdb portfolio

# Ubuntu/Debian
sudo apt install postgresql
sudo -u postgres createdb portfolio
sudo -u postgres psql -c "CREATE USER dev WITH PASSWORD 'dev'; GRANT ALL ON DATABASE portfolio TO dev;"
```

Then set in `.env.local`:
```
DATABASE_URL="postgresql://dev:dev@localhost:5432/portfolio"
```

### Option B: Free Cloud PostgreSQL (zero install)

**Neon** (recommended — serverless, generous free tier):
1. Sign up at https://neon.tech
2. Create a project → copy the connection string
3. Paste into `DATABASE_URL` in `.env.local`

**Railway**:
1. Sign up at https://railway.app
2. New Project → Add PostgreSQL
3. Click the DB → Variables tab → copy `DATABASE_URL`

**Supabase**:
1. Sign up at https://supabase.com
2. New project → Settings → Database → copy the URI (use "Connection string" format)

### After connecting:

```bash
npm run db:push      # Creates all tables from schema.prisma
npm run db:seed      # Populates with Swagata's projects and skills
```

---

## Email Setup

The contact form saves messages to the database regardless of email config.
Email notifications are optional but highly recommended.

### Gmail Setup (easiest)

1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Create an App Password for "Mail" → copy the 16-character password
4. Set in `.env.local`:

```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your.gmail@gmail.com"
SMTP_PASS="abcd efgh ijkl mnop"   # The 16-char app password (no spaces)
SMTP_FROM='"Swagata Portfolio" <your.gmail@gmail.com>'
PORTFOLIO_EMAIL="your.gmail@gmail.com"  # Where to receive contact notifications
```

### Alternative: Resend (better for production)

Resend.com gives 3,000 free emails/month with a proper API.
Swap the transporter in `lib/email.ts` with their `resend` npm package.

---

## Adding / Editing Projects

### Method 1: Edit the seed file (recommended)

Open `prisma/seed.js` and add/modify entries in the `projects` array:

```js
{
  slug: "my-new-project",           // URL: /projects/my-new-project
  title: "My New Project",
  tagline: "One-line description shown on card",
  description: "Full project description (supports markdown-like text)",
  problem:    "What problem did you solve?",
  approach:   "How did you approach and solve it?",
  learnings:  "What did you learn?",
  techStack:  ["Arduino", "C++", "Bluetooth"],
  category:   "EMBEDDED",           // ROBOTICS | EMBEDDED | SOFTWARE | CREATIVE | WEB
  githubUrl:  "https://github.com/swagata-ganguly/my-project",
  demoUrl:    null,
  coverImage: "/images/projects/my-project.jpg",
  images:     [],
  featured:   true,                 // Show on homepage
  order:      6,                    // Sort order (lower = first)
}
```

Then re-run the seed:
```bash
npm run db:seed
```

### Method 2: Prisma Studio (visual GUI)

```bash
npm run db:studio
# Opens at http://localhost:5555
# Click Project → Add record → fill in fields
```

### Adding project images

1. Place images in `public/images/projects/`
2. Reference as `"/images/projects/your-image.jpg"` in `coverImage`
3. Recommended size: 1200×630px, WebP or JPG
4. Keep file size under 200KB (use squoosh.app to optimise)

---

## Deployment

### Vercel (Frontend)

Vercel is the natural home for Next.js. Deploy is near-zero-config.

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login and deploy
vercel login
vercel

# For production deploys
vercel --prod
```

**Or via GitHub (recommended):**
1. Push your code to a GitHub repo
2. Go to https://vercel.com/new → Import Repository
3. Vercel auto-detects Next.js — click Deploy
4. Add environment variables in Vercel Dashboard → Settings → Environment Variables:
   - `DATABASE_URL` (from Railway/Neon/Supabase)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   - `PORTFOLIO_EMAIL`
   - `ADMIN_SECRET`

**After deploy:** Run migrations against production DB:
```bash
# Set DATABASE_URL to production DB temporarily
DATABASE_URL="postgresql://..." npm run db:push
DATABASE_URL="postgresql://..." npm run db:seed
```

### Railway (Database)

1. Go to https://railway.app → New Project → PostgreSQL
2. After provisioning, click the DB service → Variables tab
3. Copy `DATABASE_URL`
4. Add it to Vercel environment variables (see above)

**Full Railway deploy (frontend + DB together):**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and init
railway login
railway init

# Deploy
railway up

# Link to a PostgreSQL service
railway add postgresql
```

Add environment variables in Railway Dashboard → Variables.

---

## Environment Variables Reference

| Variable         | Required | Description                                          |
|------------------|----------|------------------------------------------------------|
| `DATABASE_URL`   | ✅ Yes   | PostgreSQL connection string                         |
| `SMTP_HOST`      | Optional | SMTP server (default: smtp.gmail.com)                |
| `SMTP_PORT`      | Optional | SMTP port (default: 587)                             |
| `SMTP_USER`      | Optional | SMTP username / Gmail address                        |
| `SMTP_PASS`      | Optional | SMTP password / Gmail App Password                   |
| `SMTP_FROM`      | Optional | From address shown in emails                         |
| `PORTFOLIO_EMAIL`| Optional | Your email for contact notifications                 |
| `ADMIN_SECRET`   | Optional | Secret key for `GET /api/contact` admin endpoint     |

> The app works without email variables — contact messages still save to DB.

---

## Design System

### Color tokens (CSS variables)

```css
--color-bg:       #0a0a0b   /* Near-black page background */
--color-surface:  #111113   /* Card/surface backgrounds */
--color-surface-2:#1a1a1e   /* Elevated surfaces, inputs */
--color-border:   #2e2e34   /* Default borders */
--color-text:     #f0f0f5   /* Primary text */
--color-text-dim: #a8a8b8   /* Secondary text (body copy) */
--color-text-muted:#55555f  /* Muted text, labels */
--color-signal:   #e8b94a   /* Amber accent — primary CTA */
--color-circuit:  #3ecfcf   /* Teal accent — secondary / live indicator */
```

### Fonts

- **Display/Headings:** Syne (700, 800) — sharp, editorial, geometric
- **Body:** DM Sans (300, 400, 500) — clean, slightly geometric
- **Mono:** JetBrains Mono (300, 400) — code labels, categories, metadata

### Component classes (defined in globals.css)

```css
.section-container    /* Max-width centered content wrapper */
.section-label        /* Mono uppercase section eyebrow */
.tech-tag             /* Amber bordered mono pill for tech labels */
.project-card         /* Dark surface card with hover lift */
.nav-link             /* Mono nav link with underline-on-hover */
.btn-primary          /* Amber filled CTA button */
.btn-ghost            /* Bordered ghost button */
.input-field          /* Dark input with amber focus ring */
.label-mono           /* Tiny uppercase mono label */
.glass                /* Backdrop-blur glass surface */
.grid-bg              /* Subtle grid background texture */
```

---

## Customisation Checklist

After cloning, update these before going live:

- [ ] Replace all `swagata-ganguly` with your GitHub username in `prisma/seed.js`
- [ ] Update social links in `components/layout/Footer.tsx` and `ContactSection.tsx`
- [ ] Replace `contact@swagata.dev` with your actual email
- [ ] Add your `public/resume/swagata-ganguly-resume.pdf`
- [ ] Add project images to `public/images/projects/`
- [ ] Update Twitter handle in `app/layout.tsx` metadata
- [ ] Update `app/layout.tsx` og:url to your real domain
- [ ] Set all environment variables in Vercel/Railway dashboard
- [ ] Run `npm run db:seed` against production DB after first deploy

---

## License

MIT — use it, fork it, make it yours.
