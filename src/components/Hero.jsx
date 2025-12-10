import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";
import ThreeBackground from "./ThreeBackground";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );
      
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4 }
      );
      
      gsap.fromTo(
        ".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
      );
      
      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8 }
      );

      // Profile image animation
      gsap.fromTo(
        ".hero-image-container",
        { opacity: 0, scale: 0.8, rotationY: -15 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );

      // Scroll indicator
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.5 }
      );

      // Continuous scroll indicator bounce
      gsap.to(".scroll-arrow", {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleImageHover = (isHovering) => {
    gsap.to(".hero-image-container", {
      rotationY: isHovering ? 15 : 0,
      rotationX: isHovering ? -10 : 0,
      scale: isHovering ? 1.05 : 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding"
    >
      {/* Three.js Background */}
      <ThreeBackground />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="max-w-4xl">
            <p className="hero-subtitle text-primary font-medium mb-4 text-lg tracking-wider uppercase opacity-0">
              Web Developer
            </p>

            <h1 className="hero-title font-display text-6xl md:text-8xl font-bold mb-6 leading-tight opacity-0">
              Hi, I'm
              <br />
              <span className="text-gradient">Raja Mohammed</span>
            </h1>

            <p className="hero-description text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed opacity-0">
              I create responsive, user-friendly websites using modern web
              technologies. Passionate about clean code and beautiful design.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 opacity-0">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg rounded-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* Profile Image with 3D Effect */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
          >
            <div
              className="hero-image-container relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px] opacity-0"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              onMouseEnter={() => handleImageHover(true)}
              onMouseLeave={() => handleImageHover(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-3xl blur-2xl transform translate-y-6" />
              <img
                src={profileImage}
                alt="Raja Mohammed - Web Developer"
                className="relative w-full h-full object-cover rounded-3xl border-4 border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                style={{ transformStyle: "preserve-3d" }}
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown className="scroll-arrow w-5 h-5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
