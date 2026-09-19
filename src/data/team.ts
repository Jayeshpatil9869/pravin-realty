export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  phone: string;
  email: string;
  specialty: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'pravin-k',
    name: 'Pravin K.',
    role: 'Founder & Principal Broker',
    bio: 'Over 12 years of specialized real estate experience in West Pune. Pravin has guided over 500+ families and corporations through high-value acquisitions and commercial leasing.',
    image: '/leader-pravin.jpg',
    phone: '+91 97624 16737',
    email: 'info@pravinrealty.com',
    specialty: 'West Pune Luxury & Commercial'
  },
  {
    id: 'ankita-joshi',
    name: 'Ankita Joshi',
    role: 'Head of Residential Advisory',
    bio: 'Specializing in premium residential 2, 3 & 4 BHK apartments and penthouses in Baner, Balewadi, and Aundh with a focus on MahaRERA legal verification.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    phone: '+91 97624 16737',
    email: 'ankita@pravinrealty.com',
    specialty: 'Baner & Balewadi Residential'
  },
  {
    id: 'rohan-deshmukh',
    name: 'Rohan Deshmukh',
    role: 'Commercial Leasing Director',
    bio: 'Expert in Grade-A commercial office spaces, tech parks, retail showrooms, and corporate relocations across Nandan Probiz and the Baner-Balewadi corridor.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    phone: '+91 97624 16737',
    email: 'rohan@pravinrealty.com',
    specialty: 'Commercial & IT Park Leasing'
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Client Relations & Documentation Lead',
    bio: 'Ensuring 100% smooth paperwork, stamp duty registration, title search reports, and fast-track bank home loan approvals for our buyers.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    phone: '+91 97624 16737',
    email: 'priya@pravinrealty.com',
    specialty: 'Documentation & Bank Loans'
  },
  {
    id: 'vikram-patil',
    name: 'Vikram Patil',
    role: 'Land & Investment Specialist',
    bio: 'Guiding high-net-worth investors on strategic land parcels, plot developments, and high-yield commercial assets across West Pune growth corridors.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    phone: '+91 97624 16737',
    email: 'vikram@pravinrealty.com',
    specialty: 'Land & High-Yield Assets'
  },
  {
    id: 'sneha-kulkarni',
    name: 'Sneha Kulkarni',
    role: 'Senior Property Consultant',
    bio: 'Dedicated to matching first-time homebuyers and NRI investors with verified properties in Hinjewadi, Wakad, and Baner.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    phone: '+91 97624 16737',
    email: 'sneha@pravinrealty.com',
    specialty: 'NRI & First-Time Buyers'
  }
];
