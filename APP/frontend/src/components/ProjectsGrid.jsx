import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Github } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import projects from '../data/projects.json';

const bgColorMap = {
  // existing
  'light-pink': 'bg-light-pink',
  'mid-purple': 'bg-mid-purple',
  'light-yellow': 'bg-light-yellow',
  'mid-blue': 'bg-mid-blue',
  'grey': 'bg-grey',
  'mid-green': 'bg-mid-green',

  // “paper” / light cards (if you want some cards light)
  'offwhite': 'bg-neutral-50',
  'paper': 'bg-stone-50',
  'soft-grey': 'bg-zinc-50',

  // muted accents (still readable with black text usually)
  'rose-soft': 'bg-rose-300',
  'violet-soft': 'bg-violet-300',
  'sky-soft': 'bg-sky-200',
  'mint-soft': 'bg-emerald-300',
  'amber-soft': 'bg-amber-300',
};


const ProjectCard = ({ project, onClick }) => {
  const { reducedMotion } = useAccessibility();
  const bgClass = bgColorMap[project.bgColor] || 'bg-light-pink';
  const thumbnail = project?.images?.[0];

  return (
    <motion.article
      layout
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={reducedMotion ? {} : { y: -8, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`${bgClass} rounded-lg p-6 cursor-pointer group relative overflow-hidden min-h-[320px] flex flex-col`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      aria-label={`Open ${project.title}`}
    >
      {/* hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

      {/* Year badge */}
      <div className="relative z-10">
        <span className="inline-block bg-black/70 px-3 py-1 rounded-full font-mono text-xs">
          {project.year}
        </span>
      </div>

      {/* Optional thumbnail */}
      {thumbnail && (
        <div className="relative z-10 mt-4 rounded-lg overflow-hidden border border-black/10">
          <img
            src={thumbnail}
            alt={`${project.title} preview`}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mt-auto pt-4">
        <h3 className="font-display text-2xl font-bold text-black mb-2 group-hover:underline">
          {project.title}
        </h3>
        <p className="text-black/60 mb-4">{project.short}</p>

        <div className="flex flex-wrap gap-2">
          {project.categories?.map((cat) => (
            <span
              key={cat}
              className="bg-black text-white px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={reducedMotion ? {} : { scale: 1.1 }}
      >
        <ExternalLink className="w-5 h-5 text-black/50" />
      </motion.div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const { reducedMotion } = useAccessibility();

  // Lightbox state must live inside a component (Rules of Hooks).
  const [activeImg, setActiveImg] = useState(null);

  if (!project) return null;

  const headerBg = bgColorMap[project.bgColor] || 'bg-light-pink';
  const images = (project.images || []).filter(Boolean);

  return (
    <>
      <motion.div
        key="project-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="project-modal"
          initial={reducedMotion ? {} : { scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reducedMotion ? {} : { scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className={`${headerBg} p-8 relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block bg-black/10 px-3 py-1 rounded-full font-mono text-xs mb-4">
              {project.year}
            </span>

            <h2 className="font-display text-3xl font-bold text-black">{project.title}</h2>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-dark-grey text-lg leading-relaxed mb-6">{project.long}</p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.categories?.map((cat) => (
                <span
                  key={cat}
                  className="bg-mid-purple text-black px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Gallery (click to enlarge) */}
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {images.map((src) => (
                  <motion.button
                    key={src}
                    type="button"
                    onClick={() => setActiveImg(src)}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="rounded-lg overflow-hidden border border-black/10 bg-grey text-left focus:outline-none focus:ring-2 focus:ring-black/30"
                    aria-label="Open image"
                  >
                    <img
                      src={src}
                      alt={`${project.title} screenshot`}
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}

              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="aspect-video bg-grey rounded-lg flex items-center justify-center border border-black/10"
                  >
                    <span className="text-mid-grey font-mono text-sm">Image {i}</span>
                  </motion.div>
                ))}
              </div>

            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-black/80 transition-colors"
                >
                  Visit Webapp Live
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider border border-black/20 hover:bg-black/5 transition-colors hover:bg-purple-400"
                >
                  GitHub
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox overlay (enlarged image) */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveImg(null)}
          >
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reducedMotion ? {} : { scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setActiveImg(null)}
                className="absolute -top-3 -right-3 p-2 bg-white/90 rounded-full hover:bg-white"
                aria-label="Close image"
              >
                <X className="w-5 h-5 text-black" />
              </button>

              <img
                src={activeImg}
                alt="Enlarged screenshot"
                className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectsGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { reducedMotion } = useAccessibility();

  return (
    <section id="projects" className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-block bg-light-pink text-black px-4 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-6">
            Selected Work
          </span>

          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white">
            Featured <span className="text-light-pink">Projects</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGrid;
