import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Property, PROPERTIES as INITIAL_PROPERTIES } from '../data/properties';
import { BlogPost, BLOG_POSTS as INITIAL_BLOG_POSTS } from '../data/blog';
import { TeamMember, TEAM_MEMBERS as INITIAL_TEAM_MEMBERS } from '../data/team';
import { Testimonial, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/testimonials';
import { DEFAULT_SETTINGS } from '../data/settings';
import { Lead, SiteSettings } from '../types';
import { SupabaseService } from '../lib/supabaseSync';

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rohit Kulkarni',
    email: 'rohit.kulkarni@techcorp.in',
    phone: '+91 98230 45678',
    category: 'Luxury Villa',
    message: 'Looking for a 4 BHK villa or penthouse in Baner/Balewadi with quick possession.',
    propertyTitle: 'Rohan Ekam Premium Residences',
    source: 'Property Detail',
    date: '2026-04-05 14:32',
    status: 'New',
    notes: 'High budget client, looking for immediate site visit on Saturday.'
  },
  {
    id: 'lead-2',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@gmail.com',
    phone: '+91 98901 23456',
    category: 'Commercial',
    message: 'Require 3,500 sq ft Grade-A commercial office space in Baner High Street area.',
    propertyTitle: 'Nandan Probiz Commercial Suite',
    source: 'Consultation Modal',
    date: '2026-04-04 11:15',
    status: 'Contacted',
    notes: 'Shared brochure and floor plans on WhatsApp. Follow up on Monday.'
  },
  {
    id: 'lead-3',
    name: 'Vikram Mehta',
    email: 'vmehta.nri@outlook.com',
    phone: '+91 97654 32109',
    category: 'Residential',
    message: 'NRI investor looking for 3 BHK apartment with expected rental yield > 4%.',
    source: 'Contact Page',
    date: '2026-04-03 18:45',
    status: 'In Progress',
    notes: 'Virtual walkthrough scheduled for Friday.'
  }
];

interface DataContextType {
  properties: Property[];
  blogPosts: BlogPost[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  leads: Lead[];
  settings: SiteSettings;
  isSyncing: boolean;
  supabaseOnline: boolean;
  
  // Properties CRUD
  addProperty: (property: Omit<Property, 'id'> & { id?: string }) => Promise<void>;
  updateProperty: (id: string, updated: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;

  // Blog Posts CRUD
  addBlogPost: (post: Omit<BlogPost, 'id'> & { id?: string }) => Promise<void>;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;

  // Team CRUD
  addTeamMember: (member: Omit<TeamMember, 'id'> & { id?: string }) => Promise<void>;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Testimonials CRUD
  addTestimonial: (testimonial: Omit<Testimonial, 'id'> & { id?: string }) => Promise<void>;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Leads CRM
  addLead: (lead: Omit<Lead, 'id' | 'date' | 'status'> & { status?: Lead['status'] }) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status'], notes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  clearAllLeads: () => Promise<void>;

  // Site Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;

  // Cloud & Backup Sync
  syncLocalToSupabase: () => Promise<{ success: boolean; counts?: any; message?: string }>;
  refreshFromSupabase: () => Promise<boolean>;
  exportBackupJSON: () => void;
  importBackupJSON: (jsonString: string) => boolean;
  resetToDefaultData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROPERTIES: 'pravin_realty_properties_v2',
  BLOG: 'pravin_realty_blog_v2',
  TEAM: 'pravin_realty_team_v2',
  TESTIMONIALS: 'pravin_realty_testimonials_v2',
  LEADS: 'pravin_realty_leads_v2',
  SETTINGS: 'pravin_realty_settings_v2'
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [supabaseOnline, setSupabaseOnline] = useState(false);

  // Sync to localStorage as offline mirror
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [settings]);

  // Pull from Supabase on mount
  const refreshFromSupabase = useCallback(async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      const isConnected = await SupabaseService.checkConnection();
      setSupabaseOnline(isConnected);

      if (!isConnected) {
        setIsSyncing(false);
        return false;
      }

      const remoteData = await SupabaseService.fetchAll();

      if (remoteData.properties && remoteData.properties.length > 0) {
        setProperties(remoteData.properties);
      }
      if (remoteData.blogPosts && remoteData.blogPosts.length > 0) {
        setBlogPosts(remoteData.blogPosts);
      }
      if (remoteData.teamMembers && remoteData.teamMembers.length > 0) {
        setTeamMembers(remoteData.teamMembers);
      }
      if (remoteData.testimonials && remoteData.testimonials.length > 0) {
        setTestimonials(remoteData.testimonials);
      }
      if (remoteData.leads && remoteData.leads.length > 0) {
        setLeads(remoteData.leads);
      }
      if (remoteData.settings) {
        setSettings((prev) => ({ ...prev, ...remoteData.settings }));
      }
      setIsSyncing(false);
      return true;
    } catch (err) {
      console.warn('Supabase fetch error (using local cache):', err);
      setIsSyncing(false);
      setSupabaseOnline(false);
      return false;
    }
  }, []);

  useEffect(() => {
    refreshFromSupabase();
  }, [refreshFromSupabase]);

  // Property CRUD
  const addProperty = async (newProp: Omit<Property, 'id'> & { id?: string }) => {
    const id = newProp.id || `prop-${Date.now()}`;
    const slug = newProp.slug || newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const item: Property = { ...newProp, id, slug };
    setProperties((prev) => [item, ...prev]);
    try {
      await SupabaseService.upsertProperty(item);
    } catch (e) {
      console.warn('Supabase sync property failed:', e);
    }
  };

  const updateProperty = async (id: string, updated: Partial<Property>) => {
    let updatedItem: Property | null = null;
    setProperties((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...updated };
          return updatedItem;
        }
        return item;
      })
    );
    if (updatedItem) {
      try {
        await SupabaseService.upsertProperty(updatedItem);
      } catch (e) {
        console.warn('Supabase update property failed:', e);
      }
    }
  };

  const deleteProperty = async (id: string) => {
    setProperties((prev) => prev.filter((item) => item.id !== id));
    try {
      await SupabaseService.deleteProperty(id);
    } catch (e) {
      console.warn('Supabase delete property failed:', e);
    }
  };

  // Blog CRUD
  const addBlogPost = async (newPost: Omit<BlogPost, 'id'> & { id?: string }) => {
    const id = newPost.id || `blog-${Date.now()}`;
    const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const item: BlogPost = { ...newPost, id, slug };
    setBlogPosts((prev) => [item, ...prev]);
    try {
      await SupabaseService.upsertBlogPost(item);
    } catch (e) {
      console.warn('Supabase sync blog failed:', e);
    }
  };

  const updateBlogPost = async (id: string, updated: Partial<BlogPost>) => {
    let updatedItem: BlogPost | null = null;
    setBlogPosts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...updated };
          return updatedItem;
        }
        return item;
      })
    );
    if (updatedItem) {
      try {
        await SupabaseService.upsertBlogPost(updatedItem);
      } catch (e) {
        console.warn('Supabase update blog failed:', e);
      }
    }
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts((prev) => prev.filter((item) => item.id !== id));
    try {
      await SupabaseService.deleteBlogPost(id);
    } catch (e) {
      console.warn('Supabase delete blog failed:', e);
    }
  };

  // Team CRUD
  const addTeamMember = async (member: Omit<TeamMember, 'id'> & { id?: string }) => {
    const id = member.id || `team-${Date.now()}`;
    const item: TeamMember = { ...member, id };
    setTeamMembers((prev) => [...prev, item]);
    try {
      await SupabaseService.upsertTeamMember(item);
    } catch (e) {
      console.warn('Supabase sync team failed:', e);
    }
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    let updatedItem: TeamMember | null = null;
    setTeamMembers((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...updated };
          return updatedItem;
        }
        return item;
      })
    );
    if (updatedItem) {
      try {
        await SupabaseService.upsertTeamMember(updatedItem);
      } catch (e) {
        console.warn('Supabase update team failed:', e);
      }
    }
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));
    try {
      await SupabaseService.deleteTeamMember(id);
    } catch (e) {
      console.warn('Supabase delete team failed:', e);
    }
  };

  // Testimonial CRUD
  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'> & { id?: string }) => {
    const id = testimonial.id || `test-${Date.now()}`;
    const item: Testimonial = { ...testimonial, id };
    setTestimonials((prev) => [item, ...prev]);
    try {
      await SupabaseService.upsertTestimonial(item);
    } catch (e) {
      console.warn('Supabase sync testimonial failed:', e);
    }
  };

  const updateTestimonial = async (id: string, updated: Partial<Testimonial>) => {
    let updatedItem: Testimonial | null = null;
    setTestimonials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...updated };
          return updatedItem;
        }
        return item;
      })
    );
    if (updatedItem) {
      try {
        await SupabaseService.upsertTestimonial(updatedItem);
      } catch (e) {
        console.warn('Supabase update testimonial failed:', e);
      }
    }
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
    try {
      await SupabaseService.deleteTestimonial(id);
    } catch (e) {
      console.warn('Supabase delete testimonial failed:', e);
    }
  };

  // Lead CRUD
  const addLead = async (lead: Omit<Lead, 'id' | 'date' | 'status'> & { status?: Lead['status'] }) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      date: formattedDate,
      status: lead.status || 'New'
    };
    setLeads((prev) => [newLead, ...prev]);
    try {
      await SupabaseService.insertLead(newLead);
    } catch (e) {
      console.warn('Supabase insert lead failed:', e);
    }
  };

  const updateLeadStatus = async (id: string, status: Lead['status'], notes?: string) => {
    let updatedLead: Lead | null = null;
    setLeads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedLead = { ...item, status, ...(notes !== undefined ? { notes } : {}) };
          return updatedLead;
        }
        return item;
      })
    );
    if (updatedLead) {
      try {
        await SupabaseService.updateLead(updatedLead);
      } catch (e) {
        console.warn('Supabase update lead status failed:', e);
      }
    }
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((item) => item.id !== id));
    try {
      await SupabaseService.deleteLead(id);
    } catch (e) {
      console.warn('Supabase delete lead failed:', e);
    }
  };

  const clearAllLeads = async () => {
    setLeads([]);
  };

  // Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const merged: SiteSettings = {
      ...settings,
      ...newSettings,
      socials: { ...settings.socials, ...(newSettings.socials || {}) },
      hero: { ...settings.hero, ...(newSettings.hero || {}) },
      stats: { ...settings.stats, ...(newSettings.stats || {}) },
      about: { ...settings.about, ...(newSettings.about || {}) }
    };
    setSettings(merged);
    try {
      await SupabaseService.saveSettings(merged);
    } catch (e) {
      console.warn('Supabase save settings failed:', e);
    }
  };

  // One-click Seed Sync to Supabase
  const syncLocalToSupabase = async () => {
    setIsSyncing(true);
    try {
      const counts = await SupabaseService.pushAllLocalToSupabase({
        properties,
        blogPosts,
        teamMembers,
        testimonials,
        leads,
        settings
      });
      setIsSyncing(false);
      setSupabaseOnline(true);
      return { success: true, counts };
    } catch (err: any) {
      setIsSyncing(false);
      return { success: false, message: err.message || 'Sync failed' };
    }
  };

  // Export / Import / Reset
  const exportBackupJSON = () => {
    const backupData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      properties,
      blogPosts,
      teamMembers,
      testimonials,
      leads,
      settings
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pravin-realty-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackupJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.properties) setProperties(data.properties);
      if (data.blogPosts) setBlogPosts(data.blogPosts);
      if (data.teamMembers) setTeamMembers(data.teamMembers);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.leads) setLeads(data.leads);
      if (data.settings) setSettings(data.settings);
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
      return false;
    }
  };

  const resetToDefaultData = () => {
    setProperties(INITIAL_PROPERTIES);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setLeads(INITIAL_LEADS);
    setSettings(DEFAULT_SETTINGS);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        properties,
        blogPosts,
        teamMembers,
        testimonials,
        leads,
        settings,
        isSyncing,
        supabaseOnline,
        addProperty,
        updateProperty,
        deleteProperty,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addLead,
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        updateSettings,
        syncLocalToSupabase,
        refreshFromSupabase,
        exportBackupJSON,
        importBackupJSON,
        resetToDefaultData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
