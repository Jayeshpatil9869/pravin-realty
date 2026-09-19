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
  category: 'Residential' | 'Luxury Villa' | 'Commercial' | 'Penthouse' | 'Township';
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
    id: 'rohan-ekam-baner',
    slug: 'rohan-ekam-baner-road',
    title: 'Rohan Ekam Premium Residences',
    location: 'Baner Road, Near Highway, Baner, Pune 411045',
    neighborhood: 'Baner',
    price: 13000000,
    formattedPrice: '₹1.30 Cr - ₹2.10 Cr',
    estMonthly: '₹85,000/mo',
    beds: '2 & 3 BHK',
    baths: 3,
    sqft: '700 - 1,150 sq ft',
    category: 'Residential',
    featured: true,
    yearBuilt: 2028,
    reraId: 'P52100052341',
    maintenance: '₹4,500/mo',
    possession: 'December 2028 (Under Construction)',
    parking: 'Dedicated Covered Car Parking',
    developer: 'Rohan Builders & Developers',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    ],
    description: 'Newly launched luxury residential landmark on prime Baner Road by Rohan Builders. Featuring Rohan’s signature PLUS home concept (Perfect Ventilation, Lively Light, Utmost Privacy, Smart Space). Unmatched connectivity to Mumbai-Pune Expressway and Baner High Street.',
    features: [
      'Signature Rohan PLUS architecture with maximum natural ventilation',
      'Infinity edge swimming pool & wellness clubhouse',
      'Strategic Baner Road location near proposed Metro Line 3',
      'Double height entrance lobby & landscaped central gardens',
      'MahaRERA approved with flexible construction-linked payment plans'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: '/leader-pravin.jpg'
    }
  },
  {
    id: 'rachana-beverly-hills',
    slug: 'rachana-beverly-hills-baner',
    title: 'Rachana Beverly Hills High-Rise',
    location: 'Baner Pan Card Club Road, Baner, Pune 411045',
    neighborhood: 'Baner',
    price: 23000000,
    formattedPrice: '₹2.30 Cr',
    estMonthly: '₹1.45 Lakhs/mo',
    beds: 3,
    baths: 3,
    sqft: '1,210 sq ft (Carpet)',
    category: 'Residential',
    featured: true,
    yearBuilt: 2023,
    reraId: 'P52100031892',
    maintenance: '₹6,200/mo',
    possession: 'Ready to Move',
    parking: '2 Covered Reserved Car Parkings',
    developer: 'Rachana Lifestyle',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'A 12th-floor 3 BHK fully furnished luxury residence in Rachana Beverly Hills on Baner Pan Card Club Road. Offers panoramic hill views, customized Italian modular kitchen, premium fixtures, and a vibrant community of elite residents.',
    features: [
      'High floor (12th Floor) with unobstructed Baner hill views',
      'Fully furnished with designer woodwork & false ceiling',
      'Italian modular kitchen with integrated chimneys & hob',
      'Clubhouse with gymnasium, indoor games & banquet area',
      'Clear title ready possession flat with Occupancy Certificate (OC)'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: '/leader-pravin.jpg'
    }
  },
  {
    id: 'nandan-probiz-commercial-hub',
    slug: 'nandan-probiz-balewadi-office',
    title: 'Nandan Probiz Executive Office Suites',
    location: 'Office 1011, 10th Floor, Nandan Probiz, Balewadi Road, Pune 411045',
    neighborhood: 'Balewadi',
    price: 175000,
    formattedPrice: '₹1.75 Lakhs/mo (Rent)',
    estMonthly: '₹1.75 Lakhs/mo',
    beds: 'Commercial Suite',
    baths: 'Attached Executive',
    sqft: '1,259 sq ft Carpet',
    category: 'Commercial',
    featured: true,
    yearBuilt: 2023,
    reraId: 'P52100024981',
    maintenance: '₹12/sq ft',
    possession: 'Immediate Possession',
    parking: '3 Reserved Basement Parkings',
    developer: 'Nandan Buildcon',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Corporate Grade-A commercial office space located in the iconic Nandan Probiz on Balewadi Road. High-visibility business address with state-of-the-art glass facade, 100% power backup, high-speed elevators, and multi-tier security. Ideal for IT consultancies, fintech firms, and corporate headquarters.',
    features: [
      'Grade-A corporate business park on Balewadi Main Road',
      '1,259 sq ft clear carpet area ready for custom fit-outs',
      'High floor with scenic city skyline views',
      '5-minute drive from Balewadi High Street & Metro Station',
      'Exclusive mandate with Pravin Realty HQ located in building'
    ],
    agent: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Director',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'marvel-brisa-balewadi',
    slug: 'marvel-brisa-balewadi',
    title: 'Marvel Brisa Sky Villa Residence',
    location: 'Near Balewadi Stadium, Balewadi, Pune 411045',
    neighborhood: 'Balewadi',
    price: 90000,
    formattedPrice: '₹90,000/mo (Rent)',
    estMonthly: '₹90,000/mo',
    beds: 3.5,
    baths: 4,
    sqft: '1,650 sq ft Carpet',
    category: 'Residential',
    featured: false,
    yearBuilt: 2022,
    reraId: 'P52100019482',
    maintenance: '₹7,500/mo',
    possession: 'Immediate',
    parking: '2 Covered Parkings',
    developer: 'Marvel Realtors',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Magnificent 20th-floor 3.5 BHK apartment in Marvel Brisa, Balewadi. Offering expansive living room balconies, premium wooden flooring in master bedrooms, VRV central air conditioning provisions, and clubhouse privileges.',
    features: [
      '20th Floor panoramic view of West Pune & stadium',
      'Spacious 3.5 BHK layout with private servant quarters',
      'Olympic size swimming pool, tennis court & squash room',
      'Walking distance to Balewadi High Street restaurants'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: '/leader-pravin.jpg'
    }
  },
  {
    id: 'maruti-millennium-tower',
    slug: 'maruti-millennium-tower-baner-highway',
    title: 'Maruti Millennium Tower Commercial',
    location: 'Baner Highway Corridor, Baner, Pune 411045',
    neighborhood: 'Baner',
    price: 140000000,
    formattedPrice: '₹14.00 Cr (Sale) / ₹200/sqft',
    estMonthly: '₹7.4 Lakhs/mo Rent',
    beds: 'Commercial Floor',
    baths: 'Executive Multiple',
    sqft: '2,507 Carpet / 3,706 Built-up',
    category: 'Commercial',
    featured: true,
    yearBuilt: 2024,
    reraId: 'P52100048194',
    maintenance: '₹15/sq ft',
    possession: 'Ready for Fitouts',
    parking: '6 Dedicated Stilt/Basement Parkings',
    developer: 'Maruti Group',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Prestigious commercial development on the Baner Highway corridor. Offers 2,507 sq ft usable carpet area (3,706 sq ft super built-up) with high ceiling clearance, floor-to-ceiling double-glazed facade, and massive brand signage frontage on the expressway.',
    features: [
      'Prominent frontage on Mumbai-Bangalore Highway at Baner',
      'Unfurnished open floor plate allowing bespoke corporate fitout',
      'Ideal for enterprise IT hubs, regional corporate offices or banks',
      'High ROI investment with 8.5%+ anticipated rental yield'
    ],
    agent: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Director',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'nandan-prospera-gold',
    slug: 'nandan-prospera-gold-balewadi',
    title: 'Nandan Prospera Gold Luxury 3 BHK',
    location: 'Balewadi Road, Near High Street, Balewadi, Pune 411045',
    neighborhood: 'Balewadi',
    price: 90000,
    formattedPrice: '₹90,000/mo (Rent)',
    estMonthly: '₹90,000/mo',
    beds: 3,
    baths: 3,
    sqft: '1,350 sq ft Carpet',
    category: 'Residential',
    featured: false,
    yearBuilt: 2023,
    reraId: 'P52100021940',
    maintenance: '₹5,500/mo',
    possession: 'Immediate',
    parking: '2 Covered Car Parkings',
    developer: 'Nandan Buildcon',
    image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85'
    ],
    description: '16th floor premium 3 BHK residence in Nandan Prospera Gold. Features wide sundecks, high-end marble finish tiling, and an exclusive clubhouse with temperature-controlled indoor pool and rooftop stargazing deck.',
    features: [
      '16th Floor with cross-ventilation and hill breezes',
      'Walking distance from Balewadi High Street retail avenue',
      '24/7 security with digital biometric door locks',
      'Dedicated EV charging points in parking bay'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: '/leader-pravin.jpg'
    }
  },
  {
    id: 'alive-sky-park-baner',
    slug: 'alive-sky-park-baner',
    title: 'Alive Sky Park Modern 2 BHK',
    location: 'Baner Main Road, Baner, Pune 411045',
    neighborhood: 'Baner',
    price: 45000,
    formattedPrice: '₹45,000/mo (Rent)',
    estMonthly: '₹45,000/mo',
    beds: 2,
    baths: 2,
    sqft: '900 sq ft Carpet',
    category: 'Residential',
    featured: false,
    yearBuilt: 2023,
    reraId: 'P52100028194',
    maintenance: '₹3,500/mo',
    possession: 'Immediate',
    parking: '1 Covered Car Parking',
    developer: 'Alive Landmarks',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Fully furnished 2 BHK apartment on the 12th floor in Alive Sky Park, Baner. Features contemporary furniture, air conditioning in all bedrooms, high-speed WiFi setup, and modern modular kitchen with appliances.',
    features: [
      '12th floor fully furnished ready-to-move apartment',
      'Custom wardrobe and sofa set included',
      'Clubhouse with gymnasium & jogging track',
      'Direct access to Baner-Hinjawadi link road'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: '/leader-pravin.jpg'
    }
  },
  {
    id: 'amar-business-zone-baner',
    slug: 'amar-business-zone-baner',
    title: 'Amar Business Zone Corporate Space',
    location: 'Baner Road, Near Highway, Baner, Pune 411045',
    neighborhood: 'Baner',
    price: 500000,
    formattedPrice: '₹5.00 Lakhs/mo (Rent)',
    estMonthly: '₹5.00 Lakhs/mo',
    beds: 'Enterprise Office',
    baths: 'Private Executive',
    sqft: '2,500 sq ft Carpet',
    category: 'Commercial',
    featured: false,
    yearBuilt: 2023,
    reraId: 'P52100020194',
    maintenance: '₹14/sq ft',
    possession: 'Immediate',
    parking: '5 Reserved Basement Parkings',
    developer: 'Amar Builders',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Grade-A fully furnished corporate floor in Amar Business Zone, Baner. Setup with 40+ workstations, 3 executive director cabins, 14-seater conference room with video conferencing, cafeteria, and private washrooms.',
    features: [
      'Plug and play 40+ workstation enterprise setup',
      'LEED Gold certified commercial building',
      'Multi-level parking & centralized HVAC cooling',
      'Prime business hub with top IT and corporate tenants'
    ],
    agent: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Director',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'megapolis-township-hinjawadi',
    slug: 'megapolis-township-hinjawadi',
    title: 'Megapolis Integrated Township',
    location: 'Phase 3, Hinjawadi Rajiv Gandhi Infotech Park, Pune 411057',
    neighborhood: 'Hinjawadi',
    price: 5500000,
    formattedPrice: '₹55.00 Lakhs - ₹85.00 Lakhs',
    estMonthly: '₹32,000/mo',
    beds: '1 & 2 BHK',
    baths: 2,
    sqft: '754 - 1,050 sq ft',
    category: 'Township',
    featured: false,
    yearBuilt: 2022,
    reraId: 'P52100000492',
    maintenance: '₹2,500/mo',
    possession: 'Ready to Move',
    parking: 'Allotted Car Parking',
    developer: 'Pegasus Properties & Megapolis',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Mega integrated township in Hinjawadi IT Park Phase 3. Zero-commute living for tech professionals working in Infosys, TCS, Wipro, and Cognizant. Features Olympic sports complexes, CBSE school on campus, hospital, and daily shopping avenues.',
    features: [
      'Located inside Hinjawadi Phase 3 IT Special Economic Zone',
      'Over 150 acres of planned green infrastructure',
      'High rental yield with 100% occupancy demand from IT professionals',
      'Complete township amenities including bus shuttles and sports academies'
    ],
    agent: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      phone: '+91 97624 16737',
      email: 'kpravin2492@gmail.com',
      avatar: '/leader-pravin.jpg'
    }
  }
];
