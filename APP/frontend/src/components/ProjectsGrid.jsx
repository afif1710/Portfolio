import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Github } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import projects from '../data/projects.json';

const bgColorMap = {
  'dark-card': 'bg-[#1a1a1a] border border-white/[0.05]',
  'dark-slate': 'bg-[#1e293b]/20 border border-white/[0.05]',
  'dark-zinc': 'bg-[#27272a]/20 border border-white/[0.05]',
  'dark-neutral': 'bg-[#262626]/20 border border-white/[0.05]',
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
      className={`${bgClass} rounded-2xl p-6 cursor-pointer group relative min-h-[320px] flex flex-col backdrop-blur-sm transition-all duration-300 hover:border-white/20`}
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
        <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-light-pink transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 mb-4 line-clamp-2">{project.short}</p>

        <div className="flex flex-wrap gap-2">
          {project.categories?.map((cat) => (
            <span
              key={cat}
              className="bg-white/10 text-white/80 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider border border-white/5"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Live project link: revealed with the card controls on hover/focus. */}
      {project.url && (
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} live site`}
          onClick={(event) => event.stopPropagation()}
          className="group/live-link absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-100 shadow-lg backdrop-blur-sm transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 hover:border-light-pink hover:bg-light-pink hover:text-black hover:shadow-[0_0_20px_rgba(255,183,197,0.35)] focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-light-pink focus:ring-offset-2 focus:ring-offset-[#151515]"
          whileHover={reducedMotion ? {} : { scale: 1.08 }}
          whileTap={reducedMotion ? {} : { scale: 0.96 }}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-full right-0 mb-2 w-max translate-y-1 rounded border border-white/10 bg-[#151515] px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-white opacity-0 shadow-lg transition-all duration-200 group-hover/live-link:translate-y-0 group-hover/live-link:opacity-100 group-focus/live-link:translate-y-0 group-focus/live-link:opacity-100">
            Visit live site
          </span>
        </motion.a>
      )}
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
          className="bg-[#151515] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
        >
          {/* Header */}
          <div className={`${headerBg} p-8 relative border-b border-white/5`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded-full font-mono text-xs mb-4">
              {project.year}
            </span>

            <h2 className="font-display text-3xl font-bold text-white">{project.title}</h2>
          </div>

          {/* Content */}
          <div className="p-8 bg-[#151515]">
            <p className="text-white/70 text-lg leading-relaxed mb-6">{project.long}</p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.categories?.map((cat) => (
                <span
                  key={cat}
                  className="bg-white/10 text-white/90 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider border border-white/5"
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
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider border border-white/20 hover:border-light-pink hover:text-light-pink hover:scale-105 transition-all duration-300"
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
