import { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { BlogModal } from '../components/BlogModal';
import { GrandCtaBanner } from '../components/GrandCtaBanner';
import { AgentCallout } from '../components/AgentCallout';
import { SectionEyebrow } from '../components/Icons';
import { ArrowRight } from 'lucide-react';

interface BlogProps {
  onOpenConsultation?: () => void;
}

export function Blog({ onOpenConsultation }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-36 space-y-12 sm:space-y-16 md:space-y-24 text-left">
      
      {/* 1. HEADER SECTION */}
      <section className="px-4 sm:px-6 md:px-8 text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
        <SectionEyebrow label="PRAVIN REALTY INSIGHTS" />

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#121316] tracking-[-0.02em] leading-[1.15]">
          Trusted Knowledge for<br className="hidden sm:inline" /> Pune Property Decisions
        </h1>

        <p className="text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Explore expert market trends, MahaRERA guidelines, home-buying checklists, and commercial leasing analysis from the Pravin Realty research desk.
        </p>
      </section>

      {/* 2. BLOG GRID (6 Cards) */}
      <section className="px-3 sm:px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl p-3.5 sm:p-5 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 sm:space-y-5 text-left"
            >
              {/* Image */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover img-zoom"
                />
              </div>

              {/* Meta & Title & Excerpt */}
              <div className="space-y-2 sm:space-y-2.5 px-0.5 sm:px-1">
                <div className="flex items-center gap-2 text-xs font-normal text-neutral-400">
                  <span className="bg-neutral-100 text-neutral-600 px-2.5 py-0.5 sm:py-1 rounded-full font-normal text-[11px] sm:text-xs">
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="font-normal text-[11px] sm:text-xs">{post.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#121316] group-hover:text-[#A15422] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Read More Link */}
              <div className="px-0.5 sm:px-1 pt-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-normal text-[#121316] group-hover:text-[#A15422] transition-colors">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. GRAND CTA BANNER */}
      <GrandCtaBanner />

      {/* 4. AGENT CALLOUT */}
      <AgentCallout onOpenConsultation={onOpenConsultation} />

      {/* Blog Article Reader Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />

    </div>
  );
}
