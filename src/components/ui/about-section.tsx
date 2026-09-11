"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { Variants } from "framer-motion";

export default function AboutSection3({
  onOpenConsultation,
}: {
  onOpenConsultation?: () => void;
}) {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: (i || 0) * 0.15,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
    hidden: {
      y: -14,
      opacity: 0,
    },
  };

  const scaleVariants: Variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: (i || 0) * 0.15,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
    hidden: {
      opacity: 0,
    },
  };

  return (
    <section className="py-2 px-4 sm:px-6 md:px-8 bg-transparent font-sans" ref={heroRef}>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Header eyebrow without icon or social links */}
          <div className="flex items-center mb-3">
            <TimelineContent
              as="span"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-xs uppercase tracking-[0.2em] font-normal text-neutral-500 no-underline"
            >
              WHO WE ARE
            </TimelineContent>
          </div>

          {/* Resized SVG Inverted Clip Path Container without border/corner outlines */}
          <TimelineContent
            as="figure"
            animationNum={1}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group overflow-hidden border-0 outline-none"
          >
            <svg
              className="w-full h-auto block"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90"
              ></image>
            </svg>
          </TimelineContent>

          {/* Stats Bar */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-4 text-sm font-sans">
            <TimelineContent
              as="div"
              animationNum={2}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-1.5 sm:text-base text-xs font-normal">
                <span className="text-[#121316] font-normal">12+</span>
                <span className="text-neutral-500 font-normal">years in Pune</span>
                <span className="text-neutral-300 ml-2">|</span>
              </div>
              <div className="flex items-center gap-1.5 sm:text-base text-xs font-normal">
                <span className="text-[#121316] font-normal">500+</span>
                <span className="text-neutral-500 font-normal">deals closed</span>
              </div>
            </TimelineContent>

            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4 text-right">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-baseline gap-2 mb-1 justify-end"
              >
                <span className="text-[#121316] font-normal tracking-tight">₹450+ Cr</span>
                <span className="text-neutral-500 uppercase text-xs sm:text-sm font-normal">assets</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-1.5 sm:text-sm text-xs justify-end"
              >
                <span className="text-[#121316] font-normal">98%</span>
                <span className="text-neutral-500 font-normal">client satisfaction</span>
                <span className="text-neutral-300 lg:hidden block ml-2">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-6 font-sans">
          <div className="md:col-span-2">
            <h1 className="text-2xl sm:text-4xl md:text-[42px] font-normal text-[#121316] tracking-[-0.02em] leading-[1.2] mb-6 no-underline">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                  delay: 0.1,
                }}
              >
                Your Trusted Partner in Pune's Real Estate Market
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-6 md:gap-8 text-neutral-600"
            >
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-sm font-normal"
              >
                <p className="leading-relaxed text-neutral-600 font-normal">
                  Headquartered at Nandan Probiz in Balewadi, Pravin Realty specializes in luxury villas, residential apartments, Grade-A commercial office suites, and land investments across Baner, Balewadi, and West Pune.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs sm:text-sm font-normal"
              >
                <p className="leading-relaxed text-neutral-600 font-normal">
                  Every property search is unique, and we ensure complete peace of mind with verified MahaRERA compliance, thorough legal title search reports, and transparent advisory.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-left md:text-right">
              <TimelineContent
                as="div"
                animationNum={8}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-[#121316] text-xl md:text-2xl font-normal tracking-tight mb-1"
              >
                PRAVIN REALTY
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-neutral-500 text-xs sm:text-sm font-normal mb-6"
              >
                Pune Prime Properties & Advisory
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-[#121316] text-sm font-normal leading-relaxed">
                  Ready to find your dream residence or prime commercial space in Pune?
                </p>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                onClick={onOpenConsultation}
                className="bg-[#121316] hover:bg-black text-white px-6 py-3.5 rounded-full text-xs font-normal uppercase tracking-widest transition-colors flex items-center gap-2 ml-0 md:ml-auto cursor-pointer no-underline border-none"
              >
                <span>SCHEDULE CONSULTATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
