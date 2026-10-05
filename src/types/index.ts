import { Property } from '../data/properties';
import { BlogPost } from '../data/blog';
import { TeamMember } from '../data/team';
import { Testimonial } from '../data/testimonials';

export type { Property, BlogPost, TeamMember, Testimonial };

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  category?: string;
  message?: string;
  propertyTitle?: string;
  source: 'Contact Page' | 'Consultation Modal' | 'Property Detail' | 'Direct Agent';
  date: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed' | 'Archived';
  notes?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
  mahaRera: string;
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
    primaryBtnText: string;
    secondaryBtnText: string;
  };
  stats: {
    yearsExperience: number;
    yearsSuffix: string;
    happyClients: number;
    clientsSuffix: string;
    areaDelivered: string;
    areaLabel: string;
    clientRating: number;
    ratingSuffix: string;
  };
  about: {
    headline: string;
    description: string;
    hqAddress: string;
    hqTitle: string;
  };
}
