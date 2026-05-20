import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiGithub,
  FiX,
  FiChevronDown,
  FiAward,
} from 'react-icons/fi';
import { SiUnity } from 'react-icons/si';
import {
  sortedTimeline,
  timelineByYear,
  timelineCategories,
  milestoneCount,
  yearCount,
  formatProjectDate,
  formatShortDate,
} from '../data/projectsTimeline';
import SplitText from '../components/ui/SplitText';

export default function Timeline() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);

  // Page-wide scroll progress for the top bar
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Filter
  const filteredYears = useMemo(() => {
    if (activeCategory === 'All') return timelineByYear;
    return timelineByYear
      .map(({ year, projects }) => ({
        year,
        projects: projects.filter((p) => p.categories?.includes(activeCategory)),
      }))
      .filter(({ projects }) => projects.length > 0);
  }, [activeCategory]);

  const totalFiltered = filteredYears.reduce((sum, y) => sum + y.projects.length, 0);

  return (
    <main ref={containerRef} className="relative min-h-screen pb-24">
      {/* Top scroll progress bar */}
      <motion.div
        style={{ scaleX: progressX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-px bg-[var(--color-accent)] z-50"
      />

      {/* Hero */}
      <header className="px-6 md:px-12 pt-32 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb back */}
          <Link
            to="/"
            data-cursor-hover
            className="group inline-flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 mb-12"
          >
            <FiArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to portfolio</span>
          </Link>

          {/* Header */}
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-mono text-xs text-[var(--color-accent)]">/timeline</span>
                <span className="eyebrow">Full archive</span>
              </div>
              <p className="text-mono text-xs text-[var(--color-muted)] leading-relaxed max-w-xs">
                Every project I've built,
                <br />
                in chronological order.
              </p>
            </div>

            <div className="col-span-12 md:col-span-9">
              <SplitText
                text="The receipts."
                as="h1"
                className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]"
                stagger={0.04}
              />
              <p className="font-serif-italic text-2xl md:text-3xl text-[var(--color-text-dim)] mt-4">
                Every step, every project, every milestone.
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
            <Stat label="Total projects" value={sortedTimeline.length} />
            <Stat label="Years active" value={yearCount} />
            <Stat label="Milestones" value={milestoneCount} />
          </div>
        </div>
      </header>

      {/* Filter chips */}
      <div className="sticky top-16 z-30 bg-[var(--color-bg)]/85 backdrop-blur-md border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {timelineCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-cursor-hover
                  className={`
                    text-mono text-xs uppercase tracking-widest
                    px-3 py-1.5 border transition-all duration-300 flex-shrink-0
                    ${
                      isActive
                        ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/[0.06]'
                        : 'border-[var(--color-border-strong)] text-[var(--color-text-dim)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]'
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline body */}
      <div className="px-6 md:px-12 pt-12">
        <div className="max-w-[1400px] mx-auto">
          {totalFiltered === 0 ? (
            <div className="py-32 text-center">
              <p className="text-mono text-sm text-[var(--color-muted)]">
                No projects match this filter.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredYears.map(({ year, projects }) => (
                <YearBlock
                  key={year}
                  year={year}
                  projects={projects}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   STAT cell in the hero strip
============================================================ */
function Stat({ label, value }) {
  return (
    <div className="bg-[var(--color-bg)] p-5 md:p-7">
      <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-2">
        {label}
      </div>
      <div className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--color-text)]">
        {value}
      </div>
    </div>
  );
}

/* ============================================================
   Year block — sticky year label + projects for that year
============================================================ */
function YearBlock({ year, projects, expandedId, setExpandedId }) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-12 gap-4 md:gap-12 pb-16"
    >
      {/* === Sticky year label === */}
      <aside className="col-span-12 md:col-span-3">
        <div className="md:sticky md:top-32">
          <div className="flex md:block items-baseline gap-3 mb-3 md:mb-0">
            <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)] mb-0 md:mb-2">
              Year
            </div>
            <div className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-[var(--color-text)] leading-none">
              {year}
            </div>
          </div>
          <div className="text-mono text-xs text-[var(--color-muted)] mt-2 md:mt-3">
            {projects.length} project{projects.length === 1 ? '' : 's'}
          </div>
        </div>
      </aside>

      {/* === Project list with vertical spine === */}
      <div className="col-span-12 md:col-span-9 relative">
        {/* Spine */}
        <div
          className="absolute left-3 top-3 bottom-3 w-px bg-[var(--color-border)]"
          aria-hidden="true"
        />

        {projects.map((project, i) => (
          <TimelineProject
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
            index={i}
          />
        ))}
      </div>
    </motion.section>
  );
}

/* ============================================================
   Single project entry on the timeline
============================================================ */
function TimelineProject({ project, isExpanded, onToggle, index }) {
  const isMilestone = !!project.dateNote;
  const hasLink = !!project.link;
  const linkLabel = project.linkType === 'game' ? 'Play / Download' : 'View on GitHub';
  const LinkIcon = project.linkType === 'game' ? SiUnity : FiGithub;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 pb-6 last:pb-0 group"
    >
      {/* Marker on spine */}
      <span
        className={`
          absolute left-[6px] top-3 w-[14px] h-[14px] -translate-x-1/2 z-10
          border-2 transition-all duration-300
          ${
            isMilestone
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] rounded-full'
              : 'border-[var(--color-border-strong)] bg-[var(--color-bg)]'
          }
          ${isExpanded ? 'scale-125' : ''}
        `}
        aria-hidden="true"
      >
        {isMilestone && (
          <span className="absolute inset-0 -m-1 rounded-full bg-[var(--color-accent)]/30 animate-ping" />
        )}
      </span>

      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        data-cursor-hover
        className="w-full text-left flex items-start justify-between gap-4 py-2"
      >
        <div className="flex-1 min-w-0">
          {/* Date + milestone tag */}
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              {formatShortDate(project.date)}
            </span>
            {isMilestone && (
              <span className="inline-flex items-center gap-1 text-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                <FiAward size={10} />
                Milestone
              </span>
            )}
          </div>

          {/* Project name */}
          <h3 className={`
            text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-tight transition-colors duration-300
            ${isExpanded ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] group-hover:text-[var(--color-accent)]'}
          `}>
            {project.name}
          </h3>

          {/* Date note (milestone subtitle) */}
          {project.dateNote && (
            <p className="text-sm font-serif-italic text-[var(--color-text-dim)] mt-1.5">
              {project.dateNote}
            </p>
          )}
        </div>

        {/* Expand icon */}
        <FiChevronDown
          size={20}
          className={`flex-shrink-0 mt-2 text-[var(--color-muted)] transition-transform duration-500 ${
            isExpanded ? 'rotate-180 text-[var(--color-accent)]' : ''
          }`}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-5 pt-5">
              {/* Image */}
              {project.image && (
                <div className="col-span-12 md:col-span-5">
                  <div className="relative aspect-[4/3] bg-[var(--color-bg-2)] border border-[var(--color-border)] overflow-hidden">
                    <img
                      src={project.image.replace('../', '/')}
                      alt={project.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Details */}
              <div className={project.image ? 'col-span-12 md:col-span-7' : 'col-span-12'}>
                <p className="text-sm md:text-base text-[var(--color-text-dim)] leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.categories?.map((cat) => (
                    <span
                      key={cat}
                      className="text-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-[var(--color-border-strong)] text-[var(--color-text-dim)]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Full date */}
                <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-faint)] mb-5">
                  {formatProjectDate(project.date)}
                </div>

                {/* Link */}
                {hasLink && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="group/link inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-text)] text-[var(--color-bg)] text-sm font-medium hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300"
                  >
                    <LinkIcon size={14} />
                    <span>{linkLabel}</span>
                    <FiArrowUpRight size={12} className="group-hover/link:rotate-45 transition-transform duration-500" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}