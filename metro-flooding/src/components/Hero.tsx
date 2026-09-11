import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-bg", { scale: 1.06, duration: 1.8, ease: "power2.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 }, "-=1.4")
        .from(".hero h1", { y: 60, opacity: 0, duration: 1 }, "-=0.7")
        .from(".hero p", { y: 40, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-meta", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
        .from(".scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.3")
        .to(".scroll-hint", {
          y: 12,
          duration: 1.4,
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
          <div className="hero-meta-col">
            <span className="hero-meta-label">Scope</span>
            <span className="hero-meta-value">16 Cities</span>
          </div>
          <div className="hero-meta-col">
            <span className="hero-meta-label">Season</span>
            <span className="hero-meta-value">Jun – Nov</span>
          </div>
          <div className="hero-meta-col">
            <span className="hero-meta-label">Status</span>
            <span className="hero-meta-value">Ongoing</span>
          </div>
        </div>

        <span className="scroll-hint">Scroll ↓</span>
      </div>
    </section>
  );
}
