# Pravin Realty — Luxury Real Estate Web Application & Control Center

A modern, high-performance web platform and dedicated **Content Management Control Center** built for **Pravin Realty**, West Pune's premier real estate consultancy specializing in luxury residential, commercial properties, and investment guidance across Baner, Balewadi, and surrounding prime micro-markets.

---

## ✨ Features

### 🌐 Public Client Experience
- **Luxury Property Showcase**: Filter and browse through residential apartments, Grade-A commercial office suites, luxury villas, and penthouses.
- **Search & Sort Engine**: Filter listings by category (`Residential`, `Commercial`, `Luxury Villa`, `Penthouse`, `Township`) with real-time text search and price sorting.
- **Interactive Property Detail Pages (`/properties/:slug`)**: Full-width high-resolution imagery, floor plan specs (BHK, baths, carpet area, monthly EMI estimate, RERA ID, possession, parking), and assigned advisor cards.
- **Live Consultation & Site Visit Booking**: Interactive modals with date selection and automatic lead routing into the Admin CRM.
- **Market Insights & Research Blog (`/blog`)**: Real estate guides, infrastructure analysis, and MahaRERA compliance updates with full reader modal.
- **About Us & Leadership Roster (`/about`)**: Agency heritage, 4 core pillars, interactive split cards, and team directory.
- **Interactive Contact Hub (`/contact`, `/talk-to-agent`)**: Multi-field inquiry forms, physical office coordinates in Balewadi, direct calling lines, and working hours.
- **Dynamic Micro-Interactions**: Lenis momentum scrolling, GSAP ScrollTrigger ticker synchronization, and smooth Framer Motion page transitions.
- **Direct WhatsApp Quick Connect**: Floating badge with instant pre-filled inquiry triggers.

### 🛡️ Administrator Control Center (`/admin`)
- **Protected Administrator Authentication**: Secure portal (`/admin/login`) with session management.
- **Real-Time KPI Dashboard (`/admin/dashboard`)**: Active listing counters, recent client leads inbox, property breakdown by category, and quick shortcuts.
- **Properties & Listing Manager (`/admin/properties`)**:
  - Add, edit, and delete listings with full specification controls.
  - Multi-image gallery manager with thumbnail previews.
  - One-click **Homepage Featured** listing pin.
  - Dynamic MahaRERA ID, price breakdown, and assigned agent linkage.
- **Market Insights & Blog Editor (`/admin/blog`)**:
  - Create and edit articles with read-time calculators, publication dates, and category tags.
  - Multi-paragraph content builder and author attribution.
- **Advisory Team Roster Manager (`/admin/team`)**:
  - Add, modify, or remove advisors, brokers, and consultants with photos, bios, direct phone/email, and micro-market specialties.
- **Client Testimonials & Review Manager (`/admin/testimonials`)**:
  - Manage 5-star ratings, client quotes, professions, and avatars displayed across the site.
- **Inquiries & Leads CRM Inbox (`/admin/leads`)**:
  - Centralized real-time inbox capturing submissions from the **Contact Page**, **Consultation Modal**, and **Property Site Visit Bookings**.
  - Pipeline status changer (`New`, `Contacted`, `In Progress`, `Closed Deal`, `Archived`).
  - Follow-up internal notes system.
  - Direct 1-click **WhatsApp Chat** & **Phone Call** actions.
  - **Export Leads to CSV** spreadsheet format.
- **Site Settings & Hero Customizer (`/admin/settings`)**:
  - Live customize the homepage headline, subtitle, hero background image, and CTA buttons.
  - Update corporate phone number, WhatsApp line, support email, Balewadi office address, and MahaRERA registration number.
  - Modify trust counters (Years in Pune, Happy Clients, Square Footage Advised, Client Rating Score).
  - Update social media channels (LinkedIn, Instagram, YouTube, Facebook).
- **Data Vault & JSON Backup / Restore**:
  - Single-click **Full JSON Backup Export** to safely back up the entire website state.
  - Instant **JSON Restore / Import** to migrate or restore data anytime.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite 6
- **Language**: TypeScript (`~5.8.2`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom `@theme` tokens
- **Routing**: React Router DOM v7 (with `PageTransition` and Lenis scroll restoration)
- **State & Persistence**: React Context (`DataContext`) + Browser LocalStorage + JSON Export/Import Engine
- **Motion & Animations**: Framer Motion (`v13`/`motion`), GSAP + ScrollTrigger, Lenis Smooth Scroll
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm`, `bun`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jayeshpatil9869/pravin-realty.git
   cd pravin-realty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

4. Access the **Admin Control Center**:
   - Navigate to `http://localhost:3000/admin`
   - Default login: `admin@pravinrealty.com` / `admin123`

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── public/                 # Static assets (Favicon, hero images, media)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx      # Floating frosted navbar with active indicator
│   │   ├── Footer.tsx      # Multi-column footer with live settings & admin link
│   │   ├── ConsultModal.tsx # Consultation modal with CRM integration
│   │   ├── PropertyModal.tsx # Site visit scheduler with CRM integration
│   │   ├── PropertyCard.tsx # Listing card with hover zoom & price badge
│   │   ├── FloatingWhatsApp.tsx # Floating quick-connect WhatsApp trigger
│   │   └── ui/             # Animated UI primitives (Magnetic, CounterTicker, ScrollReveal)
│   ├── context/
│   │   └── DataContext.tsx # Centralized live data layer with localStorage persistence & CRUD
│   ├── data/               # Default seeds for properties, blogs, team, testimonials, settings
│   │   ├── properties.ts   # Property listings data
│   │   ├── blog.ts         # Market insights data
│   │   ├── team.ts         # Leadership and team data
│   │   ├── testimonials.ts # Client review data
│   │   └── settings.ts     # Global website configuration defaults
│   ├── pages/              # Public facing pages
│   │   ├── Home.tsx        # Homepage with live hero, stats, and listings
│   │   ├── Properties.tsx  # Filterable listing directory
│   │   ├── PropertyDetail.tsx # Listing detail page with specs & inquiry
│   │   ├── About.tsx       # About page with team roster
│   │   ├── Blog.tsx        # Market insights reader
│   │   ├── Contact.tsx     # Contact form with lead capture
│   │   └── admin/          # Admin Control Center
│   │       ├── AdminLayout.tsx       # Luxury dark sidebar & topbar
│   │       ├── AdminLogin.tsx        # Admin portal authentication
│   │       ├── AdminDashboard.tsx    # KPI overview & recent leads feed
│   │       ├── AdminProperties.tsx   # Property listing CRUD & gallery manager
│   │       ├── AdminBlog.tsx         # Market insights article builder
│   │       ├── AdminTeam.tsx         # Team members roster manager
│   │       ├── AdminTestimonials.tsx # Client reviews & star rating manager
│   │       ├── AdminLeads.tsx        # CRM inquiry inbox with CSV export & WhatsApp
│   │       └── AdminSettings.tsx     # Hero banner customizer & JSON backup/restore
│   ├── types/              # Unified TypeScript interfaces
│   ├── App.tsx             # Root application routes & layout split
│   ├── main.tsx            # React application entry point
│   └── index.css           # Tailwind v4 theme definitions and typography
├── package.json            # Scripts and project dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **Pravin Realty**.
