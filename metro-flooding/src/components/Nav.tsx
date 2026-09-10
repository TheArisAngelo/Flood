import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Problem", href: "#stats" },
  { label: "Causes", href: "#causes" },
  { label: "Impact", href: "#impact" },
  { label: "Solutions", href: "#solutions" },
  { label: "Action", href: "#cta" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(navRef.current, { yPercent: -100, opacity: 0 });

    ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      onEnter: () => {
        gsap.to(navRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      },
    });
  });

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="nav" ref={navRef}>
      <a
        href="#top"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Metro Manila Floods
      </a>
      <ul className="nav-links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
