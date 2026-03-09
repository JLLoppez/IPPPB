"use client";

import { useEffect } from "react";

type TargetElement = { element: string; animation: Record<string, any> };

const defaultProps = {
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  distance: "30px",
  duration: 1000,
  desktop: true,
  mobile: true,
};

function getTargets(): TargetElement[] {
  if (typeof window === "undefined") return [];
  return [
    { element: ".section-title", animation: { delay: 300, distance: "0px", origin: "bottom" } },
    {
      element: ".hero-title",
      animation: { delay: 500, origin: window.innerWidth > 768 ? "left" : "bottom" },
    },
    {
      element: ".hero-cta",
      animation: { delay: 1000, origin: window.innerWidth > 768 ? "left" : "bottom" },
    },
    { element: ".about-wrapper__image", animation: { delay: 600, origin: "bottom" } },
    {
      element: ".about-wrapper__info",
      animation: { delay: 1000, origin: window.innerWidth > 768 ? "left" : "bottom" },
    },
    { element: ".project-wrapper__text", animation: { delay: 500, origin: window.innerWidth > 768 ? "left" : "bottom" } },
    { element: ".project-wrapper__image", animation: { delay: 1000, origin: window.innerWidth > 768 ? "right" : "bottom" } },
    { element: ".contact-wrapper", animation: { delay: 800, origin: "bottom" } },
  ];
}

export default function Effects() {
  useEffect(() => {
    // ScrollReveal (loaded via <Script> in layout)
    const sr = (window as any).ScrollReveal;
    if (sr) {
      sr({ reset: false });
      const targets = getTargets();
      targets.forEach(({ element, animation }) => {
        sr().reveal(element, { ...defaultProps, ...animation });
      });
    }

    // VanillaTilt (loaded via <Script> in layout)
    const tilt = (window as any).VanillaTilt;
    if (tilt) {
      const elements = document.querySelectorAll(".js-tilt");
      tilt.init(elements);
    }
  }, []);

  return null;
}
