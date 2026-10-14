import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiUnity } from 'react-icons/si';
import SplitText from '../ui/SplitText';
import { projects, projectCategories } from '../../data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const active = filtered[activeIndex] || filtered[0];

  return (
    <section id="work" className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-mono text-xs text-[var(--color-accent)]">/04</span>
              <span className="eyebrow">Work</span>
            </div>
            <p className="text-mono text-xs text-[var(--color-muted)] leading-relaxed max-w-xs">
              Selected projects.
              <br />
              Hover to preview, click to expand.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <SplitText
              text="A selection of things I've built lately."
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-4xl"
              stagger={0.04}
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === 'All'
                ? projects.length
                : projects.filter((p) => p.categories.includes(cat)).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor-hover
                className={`
                  inline-flex items-center gap-2
                  text-mono text-xs uppercase tracking-widest
                  px-3.5 py-2 border transition-all duration-300
                  ${
                    isActive
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/[0.06]'
                      : 'border-[var(--color-border-strong)] text-[var(--color-text-dim)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]'
                  }
                `}
              >
                <span>{cat}</span>
                <span className={`text-[10px] ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-faint)]'}`}>
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main exhibit: sticky preview + entry list */}
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {/* === LEFT: sticky preview === */}
          <div className="col-span-12 lg:col-span-7 hidden lg:block">
            <div className="sticky top-24">
              <ProjectPreview project={active} onExpand={() => setLightboxOpen(true)} />
            </div>
          </div>

          {/* === RIGHT: list === */}
          <div className="col-span-12 lg:col-span-5">
            <div className="border-t border-[var(--color-border)]">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectRow
                    key={project.name}
                    project={project}
                    index={i}
                    isActive={i === activeIndex}
                    onActivate={() => setActiveIndex(i)}
                    onExpand={() => {
                      setActiveIndex(i);
                      setLightboxOpen(true);
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* CTA — link to full timeline */}
            <a
              href="/timeline"
              data-cursor-hover
              className="group mt-8 flex items-center justify-between gap-4 p-5 border border-[var(--color-border-strong)] hover:border-[var(--color-accent)] transition-all duration-500"
            >
              <div>
                <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">
                  Want the full picture?
                </div>
                <div className="text-base text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  View the complete timeline →
                </div>
              </div>
              <FiArrowUpRight
                size={28}
                className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:rotate-45 transition-all duration-500 flex-shrink-0"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox project={active} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================
   Sticky preview panel (left side, desktop only)
============================================================ */

function ProjectPreview({ project, onExpand }) {
  if (!project) return null;
  return (
    <motion.div
      key={project.name}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/3] bg-[var(--color-bg-2)] border border-[var(--color-border)] overflow-hidden group cursor-pointer"
      onClick={onExpand}
      data-cursor-hover
    >
      {/* Image */}
      <img
        src={`/${project.img}`}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {/* Top metadata */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-mono text-[10px] uppercase tracking-widest text-white/80 mix-blend-difference">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span>{project.linkType === 'game' ? 'Game' : 'Repo'}</span>
        </div>
        <span>{project.categories.join(' · ')}</span>
      </div>

      {/* Bottom info — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="bg-[var(--color-bg)]/85 backdrop-blur-sm border border-[var(--color-border)] p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text)] mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-[var(--color-text-dim)] line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Expand hint */}
      <div className="absolute top-4 right-4 text-mono text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-difference">
        Click to expand
      </div>
    </motion.div>
  );
}

/* ============================================================
   Project row in the list
============================================================ */

function ProjectRow({ project, index, isActive, onActivate, onExpand }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onActivate}
      onClick={onExpand}
      data-cursor-hover
      className={`
        group relative flex items-center gap-4
        py-4 md:py-5 border-b border-[var(--color-border)] cursor-pointer
        transition-all duration-500
        ${isActive ? 'pl-4' : 'pl-0'}
      `}
    >
      {/* Active indicator */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 w-px bg-[var(--color-accent)]
          transition-all duration-500
          ${isActive ? 'h-full opacity-100' : 'h-0 opacity-0'}
        `}
      />

      {/* Number */}
      <span className="text-mono text-[10px] text-[var(--color-faint)] w-8 flex-shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Mobile thumbnail — only shows when sticky preview is hidden */}
      <div className="lg:hidden w-16 h-12 sm:w-20 sm:h-14 bg-[var(--color-bg-2)] border border-[var(--color-border)] flex-shrink-0 overflow-hidden">
        <img
          src={`/${project.img}`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm md:text-base font-medium transition-colors duration-300 truncate ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] group-hover:text-[var(--color-accent)]'}`}>
          {project.name}
        </div>
        <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-1 truncate">
          {project.categories[0]}
        </div>
      </div>

      {/* Type icon */}
      <span className={`
        text-mono text-[10px] uppercase tracking-widest hidden sm:flex items-center gap-1.5 flex-shrink-0
        transition-colors duration-300
        ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}
      `}>
        {project.linkType === 'game' ? <SiUnity size={12} /> : <FiGithub size={12} />}
        <span>{project.linkType === 'game' ? 'Play' : 'View'}</span>
      </span>
    </motion.div>
  );
}

/* ============================================================
   Lightbox modal
============================================================ */

function Lightbox({ project, onClose }) {
  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[var(--color-bg)]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden flex flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
              Project
            </span>
            <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              {project.categories.join(' · ')}
            </span>
          </div>
          <button
            onClick={onClose}
            data-cursor-hover
            className="p-2 hover:text-[var(--color-accent)] transition-colors"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Image */}
        <div className="relative bg-[var(--color-bg-2)] flex-shrink-0 max-h-[55vh] overflow-hidden">
          <img
            src={`/${project.img}`}
            alt={project.name}
            className="w-full h-full object-contain max-h-[55vh]"
          />
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <h3 className="text-2xl md:text-4xl font-semibold tracking-[-0.02em] mb-3">
            {project.name}
          </h3>
          <p className="text-base md:text-lg text-[var(--color-text-dim)] leading-relaxed mb-6 max-w-2xl">
            {project.description}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-text)] text-[var(--color-bg)] font-medium text-sm hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300"
            >
              <span>{project.linkType === 'game' ? 'Play / Download' : 'View on GitHub'}</span>
              <FiExternalLink size={14} className="group-hover:rotate-45 transition-transform duration-500" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}