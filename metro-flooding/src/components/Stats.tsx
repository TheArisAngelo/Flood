import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionEyebrow from "./SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  {
    value: 20,
    suffix: "",
    label: "Tropical cyclones enter Philippine waters each year",
  },
  {
    value: 8.1,
    suffix: "M",
    decimals: 1,
    label: "Affected by the August 2026 monsoon floods",
  },
  {
    value: 12.8,
    prefix: "₱",
    suffix: "B",
    decimals: 1,
    label: "Average annual flood damage, 1990–2012",
  },
  {
    value: 80,
    suffix: "%",
    label: "Of Manila residents live in flood-prone zones",
  },
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
      <SectionEyebrow number="01" label="Context" />
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
      <p className="stats-source">
        Sources: PAGASA · NDRRMC · OCD-NDRRMC · Earth Journalism Network
      </p>
    </section>
  );
}
