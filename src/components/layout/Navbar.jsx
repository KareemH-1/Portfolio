import { useEffect, useState } from "react";
import { motion , AnimatePresence} from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

// Per-letter animated wordmark.
// On group-hover, each letter lifts up and back down with a stagger.
function Wordmark({ text, delayOffset = 0 }) {
  return (
    <span className="inline-flex overflow-hidden leading-[1.1]">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative inline-block"
          style={{
            transitionDelay: `${(i + delayOffset) * 22}ms`,
          }}
        >
          {/* Letter that lives at rest */}
          <span
            className="inline-block text-sm font-semibold tracking-tight transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${(i + delayOffset) * 22}ms` }}
          >
            {char}
          </span>
          {/* Duplicate letter that slides in from below on hover */}
          <span
            className="absolute left-0 top-0 inline-block text-sm font-semibold tracking-tight text-[var(--color-accent)] translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${(i + delayOffset) * 22}ms` }}
            aria-hidden="true"
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

const links = [
  { label: 'Index', sectionId: 'home', num: '00' },
  { label: 'About', sectionId: 'about', num: '01' },
  { label: 'Journey', sectionId: 'journey', num: '02' },
  { label: 'Skills', sectionId: 'skills', num: '03' },
  { label: 'Work', sectionId: 'work', num: '04' },
  { label: 'Certifications', sectionId: 'certifications', num: '05' },
  { label: 'Contact', sectionId: 'contact', num: '06' },
];

export default function Navbar() {
  const location = useLocation();
  const isTimeline = location.pathname === '/timeline';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -20 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSectionNav = (sectionId) => {
    setOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--color-bg)]/70 backdrop-blur-xl border-b border-[var(--color-border)]"
            : "py-6"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          {/* Logo — minimalist monogram */}
          {/* Logo — full wordmark with letter-by-letter hover animation */}
          {isTimeline ? (
            <Link
              to="/"
              className="group relative flex items-center gap-2.5"
              data-cursor-hover
              aria-label="Back to portfolio"
            >
              <span className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inset-0 bg-[var(--color-accent)] rounded-full" />
                <span className="absolute inset-0 bg-[var(--color-accent)] rounded-full animate-ping opacity-60" />
              </span>

              <span className="relative flex items-baseline">
                <Wordmark text="Portfolio" />
                <span className="ml-1.5 text-[10px] text-[var(--color-accent)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 self-start mt-0.5">
                  ↗
                </span>
              </span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handleSectionNav('home')}
              className="group relative flex items-center gap-2.5"
              data-cursor-hover
              aria-label="Kareem Ahmed — Home"
            >
              <span className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inset-0 bg-[var(--color-accent)] rounded-full" />
                <span className="absolute inset-0 bg-[var(--color-accent)] rounded-full animate-ping opacity-60" />
              </span>

              <span className="relative flex items-baseline">
                <Wordmark text="Kareem" />
                <span className="w-[0.35em]" />
                <Wordmark text="Ahmed" delayOffset={6} />
                <span className="ml-1.5 text-[10px] text-[var(--color-accent)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 self-start mt-0.5">
                  ↗
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
            </button>
          )}

          {/* Desktop links */}
          {!isTimeline ? (
            <ul className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <li key={link.sectionId}>
                  <button
                    type="button"
                    onClick={() => handleSectionNav(link.sectionId)}
                    className="group flex items-center gap-1.5 px-3 py-2 text-sm transition-colors hover:text-[var(--color-accent)]"
                    data-cursor-hover
                  >
                    <span className="text-mono text-[10px] text-[var(--color-faint)] group-hover:text-[var(--color-accent)] transition-colors">
                      {link.num}
                    </span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                Timeline view
              </span>
              <Link
                to="/"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border-strong)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all"
              >
                <span>Back to portfolio</span>
              </Link>
            </div>
          )}

          {/* CTA */}
          {!isTimeline && (
            <button
              type="button"
              onClick={() => handleSectionNav('contact')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border-strong)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all"
              data-cursor-hover
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Available
            </button>
          )}

          {/* Mobile burger */}
          {!isTimeline && (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
              data-cursor-hover
            >
              <span
                className={`block w-6 h-px bg-[var(--color-text)] transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block w-6 h-px bg-[var(--color-text)] transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-px bg-[var(--color-text)] transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </button>
          )}
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && !isTimeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col h-full justify-center items-start gap-2 px-10">
              {links.map((link, i) => (
                <motion.li
                  key={link.sectionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => handleSectionNav(link.sectionId)}
                    className="flex items-baseline gap-3 text-5xl font-serif-italic"
                  >
                    <span className="text-mono text-xs not-italic text-[var(--color-accent)]">
                      {link.num}
                    </span>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
