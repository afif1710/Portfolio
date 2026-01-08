import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import profile from '../data/profile.json';

// Animated SVG Logo Component
const AnimatedLogo = () => {
  const { reducedMotion } = useAccessibility();

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24">
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#ffd1e7"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={reducedMotion ? { pathLength: 1 } : { pathLength: 1, rotate: 360 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }
        }
      />
      <motion.path
        d="M35 65 L50 35 L65 65 M40 55 L60 55"
        fill="none"
        stroke="#d987ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  );
};

// CSS Shader Background Fallback
const ShaderBackground = () => {
  const { reducedMotion } = useAccessibility();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-black via-[#1a0a1a] to-[#0a0a1a] ${
          !reducedMotion ? 'animate-gradient' : ''
        }`}
      />
      {!reducedMotion && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-light-pink/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mid-purple/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-mid-blue/5 rounded-full blur-2xl animate-pulse-slow" />
        </>
      )}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
    </div>
  );
};

const Hero = () => {
  const { reducedMotion } = useAccessibility();
  const containerRef = useRef(null);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  // IMPORTANT: Always define hidden/visible so initial="hidden" + animate="visible" never breaks.
  const containerVariants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
      };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ShaderBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <AnimatedLogo />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
          >
            {/* REPLACE_ME: Update name */}
            {profile.name.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-light-pink' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Headline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto font-light"
          >
            {/* REPLACE_ME: Update headline */}
            {profile.headline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 bg-light-pink text-black px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>

            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-white/10 transition-colors duration-300"
            >
              View Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={reducedMotion ? undefined : { duration: 2, repeat: Infinity }}
          className="text-white/50 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
