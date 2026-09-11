import { useState, useMemo } from 'react';
import { PROPERTIES, Property } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyModal } from '../components/PropertyModal';
import { AgentCallout } from '../components/AgentCallout';
import { SectionEyebrow } from '../components/Icons';
import { Search } from 'lucide-react';

interface PropertiesProps {
  onOpenConsultation?: () => void;
}

export function Properties({ onOpenConsultation }: PropertiesProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'default' | 'low-high' | 'high-low'>('default');

  const categories = ['All', 'Residential', 'Luxury Villa', 'Commercial', 'Penthouse'];

  const filteredProperties = useMemo(() => {
    let list = PROPERTIES.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (priceSort === 'low-high') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, searchQuery, priceSort]);

  return (
    <div className="min-h-screen pt-28 md:pt-36 space-y-16 md:space-y-24">
      
      {/* 1. HEADER SECTION */}
      <section className="px-4 md:px-8 text-center max-w-4xl mx-auto space-y-4">
        <SectionEyebrow label="PRAVIN REALTY PORTFOLIO" />

        <h1 className="text-3xl md:text-5xl lg:text-[54px] font-normal text-[#121316] tracking-[-0.02em] leading-[1.15]">
          Discover Verified Properties in<br className="hidden sm:inline" /> West Pune & Beyond
        </h1>

        <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Explore our handpicked selection of residential apartments, luxury villas, and Grade-A commercial office suites across Baner, Balewadi, Koregaon Park, and Hinjewadi — all with 100% legal clearance.
        </p>
      </section>

      {/* 2. FILTERS & SEARCH BAR */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 md:p-3.5 rounded-3xl border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const count = cat === 'All' ? PROPERTIES.length : PROPERTIES.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-normal px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-[#121316] text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat ? 'bg-white/20 text-white' : 'bg-neutral-200/80 text-neutral-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by neighborhood, street..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-normal bg-neutral-50 border border-neutral-200 rounded-full pl-9 pr-4 py-2 outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-800"
              />
            </div>

            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="text-xs font-normal bg-neutral-50 border border-neutral-200 rounded-full px-3.5 py-2 outline-none focus:border-neutral-900 cursor-pointer text-neutral-700"
            >
              <option value="default">Sort: Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

        </div>
      </section>

      {/* 3. PROPERTIES GRID (Exact 6 Cards) */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200">
              <p className="text-neutral-500 text-sm font-normal">No properties match your search criteria.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-normal text-[#A15422] underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onSelect={(p) => setSelectedProperty(p)} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. AGENT CALLOUT SECTION */}
      <AgentCallout onOpenConsultation={onOpenConsultation} />

      {/* Property Details Modal */}
      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />

    </div>
  );
}
