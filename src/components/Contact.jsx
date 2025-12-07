import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/RajaMohammed07" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:rajamohammed.m2021rvs@gmail.com" },
  { icon: Mail, label: "Email 2", href: "mailto:therajamohammed@gmail.com" },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">
            Let's Build Something
            <br />
            <span className="text-gradient">Amazing Together</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
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
              <a href="/Raja_Mohammed_Resume.pdf" download="Raja_Mohammed_Resume.pdf">
                <Download className="w-6 h-6 mr-3" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          <div className="flex justify-center gap-6 flex-wrap">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-4 rounded-xl bg-secondary hover:bg-primary/20 border border-border hover:border-primary/50 transition-all group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 pt-12 border-t border-border"
          >
            <p className="text-muted-foreground">
              © 2024 Raja Mohammed. Built with passion and creativity.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
