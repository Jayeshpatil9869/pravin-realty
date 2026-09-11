import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export function GrandCtaBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="px-3 sm:px-4 md:px-8 py-8 sm:py-10 md:py-16">
      <div className="max-w-7xl mx-auto relative rounded-3xl md:rounded-[38px] overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center text-center p-5 sm:p-8 md:p-14 lg:p-16 shadow-2xl bg-[#0F1014] border border-white/10 group">
        
        {/* Background Real Estate Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
        >
          <source src="/real-estate-banner.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/42861/42861-720.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Sophisticated Dark Cinematic Gradient & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

        {/* Subtle Video Control Badges (Top Right) */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={togglePlay}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Content Section */}
        <div className="relative z-10 max-w-3xl mx-auto text-white flex flex-col items-center space-y-3.5 sm:space-y-4 md:space-y-5">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-neutral-200">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FDE8D7]" />
            <span>DISCOVER WHAT'S NEXT IN PUNE REAL ESTATE</span>
          </div>

          {/* Main Display Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-[-0.02em] text-white leading-[1.15]">
            Find Your Right Property in Pune
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-normal max-w-xl leading-relaxed">
            From luxury residential towers to premier commercial suites across Baner, Balewadi & West Pune. Experience seamless property consultation.
          </p>

          {/* CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            <Link 
              to="/properties" 
              className="w-full sm:w-auto group bg-white text-[#121316] hover:bg-neutral-100 font-normal text-xs sm:text-sm py-2.5 sm:py-3 px-6 sm:px-7 rounded-full inline-flex items-center justify-center gap-2.5 sm:gap-3 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-center"
            >
              <span>Explore All Properties</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121316] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                <ArrowRightIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
            </Link>

            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-normal text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            >
              Talk to an Advisor
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
