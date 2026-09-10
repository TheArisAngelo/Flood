import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  { value: 20, suffix: "", label: "Typhoons hit the Philippines each year" },
  {
    value: 3.5,
    suffix: "M",
    decimals: 1,
    label: "Residents affected by flooding annually",
  },
  {
    value: 40,
    prefix: "₱",
    suffix: "B",
    label: "In annual flood-related damages",
  },
  { value: 65, suffix: "%", label: "Of Metro Manila is flood-prone" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");

      numbers.forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";

        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
          },
        });
      });

      // Fade the labels in slightly after the numbers start
      gsap.from(".stat-label", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="stats" ref={containerRef} id="stats">
      <h2>By the Numbers</h2>
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div className="stat" key={i}>
            <span
              className="stat-number"
              data-value={stat.value}
              data-decimals={stat.decimals ?? 0}
              data-prefix={stat.prefix ?? ""}
              data-suffix={stat.suffix ?? ""}
            >
              0
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
