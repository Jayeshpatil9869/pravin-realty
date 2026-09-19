import { useState, useMemo } from 'react';
import { PROPERTIES, Property } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyModal } from '../components/PropertyModal';
import { AgentCallout } from '../components/AgentCallout';
import { SectionEyebrow } from '../components/Icons';
import { Search } from 'lucide-react';
import { ScrollReveal, ScrollStaggerGroup, ScrollStaggerItem } from '../components/ui/scroll-reveal';
import { motion } from 'framer-motion';

interface PropertiesProps {
  onOpenConsultation?: () => void;
}

export function Properties({ onOpenConsultation }: PropertiesProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'default' | 'low-high' | 'high-low'>('default');

  const categories = ['All', 'Residential', 'Commercial', 'Luxury Villa', 'Penthouse', 'Township'];

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
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-36 space-y-12 sm:space-y-16 md:space-y-24 overflow-x-hidden">
      
      {/* 1. HEADER SECTION */}
      <section className="px-4 sm:px-6 md:px-8 text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
        <ScrollReveal variant="blur-up" className="space-y-3 sm:space-y-4">
          <SectionEyebrow label="PRAVIN REALTY PORTFOLIO" />

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#121316] tracking-[-0.02em] leading-[1.15]">
            Discover Verified Properties in<br className="hidden sm:inline" /> West Pune & Beyond
          </h1>

          <p className="text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Explore our handpicked selection of residential apartments, luxury villas, and Grade-A commercial office suites across Baner, Balewadi, Koregaon Park, and Hinjewadi — all with 100% legal clearance.
          </p>
        </ScrollReveal>
      </section>

      {/* 2. FILTERS & SEARCH BAR */}
      <section className="px-3 sm:px-4 md:px-8">
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-3.5 rounded-3xl border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            
            {/* Category Tabs with Animated LayoutId Pill */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 shrink-0 relative">
              {categories.map((cat) => {
                const count = cat === 'All' ? PROPERTIES.length : PROPERTIES.filter((p) => p.category === cat).length;
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-xs font-normal px-3.5 sm:px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 z-10 ${
                      isSelected ? 'text-white' : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeFilterPill"
                        className="absolute inset-0 bg-[#121316] rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                    <motion.span
                      animate={isSelected ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-neutral-200/80 text-neutral-600'
                      }`}
                    >
                      {count}
                    </motion.span>
                  </button>
                );
              })}
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search neighborhood, street..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-normal bg-neutral-50 border border-neutral-200 rounded-full pl-9 pr-4 py-2 outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-800"
                />
              </div>

              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="text-xs font-normal bg-neutral-50 border border-neutral-200 rounded-full px-3.5 py-2 outline-none focus:border-neutral-900 cursor-pointer text-neutral-700 shrink-0"
              >
                <option value="default">Sort: Default</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 3. PROPERTIES GRID (Exact 6 Cards) */}
      <section className="px-3 sm:px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-neutral-200 p-6">
              <p className="text-neutral-500 text-sm font-normal">No properties match your search criteria.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-normal text-[#A15422] underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <ScrollStaggerGroup staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {filteredProperties.map((property) => (
                <ScrollStaggerItem key={property.id} variant="fade-up">
                  <PropertyCard 
                    property={property} 
                    onSelect={(p) => setSelectedProperty(p)} 
                  />
                </ScrollStaggerItem>
              ))}
            </ScrollStaggerGroup>
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
