import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Impact = {
  src: string;
  alt: string;
  caption: string;
};

const IMPACTS: Impact[] = [
  {
    src: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=1200&q=80&auto=format&fit=crop",
    alt: "Flooded street",
    caption: "Flooded streets during the rainy season",
  },
  {
    src: "https://images.unsplash.com/photo-1495556650867-99590cea3657?w=1200&q=80&auto=format&fit=crop",
    alt: "Waterlogged road",
    caption: "Commuters stranded on impassable roads",
  },
  {
    src: "https://images.unsplash.com/photo-1641648538190-7ba0824f3f66?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Flooded homes",
    caption: "Families displaced from their homes",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80&auto=format&fit=crop",
    alt: "Community cleanup",
    caption: "Communities cleaning up after the water recedes",
  },
];

export default function Impact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".impact-item");

      items.forEach((item, i) => {
        const img = item.querySelector("img");
        const caption = item.querySelector("figcaption");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });

        tl.from(item, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          delay: (i % 2) * 0.15, // slight offset for right-column items
        })
          .from(
            img,
            {
              scale: 1.15,
              duration: 1.4,
              ease: "power2.out",
            },
            "<",
          )
          .from(
            caption,
            {
              opacity: 0,
              y: 10,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.6",
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="impact" ref={containerRef} id="impact">
      <h2>What It Looks Like</h2>
      <div className="impact-grid">
        {IMPACTS.map((item, i) => (
          <figure className="impact-item" key={i}>
            <div className="impact-img-wrap">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
