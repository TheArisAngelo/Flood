import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionEyebrow from "./SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

const ACTIONS = [
  "Dispose of waste properly — never in canals or streets.",
  "Support or join local clean-up drives in your barangay.",
  "Stay informed about flood advisories and drainage projects.",
  "Reduce single-use plastics in your daily routine.",
];

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(".cta h2", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".cta-list li",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".cta-closing",
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <section className="cta" ref={containerRef} id="cta">
      <SectionEyebrow number="05" label="Call to Action" />
      <h2>What You Can Do</h2>
      <ul className="cta-list">
        {ACTIONS.map((action, i) => (
          <li key={i}>{action}</li>
        ))}
      </ul>
      <p className="cta-closing">
        Flooding isn't just a weather problem. It's a shared responsibility.
      </p>
    </section>
  );
}
