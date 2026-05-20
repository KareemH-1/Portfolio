import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiDownload, FiMaximize2 } from 'react-icons/fi';
import SplitText from '../ui/SplitText';
import { certifications } from '../../data/certifications';

export default function Certifications() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Scroll the track + update active index
  const scrollToIndex = (index) => {
    const clamped = Math.max(0, Math.min(index, certifications.length - 1));
    setActiveIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - 32,
      behavior: 'smooth',
    });
  };

  // Track which card is most centered as the user scrolls
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        let bestIndex = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((card, i) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenter - trackCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIndex = i;
          }
        });
        setActiveIndex(bestIndex);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="certifications" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-mono text-xs text-[var(--color-accent)]">/05</span>
              <span className="eyebrow">Certifications</span>
            </div>
            <p className="text-mono text-xs text-[var(--color-muted)] leading-relaxed max-w-xs">
              Drag horizontally
              <br />
              or use the arrows.
            </p>
          </div>

          <div className="col-span-12 md:col-span-9 flex items-end justify-between gap-6">
            <SplitText
              text="Things I've studied along the way."
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]"
              stagger={0.04}
            />

            {/* Counter + arrows */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-mono text-xs text-[var(--color-muted)] hidden md:inline">
                <span className="text-[var(--color-accent)]">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="text-[var(--color-faint)]"> / {String(certifications.length).padStart(2, '0')}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollToIndex(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  data-cursor-hover
                  className="w-10 h-10 border border-[var(--color-border-strong)] flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous"
                >
                  <FiArrowLeft size={16} />
                </button>
                <button
                  onClick={() => scrollToIndex(activeIndex + 1)}
                  disabled={activeIndex === certifications.length - 1}
                  data-cursor-hover
                  className="w-10 h-10 border border-[var(--color-border-strong)] flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next"
                >
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-px bg-[var(--color-border)] mb-10">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
            animate={{
              width: `${((activeIndex + 1) / certifications.length) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Horizontally scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-6 md:px-12 pb-8 snap-x snap-mandatory cert-track"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE
        }}
      >
        {certifications.map((cert, i) => (
          <CertCard
            key={cert.name}
            cert={cert}
            index={i}
            isActive={i === activeIndex}
            onExpand={() => setLightboxImg(`/${cert.img}`)}
          />
        ))}
        {/* End spacer — gives breathing room when you hit the last card */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>

      {/* Hide scrollbar in Webkit */}
      <style>{`
        .cert-track::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Lightbox for cert image */}
      {lightboxImg && (
        <CertLightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}
    </section>
  );
}

/* ============================================================
   Single certification card
============================================================ */

function CertCard({ cert, index, isActive, onExpand }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className={`
        flex-shrink-0 snap-start
        w-[85vw] md:w-[480px]
        bg-[var(--color-surface)] border
        transition-all duration-500
        ${isActive ? 'border-[var(--color-accent)]/60' : 'border-[var(--color-border)]'}
      `}
    >
      {/* Image */}
      <button
        onClick={onExpand}
        data-cursor-hover
        className="relative w-full aspect-[4/3] bg-[var(--color-bg-2)] overflow-hidden block group"
      >
        <img
          src={`/${cert.img}`}
          alt={cert.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

                {/* Expand button overlay */}
        <span className="absolute top-3 right-3 w-8 h-8 bg-[var(--color-bg)]/70 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiMaximize2 size={12} className="text-white" />
        </span>

        {/* Index in corner */}
        <span className="absolute top-3 left-3 text-mono text-[10px] uppercase tracking-widest text-white/80 mix-blend-difference">
          /{String(index + 1).padStart(2, '0')}
        </span>
      </button>

      {/* Body */}
      <div className="p-5 md:p-6">
        <h3 className="text-base md:text-lg font-medium text-[var(--color-text)] leading-snug mb-2">
          {cert.name}
        </h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5 line-clamp-3">
          {cert.description}
        </p>

        <a
          href={`/${cert.pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group inline-flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors duration-300"
        >
          <FiDownload size={12} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          <span>Download / View</span>
        </a>
      </div>
    </motion.article>
  );
}

/* ============================================================
   Lightbox for cert images
============================================================ */

function CertLightbox({ src, onClose }) {
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
      className="fixed inset-0 z-[100] bg-[var(--color-bg)]/92 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.img
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90vw] max-h-[90vh] object-contain border border-[var(--color-border)] cursor-default"
      />
      <button
        onClick={onClose}
        data-cursor-hover
        className="absolute top-6 right-6 w-10 h-10 border border-[var(--color-border-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center justify-center"
        aria-label="Close"
      >
        ✕
      </button>
    </motion.div>
  );
}