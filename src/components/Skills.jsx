import { motion } from "framer-motion";
import { Code2, Layout, Blocks, Globe, Atom, Smartphone } from "lucide-react";

const skills = [
  { name: "HTML & CSS", level: 90, icon: Code2 },
  { name: "Bootstrap", level: 85, icon: Layout },
  { name: "JavaScript", level: 82, icon: Blocks },
  { name: "WordPress", level: 88, icon: Globe },
  { name: "React.js", level: 60, icon: Atom },
  { name: "Responsive Design", level: 85, icon: Smartphone },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-lg">{skill.name}</span>
                  </div>
                  <span className="text-sm text-primary font-medium">{skill.level}%</span>
                </div>
                
                <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                  >
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card to-secondary border border-primary/20"
        >
          <h3 className="font-display text-3xl font-bold mb-4">Currently Learning</h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Actively expanding my skills with React.js to build modern, interactive web applications. 
            Focused on mastering component-based architecture and state management.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
