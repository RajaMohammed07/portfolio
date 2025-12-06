import { useEffect, useRef } from "react";
import { Mail, Linkedin, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/RajaMohammed07" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:rajamohammed.m2021rvs@gmail.com" },
  { icon: Mail, label: "Email 2", href: "mailto:therajamohammed@gmail.com" },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const socialsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 80%",
          },
        }
      );

      // Description
      gsap.fromTo(
        ".contact-description",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".contact-description",
            start: "top 85%",
          },
        }
      );

      // Buttons
      gsap.fromTo(
        ".contact-buttons",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".contact-buttons",
            start: "top 85%",
          },
        }
      );

      // Social icons staggered
      socialsRef.current.forEach((social, index) => {
        if (!social) return;

        gsap.fromTo(
          social,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: 0.4 + index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: social,
              start: "top 90%",
            },
          }
        );
      });

      // Footer
      gsap.fromTo(
        ".contact-footer",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.8,
          scrollTrigger: {
            trigger: ".contact-footer",
            start: "top 95%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSocialHover = (index, isHovering) => {
    const social = socialsRef.current[index];
    if (!social) return;

    gsap.to(social, {
      scale: isHovering ? 1.1 : 1,
      y: isHovering ? -5 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="contact"
      className="section-padding bg-card/50"
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="contact-header font-display text-5xl md:text-7xl font-bold mb-8 opacity-0">
            Let's Build Something
            <br />
            <span className="text-gradient">Amazing Together</span>
          </h2>

          <p className="contact-description text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed opacity-0">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>

          <div className="contact-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-8 text-xl rounded-xl shadow-[0_0_40px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.4)] transition-all"
            >
              <Mail className="w-6 h-6 mr-3" />
              Get in Touch
            </Button>

            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-12 py-8 text-xl rounded-xl transition-all"
            >
              <a
                href="/Raja_Mohammed_Resume.pdf"
                download="Raja_Mohammed_Resume.pdf"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            {socials.map((social, index) => (
              <a
                key={social.label}
                ref={(el) => (socialsRef.current[index] = el)}
                href={social.href}
                className="p-4 rounded-xl bg-secondary hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group opacity-0"
                aria-label={social.label}
                onMouseEnter={() => handleSocialHover(index, true)}
                onMouseLeave={() => handleSocialHover(index, false)}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          <div className="contact-footer mt-20 pt-12 border-t border-border opacity-0">
            <p className="text-muted-foreground">
              © 2024 Raja Mohammed. Built with passion and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
