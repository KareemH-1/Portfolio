import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import SplitText from '../ui/SplitText';
import { timeline } from '../../data/eeducation';

export default function Journey() {
  const containerRef = useRef(null);

  // Track scroll progress through the section so the spine draws in
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });
  
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative px-6 md:px-12 py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-mono text-xs text-[var(--color-accent)]">/02</span>
              <span className="eyebrow">Journey</span>
            </div>
            <p className="text-mono text-xs text-[var(--color-muted)] leading-relaxed max-w-xs">
              Education + work
              <br />
              Newest entries first.
            </p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <SplitText
              text="The road that got me here, still getting paved."
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-4xl"
              stagger={0.04}
            />
          </div>
        </div>

        <div className="relative pl-8 md:pl-0">
          <div
            className="absolute left-3 md:left-[calc(25%-1px)] top-2 bottom-2 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <motion.div
            style={{ scaleY: spineScale, transformOrigin: 'top' }}
            className="absolute left-3 md:left-[calc(25%-1px)] top-2 bottom-2 w-px bg-[var(--color-accent)]"
            aria-hidden="true"
          />

          {timeline.map((entry, i) => (
            <TimelineItem key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}


function TimelineItem({ entry, index }) {
  const { kind, status, title, org, period, location, description, tags } = entry;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 py-10 md:py-12 border-b border-[var(--color-border)] last:border-b-0 group"
    >

      <div className="md:col-span-1 md:text-right md:pr-12 relative">
        {/* Marker — sits on the spine */}
        <Marker kind={kind} status={status} />

        <div className="text-mono text-xs uppercase tracking-widest text-[var(--color-text)] mb-2">
          {period}
        </div>

        <div className="inline-flex items-center gap-1.5 mb-3">
          <span
            className={`text-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border ${
              kind === 'education'
                ? 'border-[var(--color-border-strong)] text-[var(--color-text-dim)]'
                : 'border-[var(--color-accent)]/40 text-[var(--color-accent)]'
            }`}
          >
            {kind}
          </span>
          {status === 'in-progress' && (
            <span className="text-mono text-[9px] uppercase tracking-widest text-[var(--color-text-dim)]">
              · ongoing
            </span>
          )}
        </div>

        <div className="text-mono text-[11px] text-[var(--color-muted)] flex items-center gap-1.5 md:justify-end">
          <FiMapPin size={10} />
          {location}
        </div>
      </div>

      <div className="md:col-span-3 md:pl-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)] leading-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-500">
          {title}
        </h3>
        <p className="text-base md:text-lg font-serif-italic text-[var(--color-text-dim)] mb-5">
          {org}
        </p>
        <p className="text-sm md:text-base leading-relaxed text-[var(--color-muted)] max-w-2xl mb-5">
          {description}
        </p>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Marker({ kind, status }) {
  const isExp = kind === 'experience';
  const inProgress = status === 'in-progress';

  return (
    <span
      className="absolute left-[-22px] md:left-auto md:right-[-7px] top-1.5 z-10"
      aria-hidden="true"
    >
      {inProgress && (
        <span className="absolute inset-0 -m-1 rounded-full bg-[var(--color-accent)]/30 animate-ping" />
      )}

      <span
        className={`
          relative block w-3 h-3 bg-[var(--color-bg)]
          ${isExp ? 'rounded-full' : ''}
          ${
            inProgress
              ? 'border-2 border-[var(--color-accent)] bg-[var(--color-accent)]'
              : 'border-2 border-[var(--color-border-strong)]'
          }
        `}
      />
    </span>
  );
}