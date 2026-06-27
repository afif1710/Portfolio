import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import craftedweb from '../data/craftedweb.json';

const SLIDE_INTERVAL_MS = 3000;

const loadSlides = () => {
  try {
    const context = require.context(
      '../assets/craftedweb',
      false,
      /\.(png|jpe?g|webp|gif)$/i
    );

    return context
      .keys()
      .sort()
      .map((key) => {
        const src = context(key);
        const filename = key.replace('./', '').replace(/\.[^.]+$/, '');
        const label = filename.replace(/[-_]/g, ' ');

        return {
          src: typeof src === 'string' ? src : src.default,
          alt: `CraftedWeb Studio — ${label}`,
        };
      });
  } catch {
    return [];
  }
};

const ShowcaseSlideshow = ({ slides, reducedMotion }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (slides.length === 0) return;
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1 || reducedMotion) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [activeIndex, slides.length, reducedMotion]);

  if (slides.length === 0) {
    return (
      <div className="aspect-video w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto relative">
        <div className="absolute inset-4 bg-mid-purple rounded-2xl" aria-hidden="true" />
        <div className="absolute inset-0 bg-grey rounded-2xl overflow-hidden border border-black/5 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-wider text-mid-grey text-center px-4">
            Add screenshots to src/assets/craftedweb/
          </span>
        </div>
      </div>
    );
  }

  const current = slides[activeIndex];

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
      <div className="aspect-video relative w-full">
        <div className="absolute inset-4 bg-mid-purple rounded-2xl" aria-hidden="true" />
        <div className="absolute inset-0 bg-grey rounded-2xl overflow-hidden border border-black/5">
          <AnimatePresence>
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && (
        <div
          className="flex items-center justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Marketplace screenshot slideshow"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show screenshot ${index + 1} of ${slides.length}`}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-mid-purple'
                  : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CraftedWebStudio = () => {
  const { reducedMotion } = useAccessibility();
  const slides = useMemo(() => loadSlides(), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="craftedweb" className="py-24 lg:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center"
        >
          <motion.div
            variants={reducedMotion ? {} : itemVariants}
            className="order-2 lg:order-1"
          >
            <span className="inline-block bg-mid-purple text-black px-4 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-4 sm:mb-6">
              {craftedweb.badge}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">
              {craftedweb.titleLine1}
              <span className="text-mid-purple"> {craftedweb.titleAccent}</span>
            </h2>

            <p className="text-black/80 text-base sm:text-lg font-medium leading-relaxed mb-4 sm:mb-6">
              {craftedweb.caption}
            </p>

            <p className="text-dark-grey text-base sm:text-lg leading-relaxed mb-6">
              {craftedweb.description}
            </p>

            <ul className="space-y-2 mb-6 sm:mb-8">
              {craftedweb.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-dark-grey text-sm sm:text-base leading-relaxed"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-mid-purple flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {craftedweb.stats.map((stat) => (
                <span
                  key={stat}
                  className="bg-mid-purple/10 text-black px-3 py-1.5 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-wider"
                >
                  {stat}
                </span>
              ))}
            </div>

            <a
              href={craftedweb.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-5 sm:px-6 py-3 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wider border border-black/20 hover:border-mid-purple hover:text-mid-purple hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Visit CraftedWeb Studio
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            variants={reducedMotion ? {} : itemVariants}
            className="order-1 lg:order-2 w-full"
            whileHover={reducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
          >
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-mid-grey mb-3 text-center lg:text-right">
              Store preview
            </p>
            <ShowcaseSlideshow slides={slides} reducedMotion={reducedMotion} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CraftedWebStudio;
