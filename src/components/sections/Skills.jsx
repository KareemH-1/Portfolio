import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "../ui/SplitText";
import SkillSphere from "../three/SkillSphere";
import { skills, skillCategories } from "../../data/skills";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const sortedSkills = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? skills
        : skills.filter((s) => s.categories.includes(activeCategory));
    return [...filtered].sort((a, b) => b.experience - a.experience);
  }, [activeCategory]);

  const matchingCount =
    activeCategory === "All"
      ? skills.length
      : skills.filter((s) => s.categories.includes(activeCategory)).length;

  return (
    <section
      id="skills"
      className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-mono text-xs text-[var(--color-accent)]">
                /03
              </span>
              <span className="eyebrow">Stack</span>
            </div>
            <p className="text-mono text-xs text-[var(--color-muted)] leading-relaxed max-w-xs">
              Filter by category.
              <br />
              Active tools light up.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <SplitText
              text="Tools I reach for, in order of how often I do."
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-4xl"
              stagger={0.04}
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "All"
                ? skills.length
                : skills.filter((s) => s.categories.includes(cat)).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor-hover
                className={`
                  group inline-flex items-center gap-2
                  text-mono text-xs uppercase tracking-widest
                  px-3.5 py-2 border transition-all duration-300
                  ${
                    isActive
                      ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/[0.06]"
                      : "border-[var(--color-border-strong)] text-[var(--color-text-dim)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                  }
                `}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] ${
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-faint)]"
                  }`}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main grid: sphere + list */}
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          {/* SPHERE */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] -mx-4 md:mx-0">
              <SkillSphere skills={skills} activeFilter={activeCategory} />
            </div>
          </div>

          {/* LIST */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow">Index</span>
              <span className="text-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                {matchingCount} of {skills.length} active
              </span>
            </div>

            <div className="border-t border-[var(--color-border)]">
              <AnimatePresence mode="popLayout">
                {sortedSkills.map((skill, i) => (
                  <motion.div
                    key={`${skill.skill}-${i}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.025,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group grid grid-cols-12 items-center gap-3 py-3.5 border-b border-[var(--color-border)] cursor-default"
                  >
                    <span className="col-span-1 text-mono text-[10px] text-[var(--color-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`col-span-4 transition-colors duration-300 ${activeCategory !== 'All' ? 'text-lg font-semibold text-[var(--color-accent)]' : 'text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)]'}`}>
                      {skill.skill}
                    </span>
                    <div className="col-span-5 relative h-px bg-[var(--color-border)]">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.experience / 100 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.1 + i * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                        className={`absolute inset-0 transition-colors duration-300 ${activeCategory !== 'All' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-text-dim)] group-hover:bg-[var(--color-accent)]'}`}
                      />
                    </div>
                    <span className="col-span-2 text-mono text-[10px] uppercase tracking-widest text-right text-[var(--color-muted)]">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
