import { Reveal } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useState, useRef } from 'react';

const categories = ["All", "Media & Production", "Language Services", "AI Data"];

const projects = [
  {
    title: "Global Product Launch",
    client: "TECH ENTERPRISE",
    category: "Media & Production",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    desc: "A synchronized 12-country rollout featuring original production and localized transcreation.",
    isVideo: true,
    size: "large", // spans 2 columns
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]", // Blue
    tagColor: "bg-blue-500/20 text-blue-300"
  },
  {
    title: "AI Voice Model Training",
    client: "AUDIO PLATFORM",
    category: "AI Data",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    desc: "5,000 hours of high-fidelity, emotionally tagged voice data across 15 dialects.",
    size: "small",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]", // Amber
    tagColor: "bg-amber-500/20 text-amber-300"
  },
  {
    title: "Documentary Series Dubbing",
    client: "STREAMING NETWORK",
    category: "Language Services",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    desc: "Award-winning lip-sync dubbing for a 10-part nature documentary series.",
    size: "small",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]", // Emerald
    tagColor: "bg-emerald-500/20 text-emerald-300"
  },
  {
    title: "Brand Motion System",
    client: "FINTECH STARTUP",
    category: "Media & Production",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    desc: "High-end commercial production shot on location in Iceland and Japan.",
    isVideo: true,
    size: "large",
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]", // Blue
    tagColor: "bg-blue-500/20 text-blue-300"
  },
  {
    title: "Multilingual E-Learning",
    client: "EDTECH PROVIDER",
    category: "Language Services",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    desc: "Linguistic validation and cultural adaptation for a live-translation wearable device.",
    size: "full", // spans all columns
    glowColor: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]", // Emerald
    tagColor: "bg-emerald-500/20 text-emerald-300"
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax effect for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`group cursor-pointer relative overflow-hidden rounded-[2rem] bg-muted ${
        project.size === 'large' ? 'md:col-span-2 aspect-[16/10] md:aspect-[16/9]' : 
        project.size === 'full' ? 'md:col-span-3 aspect-[16/10] md:aspect-[21/9]' : 
        'md:col-span-1 aspect-[4/5]'
      } ${project.glowColor} transition-all duration-500`}
      ref={cardRef}
    >
      <motion.div 
        className="absolute inset-[-10%] w-[120%] h-[120%]"
        style={{ y }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 ${project.tagColor}`}>
            {project.category}
          </span>
          {project.isVideo && (
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Play className="text-white ml-1" size={20} />
            </div>
          )}
        </div>

        <div className="mt-auto">
          <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">{project.client}</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">{project.title}</h3>
          
          <div className="overflow-hidden">
            <div 
              className="flex items-center gap-2 text-white font-medium opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
            >
              View Case Study <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="w-full pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <TextReveal 
          text="Selected Works."
          className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 max-w-4xl"
        />
        <Reveal delay={0.2}>
          <p className="text-xl text-muted-foreground max-w-2xl mb-16">
            A showcase of our recent collaborations across media production and language services. We let the work speak for itself.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
