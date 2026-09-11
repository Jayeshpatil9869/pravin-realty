import { useEffect } from 'react';
import { BlogPost } from '../data/blog';
import { X, Clock, Calendar } from 'lucide-react';
import { SectionEyebrow } from './Icons';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-neutral-100 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100 bg-white sticky top-0 z-20">
          <SectionEyebrow label="PRAVIN REALTY INSIGHTS" />

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-normal text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-normal text-[#121316] tracking-tight leading-snug">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 py-3 border-y border-neutral-100">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-xs sm:text-sm font-medium text-neutral-900">{post.author.name}</p>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-normal">{post.author.role}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-3.5 sm:space-y-4 text-neutral-700 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
            {post.content.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-100 mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-normal text-xs sm:text-sm text-neutral-900">Have questions about this topic?</h4>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-normal mt-0.5">Our senior property consultants are available for personalized advisory.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-[#121316] text-white text-xs font-normal px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 text-center"
            >
              Contact Our Advisors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
