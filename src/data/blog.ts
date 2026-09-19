export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Market Trends' | 'Buyer Guide' | 'Commercial' | 'Legal & RERA';
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'renting-vs-buying-home-pune',
    slug: 'renting-vs-buying-a-home-in-pune-whats-the-better-option',
    title: 'Renting vs. Buying a Home in Pune: What’s the Better Option?',
    excerpt: 'An objective financial breakdown comparing rental yields, EMI commitments, long-term equity growth, and tax benefits for Pune home seekers.',
    date: 'April 06, 2025',
    readTime: '5 min read',
    category: 'Buyer Guide',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      avatar: ''
    },
    content: [
      'Deciding whether to rent or buy a home in Pune depends on your career horizons, financial stability, and long-term investment goals.',
      'In high-growth tech corridors like Baner, Balewadi, and Hinjawadi, rental prices have seen a sharp upward revision of 12-15% year-on-year. While renting offers flexibility with lower upfront capital, purchasing a property creates tangible equity and acts as a strong hedge against inflation.',
      'If you plan to live in Pune for 5+ years, locking in a property with MahaRERA-backed credentials provides both pride of ownership and steady capital appreciation.'
    ]
  },
  {
    id: 'upcoming-infra-projects-pune-boost-prices',
    slug: 'upcoming-infrastructure-projects-in-pune-boost-prices',
    title: 'Upcoming Infrastructure Projects in Pune That Will Boost Property Prices',
    excerpt: 'How Pune Metro Line 3, the Ring Road corridor, and High Street extensions are transforming property valuations across West and East Pune.',
    date: 'April 06, 2025',
    readTime: '6 min read',
    category: 'Market Trends',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    content: [
      'Infrastructure is the primary catalyst driving real estate valuations in Pune. The Hinjawadi-Shivajinagar Metro Line 3 will drastically reduce transit times for IT professionals commuting to West Pune.',
      'Additionally, the proposed 128-km Pune Ring Road and ongoing flyover enhancements along Baner-Pashan Link Road are unlocking new residential clusters in Punawale, Mahalunge, and Wakad.',
      'Investors entering projects along these transit corridors are positioned to capture substantial capital appreciation over the next 3 to 5 years.'
    ]
  },
  {
    id: 'why-pune-best-city-real-estate-investment',
    slug: 'why-pune-is-the-best-city-for-real-estate-investment-in-india',
    title: 'Why Pune is the Best City for Real Estate Investment in India',
    excerpt: 'Exploring strong IT employment drivers, educational prestige, balanced living quality, and consistent rental demand making Pune an investor favorite.',
    date: 'April 06, 2025',
    readTime: '4 min read',
    category: 'Market Trends',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Pravin K.',
      role: 'Principal Advisor & Founder',
      avatar: ''
    },
    content: [
      'Pune has consistently ranked as one of India’s most livable metropolitan cities, driven by an expanding IT/ITeS sector, automotive manufacturing, and premier academic hubs.',
      'Unlike overheated markets with saturated yields, Pune offers healthy rental yields (3.5%–4.5% residential and 8%–10% commercial) combined with steady capital appreciation.',
      'At Pravin Realty, our advisory portfolio focuses on high-conviction micro-markets with verified developer pedigrees and clear legal titles.'
    ]
  },
  {
    id: 'nandan-probiz-baner-high-street-leasing',
    slug: 'nandan-probiz-baner-high-street-commercial-leasing',
    title: 'Why Nandan Probiz & Baner High Street Lead Pune Commercial Leasing',
    excerpt: 'Explore why IT consultancies, MNCs, and growing startups choose Balewadi Road and Nandan Probiz for their corporate headquarters.',
    date: 'February 12, 2026',
    readTime: '4 min read',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Rohan Deshmukh',
      role: 'Commercial Leasing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    content: [
      'Commercial real estate in West Pune has shifted towards lifestyle-centric corporate parks. Nandan Probiz on Balewadi Road has become a benchmark for functional, high-efficiency business infrastructure.',
      'With world-class dining options, high-speed transit, and immediate access to the Mumbai-Pune Expressway, businesses operating out of Balewadi report higher employee satisfaction and seamless client accessibility.',
      'Pravin Realty manages multiple exclusive commercial mandates across Nandan Probiz and surrounding Grade-A towers.'
    ]
  }
];
