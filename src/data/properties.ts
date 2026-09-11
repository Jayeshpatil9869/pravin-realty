export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  neighborhood: string;
  price: number;
  formattedPrice: string;
  estMonthly: string;
  beds: number | string;
  baths: number | string;
  sqft: string;
  category: 'Residential' | 'Luxury Villa' | 'Commercial' | 'Penthouse' | 'Plot / Land';
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  featured?: boolean;
  yearBuilt: number;
  reraId: string;
  maintenance?: string;
  possession?: string;
  parking: string;
  developer: string;
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export const PROPERTIES: Property[] = [
  {
    id: 'the-birch-residence',
    slug: 'the-birch-residence',
    title: 'The Baner Luxury Villa',
    location: 'Baner Hills Road, Baner, Pune 411045',
    neighborhood: 'Baner',
    price: 75000000,
    formattedPrice: '₹7.50 Cr',
    estMonthly: '₹4.85 Lakhs/mo',
    beds: 6,
    baths: 6,
    sqft: '4,800 sq ft',
    category: 'Luxury Villa',
    featured: true,
    yearBuilt: 2024,
    reraId: 'P52100049281',
    maintenance: '₹8,500/mo',
    possession: 'Ready to Move',
    parking: '3 Covered Car Parking Spaces',
    developer: 'Pravin Realty Signature Collection',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'An architectural 6 BHK private villa with 500 Gaj landscaped plot in prime Baner Hills. Features double-height ceilings, private 8-seater home theatre, jacuzzi deck, imported Italian marble flooring, and smart home automation throughout.',
    features: [
      'Private 8-seater 4K Dolby Atmos home theatre',
      'Rooftop heated jacuzzi and sky lounge',
      'Italian Statuario marble flooring across all living zones',
      'German modular kitchen with built-in Bosch appliances',
      'Dedicated staff quarters and landscaped private lawn',
      'MahaRERA verified title with 100% legal clearance'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Founder & Principal Broker',
      phone: '+91 97624 16737',
      email: 'info@pravinrealty.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'amar-westview',
    slug: 'amar-westview-koregaon-park',
    title: 'Amar Westview Luxury Residence',
    location: 'Lane 5, Koregaon Park, Pune 411001',
    neighborhood: 'Koregaon Park',
    price: 150000000,
    formattedPrice: '₹15.00 Cr',
    estMonthly: '₹9.80 Lakhs/mo',
    beds: 4,
    baths: 5,
    sqft: '5,259 sq ft',
    category: 'Penthouse',
    featured: true,
    yearBuilt: 2024,
    reraId: 'P52100028491',
    maintenance: '₹14,000/mo',
    possession: 'Ready to Move',
    parking: '4 Reserved Basement Parking Spaces',
    developer: 'Amar Builders & Pravin Realty Associate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'Ultra-exclusive 5,259 sq ft luxury apartment in Koregaon Park. Overlooking lush greenery with private elevator access, 12-foot clear ceiling heights, infinity temperature-controlled pool, and 24/7 five-tier concierge security.',
    features: [
      'Private biometric high-speed elevator foyer',
      'Wrap-around 600 sq ft panoramic deck facing tree canopy',
      'Custom Poggenpohl kitchen with Sub-Zero refrigeration',
      'Master suite with dual walk-in closets and spa soaking tub',
      'Dedicated club level with temperature-controlled pool & gym',
      'MahaRERA registered project with clear occupancy certificate'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor',
      phone: '+91 97624 16737',
      email: 'info@pravinrealty.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'punwala-finecrop',
    slug: 'punwala-finecrop-commercial',
    title: 'Punwala Finecrop Commercial Suites',
    location: 'Baner-Balewadi High Street Link Road, Pune 411045',
    neighborhood: 'Baner',
    price: 28500000,
    formattedPrice: '₹2.85 Cr',
    estMonthly: '₹1.80 Lakhs/mo',
    beds: 'Office Suite',
    baths: '2 Washrooms',
    sqft: '2,150 sq ft',
    category: 'Commercial',
    featured: false,
    yearBuilt: 2024,
    reraId: 'P52100033109',
    maintenance: '₹6,500/mo',
    possession: 'Ready for Fit-outs',
    parking: '3 Designated Multi-Level Basement Spaces',
    developer: 'Punwala Group & Pravin Realty',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'Grade-A boutique commercial space designed for high-growth tech firms, corporate headquarters, and legal consultancies. Features glass-facade visibility, 100% DG power backup, high-speed OTIS elevators, and multi-tier security.',
    features: [
      'High-visibility frontage on Baner-Balewadi arterial road',
      '100% DG power backup with centralized VRV air conditioning',
      'Grand double-height air-conditioned reception lobby',
      'Ample visitor parking and dedicated valet services',
      'Pre-certified green building with low operating costs'
    ],
    agent: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Specialist',
      phone: '+91 97624 16737',
      email: 'rohan@pravinrealty.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'nandan-probiz',
    slug: 'nandan-probiz-commercial-balewadi',
    title: 'Nandan Probiz Executive Office',
    location: 'Sr. No. 23, Balewadi Road, Balewadi, Pune 411045',
    neighborhood: 'Balewadi',
    price: 175000,
    formattedPrice: '₹1.75 L / mo',
    estMonthly: 'Rent Basis',
    beds: 'Furnished Office',
    baths: '2 Washrooms',
    sqft: '1,259 sq ft Carpet',
    category: 'Commercial',
    featured: false,
    yearBuilt: 2023,
    reraId: 'P52100019280',
    maintenance: '₹4,500/mo',
    possession: 'Immediate Occupancy',
    parking: '2 Covered Reserved Spaces',
    developer: 'Nandan Buildcon',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'Fully furnished, high-spec office space in the landmark Nandan Probiz commercial tower in Balewadi. Equipped with 24 workstations, 2 director cabins, 10-seater conference room with video conferencing, and dedicated server room.',
    features: [
      'Fully plug-and-play setup with ergonomic Herman Miller seating',
      'Dedicated 10-seater conference suite with 75" presentation screen',
      'Pantry area, reception waiting lounge, and executive washroom',
      'Walking distance from Balewadi High Street restaurants & transit'
    ],
    agent: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Specialist',
      phone: '+91 97624 16737',
      email: 'rohan@pravinrealty.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'balewadi-grandeur',
    slug: 'balewadi-grandeur-residence',
    title: 'Balewadi High Street Grandeur',
    location: 'Near High Street, Balewadi, Pune 411045',
    neighborhood: 'Balewadi',
    price: 22500000,
    formattedPrice: '₹2.25 Cr',
    estMonthly: '₹1.45 Lakhs/mo',
    beds: 3,
    baths: 3,
    sqft: '1,850 sq ft',
    category: 'Residential',
    featured: false,
    yearBuilt: 2024,
    reraId: 'P52100041203',
    maintenance: '₹4,800/mo',
    possession: 'Ready to Move',
    parking: '2 Covered Car Spaces',
    developer: 'Pravin Realty Certified Partner',
    image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'Premium 3 BHK luxury apartment situated 2 minutes from Balewadi High Street. Features open-concept living, imported vitrified flooring, 25+ lifestyle amenities including swimming pool, clubhouse, gym, and squash court.',
    features: [
      '2 minutes from Balewadi High Street dining and retail',
      'Double-height designer entrance lobby and podium garden',
      'Vastu-compliant layout with east-facing sunrise balconies',
      'EV charging infrastructure in covered parking'
    ],
    agent: {
      name: 'Ankita Joshi',
      role: 'Residential Client Advisor',
      phone: '+91 97624 16737',
      email: 'ankita@pravinrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'hinjewadi-greenview',
    slug: 'hinjewadi-greenview-suites',
    title: 'Hinjewadi Greenview Suites',
    location: 'Phase 1, Hinjewadi IT Park, Pune 411057',
    neighborhood: 'Hinjewadi',
    price: 9500000,
    formattedPrice: '₹95 Lakhs',
    estMonthly: '₹62,000/mo',
    beds: 2,
    baths: 2,
    sqft: '1,120 sq ft',
    category: 'Residential',
    featured: false,
    yearBuilt: 2024,
    reraId: 'P52100038812',
    maintenance: '₹3,200/mo',
    possession: 'Possession Dec 2025',
    parking: '1 Reserved Covered Space',
    developer: 'Pravin Realty Associate Developer',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'Smart 2 BHK urban residence in Phase 1 Hinjewadi. Ideal for tech professionals and investors seeking high rental yield. Features smart digital locks, piped gas, clubhouse, and landscaped jogging track.',
    features: [
      '5 minutes from Quadron Business Park and Infosys Phase 1',
      'High rental demand with projected 6.2% annual rental yield',
      'Smart home lighting & keyless digital door lock',
      'Olympic-length swimming pool and badminton court'
    ],
    agent: {
      name: 'Ankita Joshi',
      role: 'Residential Client Advisor',
      phone: '+91 97624 16737',
      email: 'ankita@pravinrealty.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    }
  }
];
