import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { AiFillLinkedin } from "react-icons/ai";
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const [time, setTime] = useState("");

  // Live Cairo time
  useEffect(() => {
    const tick = () => {
      const now = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] mt-12">
      {/* Massive name backdrop — fills the footer like a sign-off */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 overflow-hidden">
        <div
          aria-hidden="true"
          className="text-[18vw] md:text-[14vw] font-semibold tracking-[-0.05em] leading-[0.85] text-[var(--color-text)]/[0.04] select-none pointer-events-none break-words md:whitespace-nowrap"
        >
          KAREEM AHMED
        </div>
        {/* Top row: top section labels */}
        <div className="absolute top-8 left-6 right-6 md:left-12 md:right-12 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
              /∞ End of file
            </span>
          </div>
          <div className="col-span-12 md:col-span-9 flex justify-between items-start">
            <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              Thanks for scrolling.
            </span>
            <button
              onClick={scrollToTop}
              data-cursor-hover
              className="group inline-flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="w-8 h-8 border border-[var(--color-border-strong)] group-hover:border-[var(--color-accent)] flex items-center justify-center transition-colors duration-300">
                <FiArrowUp
                  size={12}
                  className="group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom strip: copyright + time + socials */}
      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4 text-mono text-xs text-[var(--color-muted)]">
          <div>
            © 2026 Kareem Ahmed —{" "}
            <span className="text-[var(--color-text-dim)]">
              Built by hand, scroll by scroll.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Live time */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="uppercase tracking-widest">
                {time} <span className="text-[var(--color-faint)]">/</span>{" "}
                Cairo
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/KareemH-1"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="GitHub"
                className="hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                <SiGithub size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/kareem-ahmed-h/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="LinkedIn"
                className="hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                <AiFillLinkedin size={16} />
              </a>
              <a
                href="mailto:kareem.a.hassan15@gmail.com"
                data-cursor-hover
                aria-label="Email"
                className="hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                <span className="text-xs">@</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
