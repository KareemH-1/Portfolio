import { motion } from "framer-motion";
import { useState } from "react";
import { SiGithub } from "react-icons/si";
import { AiFillLinkedin } from "react-icons/ai";
import {
  FiMail,
  FiPhone,
  FiArrowUpRight,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import SplitText from "../ui/SplitText";

const EMAIL = "kareem.a.hassan15@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-mono text-xs text-[var(--color-accent)]">
                /06
              </span>
              <span className="eyebrow">Contact</span>
            </div>
            <p className="text-mono text-xs text-[var(--color-muted)] leading-relaxed max-w-xs">
              Internships, freelance work, or just to chat about a project.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <SplitText
              text="Got something to build?"
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-4xl"
              stagger={0.04}
            />
          </div>
        </div>

        {/* Big email — the focal point */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-[var(--color-border)] py-10 md:py-16 mb-12"
        >
          <a href={`mailto:${EMAIL}`} data-cursor-hover className="group block">
            <div className="text-mono text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4">
              [ tap to send mail ]
            </div>
            <div className="flex items-baseline gap-3 md:gap-6 flex-wrap">
              <span className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.03em] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-500 break-words">
                {EMAIL}
              </span>
              <FiArrowUpRight
                size={48}
                className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:rotate-45 transition-all duration-500 flex-shrink-0 hidden md:block"
                strokeWidth={1.5}
              />
            </div>
          </a>

          {/* Copy button */}
          <button
            onClick={copyEmail}
            data-cursor-hover
            className="mt-6 inline-flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            {copied ? (
              <>
                <FiCheck size={12} className="text-[var(--color-accent)]" />
                <span className="text-[var(--color-accent)]">
                  Copied to clipboard
                </span>
              </>
            ) : (
              <>
                <FiCopy size={12} />
                <span>Copy email</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Other contact channels */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          <ChannelCard
            href="https://github.com/KareemH-1"
            icon={<SiGithub size={22} />}
            label="GitHub"
            handle="@KareemH-1"
            note="Code, projects, contribution graph"
          />
          <ChannelCard
            href="https://www.linkedin.com/in/kareem-ahmed-h/"
            icon={<AiFillLinkedin size={26} />}
            label="LinkedIn"
            handle="kareem-ahmed-h"
            note="Professional profile, opportunities"
          />
          <ChannelCard
            href="tel:+201211125898"
            icon={<FiPhone size={20} />}
            label="Phone"
            handle="+20 121 112 5898"
            note="GMT+2 (Cairo) · 10am — 9pm preferred"
          />
        </div>

        {/* Status line */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 text-mono text-xs text-[var(--color-text-dim)]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="uppercase tracking-widest">
              Currently open to opportunities
            </span>
          </div>
          <div className="text-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
            Giza, EG · GMT+02:00
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ href, icon, label, handle, note }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-hover
      className="group col-span-12 md:col-span-4 relative bg-[var(--color-surface)] border border-[var(--color-border)] p-6 hover:border-[var(--color-accent)]/60 transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {icon}
        </div>
        <FiArrowUpRight
          size={20}
          className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:rotate-45 transition-all duration-500"
          strokeWidth={1.5}
        />
      </div>

      <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">
        {label}
      </div>
      <div className="text-base md:text-lg font-medium text-[var(--color-text)] mb-2 break-all">
        {handle}
      </div>
      <div className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-faint)] leading-relaxed">
        {note}
      </div>
    </motion.a>
  );
}
