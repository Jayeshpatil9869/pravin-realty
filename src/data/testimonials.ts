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
    id: 'siddhart-jain',
    quote: '"Got a Great Rental Deal for My Office! Pravin Realty helped me find a fully-furnished commercial space in Balewadi. They negotiated the rent smartly and ensured all legal paperwork was in place. Their team is responsive and knows the market inside-out."',
    author: 'Siddhart Jain',
    role: 'Startup Founder & Tech Director',
    location: 'Balewadi, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 'manoj-deshmukh',
    quote: '"Excellent Guidance for My First Investment! As a first-time investor, I had a lot of questions. Pravin guided me with clarity and showed options that matched both my budget and goals. I\'ve already started earning rental income thanks to their advice."',
    author: 'Manoj Deshmukh',
    role: 'NRI Investor',
    location: 'West Pune & Baner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 'sagar-deshpande',
    quote: '"Professionalism and Dedication! I’ve worked with several property consultants before, but Pravin Realty stands out for their professionalism and dedication. They truly care about their clients and make the whole process completely stress-free."',
    author: 'Sagar Deshpande',
    role: 'Senior Engineering Manager',
    location: 'Baner Hills Road, Pune',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
];
