import { Link } from 'react-router-dom';
import { ArrowRightIcon, SectionEyebrow } from './Icons';

export function GrandCtaBanner() {
  return (
    <section className="px-4 md:px-8 py-10 md:py-14">
      <div className="max-w-7xl mx-auto relative rounded-3xl md:rounded-[36px] overflow-hidden min-h-[360px] md:min-h-[420px] flex items-center justify-center text-center p-6 md:p-12 shadow-xl">
        {/* Background Image & Gradient */}
        <img 
          src="https://images.unsplash.com/photo-1600585155426-990dced4db0d?auto=format&fit=crop&w=2000&q=90" 
          alt="Luxury Modern Architecture Villa" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/45" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-white flex flex-col items-center space-y-3">
          <SectionEyebrow label="EXPLORE PRAVIN REALTY" light={true} />

          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-normal tracking-[-0.015em] text-white leading-tight pb-3">
            Find Your Right Property in Pune
          </h2>

          <Link 
            to="/properties" 
            className="group bg-white text-[#121316] hover:bg-neutral-100 font-normal text-xs sm:text-sm py-2.5 px-6 rounded-full inline-flex items-center gap-2.5 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore Properties</span>
            <div className="w-6 h-6 rounded-full bg-[#121316] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRightIcon className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
