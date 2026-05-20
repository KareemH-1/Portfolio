/**
 * Marquee — duplicated content scrolling forever via CSS.
 */
export default function Marquee({ items, speed = 40, reverse = false }) {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

      <div
        className="flex w-max gap-12 will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-mono text-sm uppercase tracking-widest text-[var(--color-text-dim)] flex items-center gap-12 whitespace-nowrap"
          >
            {item}
            <span className="text-[var(--color-accent)]">/</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}