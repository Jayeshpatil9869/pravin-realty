export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'anjali-mehta',
    quote: '"Smooth, Transparent, and Stress-Free! I recently bought a 2 BHK in Baner through Pravin Realty. The team was extremely professional and understood my exact requirements. Right from the site visit to final documentation, everything was seamless. Highly recommended!"',
    author: 'Anjali Mehta',
    role: 'IT Professional, Pune',
    location: 'Baner, Pune',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 'siddharth-jain',
    quote: '"Got a Great Rental Deal for My Office! Pravin Realty helped me find a fully-furnished commercial space in Balewadi. They negotiated the rent smartly and ensured all legal paperwork was in place. Their team is responsive and knows the market inside-out."',
    author: 'Siddhart Jain',
    role: 'Startup Founder & Tech Director',
    location: 'Balewadi, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 'manoj-deshmukh',
    quote: '"Excellent Guidance for My Real Estate Investment. As an investor, I had a lot of questions. Pravin guided me with clarity and showed options that matched both my budget and goals. I’ve already started earning high rental income thanks to their advice."',
    author: 'Manoj Deshmukh',
    role: 'NRI Investor & Business Owner',
    location: 'Koregaon Park & West Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
];
