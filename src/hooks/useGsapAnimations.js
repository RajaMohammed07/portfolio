import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapScrollAnimation = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      y = 50,
      opacity = 0,
      duration = 1,
      ease = "power3.out",
      start = "top 80%",
      stagger = 0.1,
    } = options;

    gsap.fromTo(
      element.children,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref, options]);
};

export const useGsapParallax = (ref, speed = 0.5) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref, speed]);
};

export const useGsapReveal = (ref) => {
  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll("[data-gsap-reveal]");

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref]);
};
