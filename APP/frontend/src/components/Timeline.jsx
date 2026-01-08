import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import experiences from '../data/experiences.json';

const TimelineItem = ({ experience, index, isExpanded, onToggle }) => {
  const { reducedMotion } = useAccessibility();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start gap-6 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Timeline connector */}
      <div className="hidden lg:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-light-pink border-4 border-black z-10" />
        {index < experiences.length - 1 && (
          <div className="w-0.5 h-32 bg-white/20" />
        )}
      </div>

      {/* Mobile timeline dot */}
      <div className="lg:hidden flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-light-pink border-4 border-black" />
      </div>

      {/* Content */}
      <motion.div
        className={`flex-1 max-w-md ${
          isEven ? 'lg:text-right lg:pr-20' : 'lg:text-left lg:pl-20'
        }`}
      >
        <button
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
          className="w-full text-left lg:text-inherit focus:outline-none focus:ring-2 focus:ring-light-pink focus:ring-offset-2 focus:ring-offset-black rounded-lg"
          aria-expanded={isExpanded}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors">
            {/* Period */}
            <span className="inline-block bg-mid-purple text-black px-3 py-1 rounded-full font-mono text-xs mb-3">
              {experience.period}
            </span>

            {/* Role & Company */}
            <h3 className="font-display text-xl font-bold text-white mb-1">
              {experience.role}
            </h3>
            <p className="text-light-pink font-medium mb-3">
              {experience.company}
            </p>

            {/* Expand indicator */}
            <div className={`flex items-center gap-2 text-white/50 ${isEven ? 'lg:justify-end' : ''}`}>
              <span className="text-sm">View details</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white/5 rounded-lg p-6 mt-2">
                <p className="text-white/70 mb-4">
                  {experience.description}
                </p>

                {/* Progress bar animation */}
                <div className="mb-4">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reducedMotion ? 0 : 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-light-pink to-mid-purple"
                    />
                  </div>
                </div>

                {/* Highlights */}
                <ul className={`space-y-2 ${isEven ? 'lg:text-right' : ''}`}>
                  {experience.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={reducedMotion ? {} : { opacity: 0, x: isEven ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-white/60 text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-light-pink flex-shrink-0" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Timeline = () => {
  const [expandedId, setExpandedId] = useState(null);
  const { reducedMotion } = useAccessibility();

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleKeyNavigation = (e, currentIndex) => {
    if (e.key === 'ArrowDown' && currentIndex < experiences.length - 1) {
      e.preventDefault();
      setExpandedId(experiences[currentIndex + 1].id);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault();
      setExpandedId(experiences[currentIndex - 1].id);
    }
  };

  return (
    <section id="experience" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-mid-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-light-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-light-yellow text-black px-4 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-6">
            <Briefcase className="w-4 h-4" />
            Experience
          </span>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white">
            My <span className="text-light-yellow">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div
          className="relative space-y-8 lg:space-y-16"
          role="list"
          onKeyDown={(e) => {
            const currentIndex = experiences.findIndex(exp => exp.id === expandedId);
            if (currentIndex !== -1) {
              handleKeyNavigation(e, currentIndex);
            }
          }}
        >
          {/* Center line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isExpanded={expandedId === experience.id}
              onToggle={() => handleToggle(experience.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;