-- ==========================================================================
-- PRAVIN REALTY — COMPLETE SUPABASE DATABASE SCHEMA & SEED DATA
-- Project URL: https://deiqcqpwcqbzfijblqgj.supabase.co
-- ==========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================================
-- 2. CREATE CORE TABLES
-- ==========================================================================

-- Table 1: Properties Inventory
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    price BIGINT NOT NULL,
    formatted_price TEXT NOT NULL,
    est_monthly TEXT,
    beds TEXT NOT NULL,
    baths NUMERIC NOT NULL DEFAULT 2,
    sqft TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Residential', 'Luxury Villa', 'Commercial', 'Penthouse', 'Township')),
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}'::TEXT[],
    description TEXT,
    features TEXT[] DEFAULT '{}'::TEXT[],
    featured BOOLEAN DEFAULT false,
    year_built INTEGER,
    rera_id TEXT,
    maintenance TEXT,
    possession TEXT,
    parking TEXT,
    developer TEXT,
    agent JSONB DEFAULT '{"name": "Pravin K.", "role": "Principal Broker", "phone": "+91 97624 16737", "email": "info@pravinrealty.com", "avatar": "/leader-pravin.jpg"}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table 2: Blog Posts & Market Insights
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Market Trends', 'Buyer Guide', 'Commercial', 'Legal & RERA')),
    image TEXT NOT NULL,
    author JSONB DEFAULT '{"name": "Pravin K.", "role": "Principal Advisor", "avatar": "/leader-pravin.jpg"}'::JSONB,
    content TEXT[] DEFAULT '{}'::TEXT[],
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table 3: Team Members & Advisors
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    specialty TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table 4: Client Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT,
    location TEXT,
    avatar TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table 5: Inquiries & CRM Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY DEFAULT ('lead_' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8)),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT,
    message TEXT,
    property_title TEXT,
    source TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Closed', 'Archived')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table 6: Global Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global_settings',
    settings JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================================================
-- 3. UPDATED_AT TRIGGER FUNCTION & TRIGGERS
-- ==========================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_properties_updated_at ON public.properties;
CREATE TRIGGER set_properties_updated_at 
BEFORE UPDATE ON public.properties 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_posts_updated_at 
BEFORE UPDATE ON public.blog_posts 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_team_members_updated_at ON public.team_members;
CREATE TRIGGER set_team_members_updated_at 
BEFORE UPDATE ON public.team_members 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER set_testimonials_updated_at 
BEFORE UPDATE ON public.testimonials 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at 
BEFORE UPDATE ON public.leads 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_site_settings_updated_at 
BEFORE UPDATE ON public.site_settings 
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Idempotent Policy Setup
DROP POLICY IF EXISTS "Public read properties" ON public.properties;
DROP POLICY IF EXISTS "Full access properties" ON public.properties;
CREATE POLICY "Public read properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Full access properties" ON public.properties FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Full access blog_posts" ON public.blog_posts;
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Full access blog_posts" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read team_members" ON public.team_members;
DROP POLICY IF EXISTS "Full access team_members" ON public.team_members;
CREATE POLICY "Public read team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Full access team_members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Full access testimonials" ON public.testimonials;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Full access testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read leads" ON public.leads;
DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
DROP POLICY IF EXISTS "Full access leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Full access leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Full access site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Full access site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
