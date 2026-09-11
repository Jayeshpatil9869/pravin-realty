# Pravin Realty — Luxury Real Estate Web Application

A modern, high-performance web platform built for **Pravin Realty**, West Pune's premier real estate consultancy specializing in luxury residential, commercial properties, and investment guidance across Baner, Balewadi, and surrounding prime locations.

---

## ✨ Features

- **Luxury Property Catalog**: Filter and browse through residential apartments, commercial spaces, luxury penthouses, and row houses with high-resolution imagery and key specs.
- **Interactive Property Details**: Detailed view of pricing, amenities, floor plans, area specifications, and direct inquiry channels.
- **Consultation & Booking System**: Interactive consultation request modals with date-picker and customizable inquiry flows.
- **Market Insights & Blog**: Articles, investment guides, and real estate trend reports.
- **Dynamic Micro-Interactions & Animations**: Powered by Tailwind CSS, Framer Motion, and GSAP for a refined, responsive experience.
- **Direct WhatsApp & Phone Integration**: Instant contact options with pre-filled property queries.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS
- **Routing**: React Router DOM v7
- **Motion & Animations**: Framer Motion, GSAP, Lenis Smooth Scroll
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `bun` / `yarn` / `pnpm`

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

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── public/                 # Static assets (Favicon, images, hero assets)
├── src/
│   ├── components/         # Reusable UI components (Header, Footer, Modals, Cards)
│   │   └── ui/             # Animated UI primitives & typography utilities
│   ├── data/               # Structured data for properties, blogs, team, testimonials
│   ├── pages/              # Main route pages (Home, Properties, Detail, About, Blog, Contact)
│   ├── lib/                # Utility helpers (cn class merging)
│   ├── App.tsx             # Root routing and layout setup
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global design tokens and styles
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **Pravin Realty**.
