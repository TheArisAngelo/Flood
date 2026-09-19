import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionEyebrow from "./SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

type Cause = {
  title: string;
  body: string;
};

const CAUSES: Cause[] = [
  {
    title: "Clogged Waterways",
    body: "Esteros and canals that once carried water away are blocked by years of accumulated waste and silt.",
  },
  {
    title: "Illegal Dumping",
    body: "Plastic and household waste end up in drainage systems, choking the infrastructure meant to protect the city.",
  },
  {
    title: "Aging Infrastructure",
    body: "Much of the drainage network was built decades ago and was never designed for today's population density.",
  },
  {
    title: "Land Subsidence",
    body: "Groundwater extraction is causing parts of Metro Manila to literally sink, making flooding worse each year.",
  },
];

export default function Causes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const causes = gsap.utils.toArray<HTMLElement>(".cause");
      const dots = gsap.utils.toArray<HTMLElement>(".cause-dot");

      gsap.set(causes, { autoAlpha: 0, y: 40 });
      gsap.set(causes[0], { autoAlpha: 1, y: 0 });
      gsap.set(dots, { scale: 0.6, backgroundColor: "#55556A" });
      gsap.set(dots[0], { scale: 1, backgroundColor: "#A78BFA" });

      // === Header entrance (plays as the section scrolls into view) ===
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      headerTl
        .from(".causes .section-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".causes h2",
          { opacity: 0, y: 30, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        );

      // === Pinned cause-cycling timeline (unchanged) ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${CAUSES.length * 75}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      causes.forEach((cause, i) => {
        if (i === 0) return;

        tl.to(causes[i - 1], { autoAlpha: 0, y: -40, duration: 1 })
          .to(cause, { autoAlpha: 1, y: 0, duration: 1 }, "<")
          .to(
            dots[i - 1],
            { scale: 0.6, backgroundColor: "#55556A", duration: 1 },
            "<",
          )
          .to(
            dots[i],
            { scale: 1, backgroundColor: "#A78BFA", duration: 1 },
            "<",
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="causes" ref={containerRef} id="causes">
      <SectionEyebrow number="02" label="Root Causes" />
      <h2>Why It Happens</h2>
      <div className="causes-stage">
        {CAUSES.map((cause, i) => (
          <article className="cause" key={i}>
            <span className="cause-index">
              {String(i + 1).padStart(2, "0")} /{" "}
              {String(CAUSES.length).padStart(2, "0")}
            </span>
            <h3>{cause.title}</h3>
            <p>{cause.body}</p>
          </article>
        ))}
      </div>
      <div className="cause-dots" aria-hidden="true">
        {CAUSES.map((_, i) => (
          <span className="cause-dot" key={i} />
        ))}
      </div>
    </section>
  );
}
