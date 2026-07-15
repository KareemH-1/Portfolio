import { useEffect, useState } from "react";
import { motion , AnimatePresence} from "framer-motion";
import { useLocation } from 'react-router-dom';

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
  { label: 'Index',          href: '#home',           num: '00' },
  { label: 'About',          href: '#about',          num: '01' },
  { label: 'Journey',        href: '#journey',        num: '02' },
  { label: 'Skills',         href: '#skills',         num: '03' },
  { label: 'Work',           href: '#work',           num: '04' },
  { label: 'Certifications', href: '#certifications', num: '05' },
  { label: 'Contact',        href: '#contact',        num: '06' },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -20 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    try {
      window.history.pushState({}, '', href);
    } catch (err) {
      // fallback: set hash (safer for some environments)
      window.location.hash = href;
    }
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
          <a
            href="#home"
            onClick={(e) => handleNav(e, "#home")}
            className="group relative flex items-center gap-2.5"
            data-cursor-hover
            aria-label="Kareem Ahmed — Home"
          >
            {/* Tiny coral accent dot */}
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inset-0 bg-[var(--color-accent)] rounded-full" />
              <span className="absolute inset-0 bg-[var(--color-accent)] rounded-full animate-ping opacity-60" />
            </span>

            {/* Wordmark with per-letter animation */}
            <span className="relative flex items-baseline">
              <Wordmark text="Kareem" />
              <span className="w-[0.35em]" /> {/* spacer */}
              <Wordmark text="Ahmed" delayOffset={6} />
              {/* Tiny arrow that appears on hover */}
              <span className="ml-1.5 text-[10px] text-[var(--color-accent)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 self-start mt-0.5">
                ↗
              </span>
              {/* Coral underline that draws in */}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="group flex items-center gap-1.5 px-3 py-2 text-sm transition-colors hover:text-[var(--color-accent)]"
                  data-cursor-hover
                >
                  <span className="text-mono text-[10px] text-[var(--color-faint)] group-hover:text-[var(--color-accent)] transition-colors">
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border-strong)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all"
            data-cursor-hover
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Available
          </a>

          {/* Mobile burger */}
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
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col h-full justify-center items-start gap-2 px-10">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="flex items-baseline gap-3 text-5xl font-serif-italic"
                  >
                    <span className="text-mono text-xs not-italic text-[var(--color-accent)]">
                      {link.num}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
