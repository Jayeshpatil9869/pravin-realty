import { supabase } from './supabase';
import { Property } from '../data/properties';
import { BlogPost } from '../data/blog';
import { TeamMember } from '../data/team';
import { Testimonial } from '../data/testimonials';
import { Lead, SiteSettings } from '../types';

// ==========================================
// MAPPERS: Supabase DB <---> App Frontend
// ==========================================

export const mapDbToProperty = (row: any): Property => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  location: row.location,
  neighborhood: row.neighborhood,
  price: Number(row.price),
  formattedPrice: row.formatted_price || `₹${(Number(row.price) / 10000000).toFixed(2)} Cr`,
  estMonthly: row.est_monthly || '',
  beds: row.beds,
  baths: Number(row.baths) || 2,
  sqft: row.sqft,
  category: row.category,
  image: row.image,
  gallery: Array.isArray(row.gallery) ? row.gallery : [],
  description: row.description || '',
  features: Array.isArray(row.features) ? row.features : [],
  featured: Boolean(row.featured),
  yearBuilt: row.year_built || 2026,
  reraId: row.rera_id || '',
  maintenance: row.maintenance || '',
  possession: row.possession || '',
  parking: row.parking || '',
  developer: row.developer || '',
  agent: row.agent || {
    name: 'Pravin K.',
    role: 'Principal Broker',
    phone: '+91 97624 16737',
    email: 'info@pravinrealty.com',
    avatar: '/leader-pravin.jpg'
  }
});

export const mapPropertyToDb = (p: Property) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  location: p.location,
  neighborhood: p.neighborhood,
  price: p.price,
  formatted_price: p.formattedPrice,
  est_monthly: p.estMonthly,
  beds: String(p.beds),
  baths: typeof p.baths === 'number' ? p.baths : parseFloat(String(p.baths)) || 2,
  sqft: p.sqft,
  category: p.category,
  image: p.image,
  gallery: p.gallery || [],
  description: p.description || '',
  features: p.features || [],
  featured: Boolean(p.featured),
  year_built: p.yearBuilt,
  rera_id: p.reraId,
  maintenance: p.maintenance || '',
  possession: p.possession || '',
  parking: p.parking || '',
  developer: p.developer || '',
  agent: p.agent
});

export const mapDbToBlogPost = (row: any): BlogPost => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  date: row.date,
  readTime: row.read_time,
  category: row.category,
  image: row.image,
  author: row.author,
  content: Array.isArray(row.content) ? row.content : []
});

export const mapBlogPostToDb = (b: BlogPost) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  date: b.date,
  read_time: b.readTime,
  category: b.category,
  image: b.image,
  author: b.author,
  content: b.content
});

export const mapDbToTeamMember = (row: any): TeamMember => ({
  id: row.id,
  name: row.name,
  role: row.role,
  bio: row.bio || '',
  image: row.image,
  phone: row.phone || '',
  email: row.email || '',
  specialty: row.specialty || ''
});

export const mapTeamMemberToDb = (t: TeamMember) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  bio: t.bio,
  image: t.image,
  phone: t.phone,
  email: t.email,
  specialty: t.specialty
});

export const mapDbToTestimonial = (row: any): Testimonial => ({
  id: row.id,
  quote: row.quote,
  author: row.author,
  role: row.role,
  location: row.location,
  avatar: row.avatar,
  rating: row.rating || 5
});

export const mapTestimonialToDb = (t: Testimonial) => ({
  id: t.id,
  quote: t.quote,
  author: t.author,
  role: t.role,
  location: t.location,
  avatar: t.avatar,
  rating: t.rating
});

export const mapDbToLead = (row: any): Lead => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  category: row.category,
  message: row.message,
  propertyTitle: row.property_title,
  source: row.source,
  date: row.date,
  status: row.status || 'New',
  notes: row.notes
});

export const mapLeadToDb = (l: Lead) => ({
  id: l.id,
  name: l.name,
  email: l.email,
  phone: l.phone,
  category: l.category,
  message: l.message,
  property_title: l.propertyTitle,
  source: l.source,
  date: l.date,
  status: l.status,
  notes: l.notes
});

// ==========================================
// SUPABASE ASYNC API SERVICES
// ==========================================

export const SupabaseService = {
  // Test connection
  async checkConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase.from('site_settings').select('id').limit(1);
      if (error && error.code !== 'PGRST116') {
        // Check if table exists
        const { error: propErr } = await supabase.from('properties').select('id').limit(1);
        return !propErr;
      }
      return true;
    } catch {
      return false;
    }
  },

  // Fetch all tables
  async fetchAll() {
    const [propsRes, blogRes, teamRes, testRes, leadsRes, settingsRes] = await Promise.all([
      supabase.from('properties').select('*').order('created_at', { ascending: false }),
      supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('team_members').select('*').order('created_at', { ascending: true }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('site_settings').select('settings').eq('id', 'global_settings').single()
    ]);

    return {
      properties: propsRes.data && propsRes.data.length > 0 ? propsRes.data.map(mapDbToProperty) : null,
      blogPosts: blogRes.data && blogRes.data.length > 0 ? blogRes.data.map(mapDbToBlogPost) : null,
      teamMembers: teamRes.data && teamRes.data.length > 0 ? teamRes.data.map(mapDbToTeamMember) : null,
      testimonials: testRes.data && testRes.data.length > 0 ? testRes.data.map(mapDbToTestimonial) : null,
      leads: leadsRes.data ? leadsRes.data.map(mapDbToLead) : null,
      settings: settingsRes.data?.settings || null
    };
  },

  // Upsert single items
  async upsertProperty(property: Property) {
    return supabase.from('properties').upsert(mapPropertyToDb(property));
  },

  async deleteProperty(id: string) {
    return supabase.from('properties').delete().eq('id', id);
  },

  async upsertBlogPost(post: BlogPost) {
    return supabase.from('blog_posts').upsert(mapBlogPostToDb(post));
  },

  async deleteBlogPost(id: string) {
    return supabase.from('blog_posts').delete().eq('id', id);
  },

  async upsertTeamMember(member: TeamMember) {
    return supabase.from('team_members').upsert(mapTeamMemberToDb(member));
  },

  async deleteTeamMember(id: string) {
    return supabase.from('team_members').delete().eq('id', id);
  },

  async upsertTestimonial(testimonial: Testimonial) {
    return supabase.from('testimonials').upsert(mapTestimonialToDb(testimonial));
  },

  async deleteTestimonial(id: string) {
    return supabase.from('testimonials').delete().eq('id', id);
  },

  async insertLead(lead: Lead) {
    return supabase.from('leads').upsert(mapLeadToDb(lead));
  },

  async updateLead(lead: Lead) {
    return supabase.from('leads').upsert(mapLeadToDb(lead));
  },

  async deleteLead(id: string) {
    return supabase.from('leads').delete().eq('id', id);
  },

  async saveSettings(settings: SiteSettings) {
    return supabase.from('site_settings').upsert({
      id: 'global_settings',
      settings
    });
  },

  // Push full local seed dataset to Supabase in one batch
  async pushAllLocalToSupabase(payload: {
    properties: Property[];
    blogPosts: BlogPost[];
    teamMembers: TeamMember[];
    testimonials: Testimonial[];
    leads: Lead[];
    settings: SiteSettings;
  }) {
    const results = {
      properties: 0,
      blogPosts: 0,
      teamMembers: 0,
      testimonials: 0,
      leads: 0,
      settings: false
    };

    if (payload.properties.length > 0) {
      const { error } = await supabase.from('properties').upsert(payload.properties.map(mapPropertyToDb));
      if (!error) results.properties = payload.properties.length;
    }

    if (payload.blogPosts.length > 0) {
      const { error } = await supabase.from('blog_posts').upsert(payload.blogPosts.map(mapBlogPostToDb));
      if (!error) results.blogPosts = payload.blogPosts.length;
    }

    if (payload.teamMembers.length > 0) {
      const { error } = await supabase.from('team_members').upsert(payload.teamMembers.map(mapTeamMemberToDb));
      if (!error) results.teamMembers = payload.teamMembers.length;
    }

    if (payload.testimonials.length > 0) {
      const { error } = await supabase.from('testimonials').upsert(payload.testimonials.map(mapTestimonialToDb));
      if (!error) results.testimonials = payload.testimonials.length;
    }

    if (payload.leads.length > 0) {
      const { error } = await supabase.from('leads').upsert(payload.leads.map(mapLeadToDb));
      if (!error) results.leads = payload.leads.length;
    }

    const { error: setErr } = await supabase.from('site_settings').upsert({
      id: 'global_settings',
      settings: payload.settings
    });
    if (!setErr) results.settings = true;

    return results;
  }
};
