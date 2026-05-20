import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";
import Marquee from "../ui/Marquee";
import { skillsByExperience } from "../../data/skills";

const techStack = skillsByExperience.slice(0, 14).map((s) => s.skill);

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end pb-12 pt-32 px-6 md:px-12 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-24 md:top-32 left-6 md:left-12 right-6 md:right-12 flex flex-wrap gap-x-6 gap-y-2 justify-between text-mono text-[10px] md:text-xs text-[var(--color-muted)]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse mr-5" />
          <span>Open to opportunities · 2026</span>
        </div>
        <div className="hidden md:block">Giza, EG · GMT+2</div>
        <div className="hidden md:block">Portfolio v2.0</div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto w-full mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-12 h-px bg-[var(--color-accent)]" />
          <span className="eyebrow">Software Engineer · Builder</span>
        </motion.div>

        {/* Massive name + role */}
        <h1 className="font-semibold tracking-[-0.04em] leading-[0.88]">
          <SplitText
            text="Kareem"
            as="span"
            className="block text-[clamp(3rem,14vw,12rem)] text-[var(--color-text)]"
            delay={0.5}
          />
          <SplitText
            text="Ahmed."
            as="span"
            className="block text-[clamp(3rem,14vw,12rem)] text-[var(--color-text)]"
            delay={0.7}
          />
        </h1>

        {/* Role tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-text-dim)]"
        >
          I design and build{" "}
          <span className="font-serif-italic text-[var(--color-text)]">
            fast, scalable
          </span>{" "}
          software — from web apps and data pipelines to the occasional game.
          Currently studying CS at MSA University and interning frontend at
          Elevvo.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4"
        >
          <a
            href="#work"
            data-cursor-hover
            className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 bg-[var(--color-text)] text-[var(--color-bg)] font-medium text-sm overflow-hidden"
          >
            <span className="relative z-10">View selected work</span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 bg-[var(--color-accent)] -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0" />
          </a>

          <a
            href="/assets/KareemAhmed_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group inline-flex items-center justify-center gap-3 px-7 py-4 border border-[var(--color-border-strong)] text-sm font-medium hover:border-[var(--color-text)] transition-colors"
          >
            <span>Download CV</span>
            <span className="text-[var(--color-accent)] transition-transform duration-500 group-hover:rotate-45">
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* Bottom row — tech marquee + scroll indicator */}
      <div className="mt-24 md:mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="border-t border-[var(--color-border)] pt-6"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="eyebrow">Stack · 2026</span>
            <span className="text-mono text-xs text-[var(--color-muted)]">
              {techStack.length} of {skillsByExperience.length} tools
            </span>
          </div>
          <Marquee items={techStack} speed={45} />
        </motion.div>
      </div>

      {/* Scroll indicator (bottom-right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="w-px h-12 bg-[var(--color-border-strong)] relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-accent)] animate-[scrollIndicator_2s_ease-in-out_infinite]" />
        </span>
      </motion.div>

      <style>{`
        @keyframes scrollIndicator {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
