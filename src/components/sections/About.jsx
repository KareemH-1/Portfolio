import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { AiFillLinkedin } from 'react-icons/ai';
import { FiArrowUpRight, FiFileText } from 'react-icons/fi';
import Counter from '../ui/Counter';
import SplitText from '../ui/SplitText';
import { languages } from '../../data/skills';
import { projectsTimeline } from '../../data/projectsTimeline';

export default function About() {
  return (
    <section id="about" className="relative min-h-screen px-6 md:px-12 py-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="text-mono text-xs text-[var(--color-accent)]">/01</span>
              <span className="eyebrow">About</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <SplitText
              text="A software engineer who likes building things that actually work."
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-4xl"
              stagger={0.04}
            />
          </div>
        </div>

        {/* ============== ROW 1: Identity Card + Bio ============== */}
        <div className="grid grid-cols-12 gap-4 md:gap-5 mb-4 md:mb-5">
          {/* IDENTITY CARD (replaces photo) */}
          <BentoCard className="col-span-12 md:col-span-5 p-0 overflow-hidden">
            <IdentityCard />
          </BentoCard>

          {/* BIO */}
          <BentoCard className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-4">
              /// the story
            </div>
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-dim)]">
              I'm a CS student at MSA University with a habit of getting curious about
              <span className="text-[var(--color-text)] font-serif-italic"> too many things at once</span> —
              web apps, data pipelines, AI, and the occasional Unity game. I care about software that's{' '}
              <span className="text-[var(--color-text)]">fast, readable,</span> and{' '}
              <span className="text-[var(--color-text)]">does what it says.</span>
            </p>
            <p className="text-sm md:text-base leading-relaxed text-[var(--color-muted)] mt-4">
              Right now I'm deep into data engineering and sharpening my fundamentals — every project here is something I built to learn, not to ship.
            </p>
          </BentoCard>
        </div>

        {/* ============== ROW 2: Stats strip ============== */}
        <div className="grid grid-cols-12 gap-4 md:gap-5 mb-4 md:mb-5">
          {/* GPA */}
          <BentoCard className="col-span-6 md:col-span-2">
            <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-2">
              GPA
            </div>
            <div className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--color-text)]">
              <Counter value={3.83} decimals={2} />
            </div>
            <div className="text-mono text-xs text-[var(--color-faint)] mt-1">/ 4.00</div>
          </BentoCard>

          {/* PROJECTS */}
          <BentoCard className="col-span-6 md:col-span-2">
            <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-2">
              Projects
            </div>
            <div className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--color-text)]">
              <Counter value={projectsTimeline.length} />
            </div>
            <div className="text-mono text-xs text-[var(--color-faint)] mt-1">built / learning</div>
          </BentoCard>

          {/* LANGUAGES */}
          <BentoCard className="col-span-12 md:col-span-3">
            <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-2 flex items-center justify-between">
              <span>Languages</span>
              <span className="text-[var(--color-accent)]">{languages.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span
                  key={lang.skill}
                  title={lang.level}
                  className="text-mono text-xs px-2 py-1 border border-[var(--color-border-strong)] text-[var(--color-text-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {lang.skill}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* LINKS */}
          <BentoCard className="col-span-12 md:col-span-5 p-0 overflow-hidden">
            <div className="grid grid-cols-3 h-full">
              <LinkTile href="https://github.com/KareemH-1" icon={<SiGithub size={20} />} label="GitHub" />
              <LinkTile href="https://www.linkedin.com/in/kareem-ahmed-h/" icon={<AiFillLinkedin size={22} />} label="LinkedIn" middle />
              <LinkTile href="/assets/KareemAhmed_CV.pdf" icon={<FiFileText size={20} strokeWidth={1.5} />} label="CV" />
            </div>
          </BentoCard>
        </div>

        {/* ============== ROW 3: Now strip ============== */}
        <BentoCard className="col-span-12 group">
          <div className="flex items-start justify-between gap-4 h-full">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-ping opacity-60" />
                  <span className="relative w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                </span>
                <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)]">
                  What I'm on now
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-[var(--color-text)] leading-snug">
                Microsoft Data Engineer Track @ DEPI{' '}
                <span className="font-serif-italic text-[var(--color-text-dim)]">
                  — building toward AI &amp; data science.
                </span>
              </h3>
              <p className="text-sm text-[var(--color-muted)] mt-3 max-w-2xl">
                Previously: frontend internship at Elevvo Pathways (Feb–Mar 2026).
              </p>
            </div>
            <FiArrowUpRight
              size={32}
              className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:rotate-45 transition-all duration-500 flex-shrink-0"
              strokeWidth={1.5}
            />
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

/* ============================================================
   IDENTITY CARD — typographic alternative to a photo.
   No image needed. Looks like a designed object, not a missing photo.
============================================================ */

function IdentityCard() {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-7 overflow-hidden bg-[var(--color-bg-2)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/assets/Picture2.jpg')" }}
      />
      <div className="absolute inset-0 bg-[var(--color-bg-2)]/55" />

      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-r border-white/[0.03] col-start-auto" />
        ))}
      </div>

      {/* Top metadata row */}
      <div className="relative flex items-start justify-between text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span>ID </span>
        </div>
        <div className="text-right leading-relaxed">
          GIZA <span className="text-[var(--color-faint)]">/</span> EG
          <br />
          UTC+02:00
        </div>
      </div>

      {/* Big monogram + name treatment */}
      <div className="relative">
        {/* Huge initials backdrop */}
        <div className="absolute -bottom-4 -left-2 text-[7rem] md:text-[8.5rem] font-semibold leading-none tracking-[-0.06em] text-[var(--color-text)]/[0.06] select-none pointer-events-none">
          KA
        </div>

        <div className="relative">
          <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)] mb-2">
            // Identity
          </div>
          <div className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] leading-[1.05]">
            Kareem
            <br />
            <span className="font-serif-italic font-normal text-[var(--color-text-dim)]">Ahmed</span>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative flex items-end justify-between text-mono text-[10px] uppercase tracking-widest pt-6 border-t border-[var(--color-border)]">
        <div>
          <div className="text-[var(--color-muted)] mb-1">Data Engineer</div>
          <div className="text-[var(--color-text)]">Software Engineer</div>
        </div>
        <div className="text-right">
          <div className="text-[var(--color-muted)] mb-1">CS Student</div>
          <div className="text-[var(--color-text)]">2024 — 2028</div>
        </div>
      </div>
    </div>
  );
}


function BentoCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative bg-[var(--color-surface)] border border-[var(--color-border)]
        p-6 md:p-7
        hover:border-[var(--color-border-strong)] transition-colors duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

function LinkTile({ href, icon, label, middle = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className={`
        group relative flex flex-col items-center justify-center gap-2 py-8 px-2
        text-[var(--color-text-dim)] hover:text-[var(--color-accent)]
        transition-colors duration-300
        ${middle ? 'border-x border-[var(--color-border)]' : ''}
      `}
    >
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
        {icon}
      </div>
      <span className="text-mono text-[10px] uppercase tracking-widest">{label}</span>
      <FiArrowUpRight
        size={11}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </a>
  );
}