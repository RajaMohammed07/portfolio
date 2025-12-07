import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "Business Website",
    description: "Modern responsive website with smooth animations and mobile-first design",
    tech: ["HTML", "CSS", "JavaScript"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "WordPress Blog",
    description: "Custom WordPress theme with SEO optimization and fast loading times",
    tech: ["WordPress", "PHP", "CSS"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "E-Commerce Store",
    description: "Online shopping platform with Bootstrap framework and responsive layout",
    tech: ["Bootstrap", "JavaScript", "HTML"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "React Dashboard",
    description: "Learning project: Interactive dashboard with modern React components",
    tech: ["React.js", "CSS", "JavaScript"],
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A selection of my recent work showcasing creative solutions and technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
