import { useEffect, useRef } from "react";
import { Code2, Layout, Blocks, Globe, Atom, Smartphone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML & CSS", level: 90, icon: Code2 },
  { name: "Bootstrap", level: 85, icon: Layout },
  { name: "JavaScript", level: 82, icon: Blocks },
  { name: "WordPress", level: 88, icon: Globe },
  { name: "React.js", level: 60, icon: Atom },
  { name: "Responsive Design", level: 85, icon: Smartphone },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const skillsRef = useRef([]);
  const progressRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 80%",
          },
        }
      );

      // Skill cards staggered animation
      skillsRef.current.forEach((skill, index) => {
        if (!skill) return;
        
        gsap.fromTo(
          skill,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: skill,
              start: "top 85%",
            },
          }
        );
      });

      // Progress bar animations
      progressRefs.current.forEach((bar, index) => {
        if (!bar) return;
        
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${skills[index].level}%`,
            duration: 1,
            delay: index * 0.1 + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });

      // Currently learning card
      gsap.fromTo(
        ".learning-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".learning-card",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-padding" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="skills-header mb-16 opacity-0">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                ref={(el) => (skillsRef.current[index] = el)}
                className="space-y-3 opacity-0"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-lg">{skill.name}</span>
                  </div>
                  <span className="text-sm text-primary font-medium">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
                  <div
                    ref={(el) => (progressRefs.current[index] = el)}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative w-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="learning-card mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card to-secondary border border-primary/20 opacity-0">
          <h3 className="font-display text-3xl font-bold mb-4">
            Currently Learning
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Actively expanding my skills with React.js to build modern,
            interactive web applications. Focused on mastering component-based
            architecture and state management.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
