import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { HERO_META } from "../data/heroMeta";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-bg", { scale: 1.06, duration: 1.8, ease: "power2.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 }, "-=1.4")
        .from(".hero h1", { y: 60, opacity: 0, duration: 1 }, "-=0.7")
        .from(".hero p", { y: 40, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-meta", { opacity: 0, duration: 0.4 }, "-=0.4")
        .from(
          ".hero-meta-col",
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "<",
        )
        .from(".scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.3");

      // Pulse starts after entrance finishes
      gsap.to(".scroll-hint", {
        y: 12,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero-bg-wrap">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=2560&q=85&auto=format&fit=crop)",
          }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">Metro Manila · Flooding</span>
        <h1>Metro Manila Floods. Every Year.</h1>
        <p>
          A look at why the capital region sinks — and what's being done about
          it.
        </p>

        <div className="hero-meta">
          {HERO_META.map((item, i) => (
            <div className="hero-meta-col" key={i}>
              <span className="hero-meta-label">{item.label}</span>
              <span
                className={`hero-meta-value${item.highlight ? " is-highlight" : ""}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <span className="scroll-hint">Scroll ↓</span>
      </div>
    </section>
  );
}
