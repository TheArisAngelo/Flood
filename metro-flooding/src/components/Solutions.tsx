import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Solution = {
  title: string;
  body: string;
};

const SOLUTIONS: Solution[] = [
  {
    title: "Flood Control Projects",
    body: "Government agencies are building pumping stations, retention basins, and upgraded drainage systems across the metro.",
  },
  {
    title: "Community Cleanups",
    body: "Barangay-led initiatives regularly clear esteros and waterways to restore natural water flow.",
  },
  {
    title: "Individual Action",
    body: "Proper waste disposal, reducing single-use plastics, and staying informed all play a part in the bigger picture.",
  },
];

export default function Solutions() {
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

      tl.from(".solutions h2", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      }).from(
        ".solution",
        {
          opacity: 0,
          y: 50,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <section className="solutions" ref={containerRef} id="solutions">
      <h2>How It's Being Addressed</h2>
      <div className="solutions-list">
        {SOLUTIONS.map((solution, i) => (
          <article className="solution" key={i}>
            <h3>{solution.title}</h3>
            <p>{solution.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
