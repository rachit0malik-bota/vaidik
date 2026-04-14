import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { Magnetic } from '../components/ui/Magnetic';
import { TiltCard } from '../components/ui/TiltCard';
import { FlowLines } from '../components/ui/FlowLines';
import { ArrowRight, Globe, Play, Sparkles, Layers, ShieldCheck, Zap, Users } from 'lucide-react';

export function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          {/* Subtle mouse-reactive flowing lines background */}
          <FlowLines />
        </motion.div>
        
        <motion.div 
          style={{ y: textY, opacity }}
          className="container mx-auto px-6 md:px-12 z-10 text-center"
        >
          <TextReveal 
            text="Global Stories," 
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-2 justify-center" 
          />
          <TextReveal 
            text="Flawlessly Told." 
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-6 justify-center text-muted-foreground" 
            delay={0.2}
          />
          <Reveal delay={0.6}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Vaidik Co. is a premium creative and language services agency. We bridge the gap between high-end production and seamless global distribution.
            </p>
          </Reveal>
          <Reveal delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Magnetic intensity={0.2}>
                <Link to="/portfolio" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-primary/20">
                  View Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
              <Magnetic intensity={0.2}>
                <Link to="/services" className="px-8 py-4 bg-muted text-foreground rounded-full font-medium hover:bg-muted/80 hover:scale-105 active:scale-95 transition-all duration-300">
                  Explore Services
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* Perspective / Philosophy (Typography Led) */}
      <section className="py-32 md:py-48 bg-background relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">Our Perspective</h2>
            </Reveal>
            <TextReveal 
              text="We don't just translate. We transcreate. We don't just produce. We engineer experiences that resonate across cultural boundaries."
              className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 md:py-32 bg-card relative z-10 rounded-[3rem] mx-4 md:mx-8 mb-24 border border-border shadow-sm">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-16">
              Dual Expertise. <br />
              <span className="text-muted-foreground">Singular Vision.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <Reveal delay={0.1}>
              <div className="h-[500px] perspective-1000">
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-3xl bg-muted p-8 md:p-12 h-full flex flex-col justify-end shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                      src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" 
                      alt="Video Production" 
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="relative z-20 text-white transform transition-transform duration-500 group-hover:-translate-y-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                        <Play size={20} className="text-white ml-1" />
                      </div>
                      <h3 className="text-3xl font-semibold mb-3">Media & Production</h3>
                      <p className="text-white/80 mb-6 max-w-md text-lg">High-end video production, motion graphics, and post-production tailored for global audiences.</p>
                      <Link to="/services#media" className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all bg-white text-black px-6 py-3 rounded-full">
                        Discover Media <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-[500px] perspective-1000">
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-3xl bg-muted p-8 md:p-12 h-full flex flex-col justify-end shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                      alt="Language Services" 
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="relative z-20 text-white transform transition-transform duration-500 group-hover:-translate-y-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                        <Globe size={20} className="text-white" />
                      </div>
                      <h3 className="text-3xl font-semibold mb-3">Language Services</h3>
                      <p className="text-white/80 mb-6 max-w-md text-lg">Expert dubbing, localization, and AI language data annotation for seamless global reach.</p>
                      <Link to="/services#language" className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all bg-white text-black px-6 py-3 rounded-full">
                        Discover Language <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-16 text-center">
              Built for Every Industry
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Entertainment", desc: "Film & TV dubbing, subtitling, and global marketing assets." },
              { title: "Tech & Software", desc: "UI localization, technical documentation, and product launch videos." },
              { title: "E-Learning", desc: "Multilingual course production, voiceovers, and interactive media." },
              { title: "Corporate", desc: "Internal communications, brand anthems, and global PR materials." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-3xl bg-muted/50 border border-border hover:bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-24 md:py-32 bg-foreground text-background relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-4xl">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">Global Reach. Local Resonance.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-background/70 mb-12 leading-relaxed">
                We operate across 50+ languages with a network of native-speaking talent and in-country directors. Your message doesn't just cross borders; it belongs there.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-background/20 pt-12">
              {[
                { label: "Languages", value: "50+" },
                { label: "Studios", value: "12" },
                { label: "Countries", value: "30+" },
                { label: "Voice Actors", value: "5,000+" }
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <div className="text-4xl md:text-5xl font-semibold mb-2">{stat.value}</div>
                    <div className="text-background/60 font-medium">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content at Scale (Sticky Scroll Layout) */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="lg:sticky lg:top-32 h-fit">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Content at Scale.</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Handling bulk workflows without compromising the human touch. We engineer our processes to deliver volume with precision.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Layers size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Automated Workflows</h4>
                      <p className="text-muted-foreground">Proprietary systems that route assets globally, ensuring 24/7 production cycles.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">AI-Assisted Quality</h4>
                      <p className="text-muted-foreground">Leveraging machine learning for preliminary checks, allowing human experts to focus on nuance.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="space-y-8 md:space-y-24">
              <Reveal>
                <div className="perspective-1000">
                  <TiltCard>
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Workflow 1" className="rounded-3xl w-full aspect-video object-cover shadow-2xl" referrerPolicy="no-referrer" />
                  </TiltCard>
                </div>
              </Reveal>
              <Reveal>
                <div className="perspective-1000">
                  <TiltCard>
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Workflow 2" className="rounded-3xl w-full aspect-video object-cover shadow-2xl" referrerPolicy="no-referrer" />
                  </TiltCard>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Process Depth */}
      <section className="py-24 md:py-32 bg-muted relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Uncompromising Quality</h2>
              <p className="text-lg text-muted-foreground">Our ISO-certified processes ensure that every deliverable meets the highest industry standards, from audio fidelity to linguistic accuracy.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Rigorous QA", desc: "Multi-tiered quality assurance involving native speakers and technical experts." },
              { icon: Zap, title: "Speed & Agility", desc: "Optimized pipelines that reduce turnaround times without sacrificing quality." },
              { icon: Users, title: "Dedicated Teams", desc: "Account managers and project leads assigned specifically to your brand." }
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-card p-8 rounded-3xl border border-border text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                    <feature.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Work Showcase */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Featured Work</h2>
              <Link to="/portfolio" className="text-primary font-medium hover:underline flex items-center gap-2">
                View all projects <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop", title: "Nature Doc Series", client: "StreamNet" },
              { img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop", title: "Brand Anthem", client: "Aura Lifestyle" }
            ].map((work, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Link to="/portfolio" className="group block">
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6 bg-muted">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                      src={work.img} 
                      alt={work.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">{work.title}</h3>
                  <p className="text-muted-foreground">{work.client}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insights (Editorial Blocks) */}
      <section className="py-24 md:py-32 bg-muted relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Industry Insights</h2>
              <Link to="/about" className="text-primary font-medium hover:underline flex items-center gap-2">
                Read our philosophy <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Multilingual Media",
                desc: "Why dubbing is outpacing subtitling in the streaming wars, and how studios are adapting to global demand.",
                tag: "Media Trends"
              },
              {
                title: "Training AI with Human Nuance",
                desc: "The critical role of high-quality, culturally accurate data annotation in the next generation of LLMs.",
                tag: "AI & Data"
              },
              {
                title: "Transcreation vs. Translation",
                desc: "When literal translation fails marketing campaigns, and why transcreation is the key to global resonance.",
                tag: "Localization"
              }
            ].map((insight, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer h-full flex flex-col p-8 rounded-3xl bg-card border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{insight.tag}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">{insight.title}</h3>
                  <p className="text-muted-foreground flex-grow">{insight.desc}</p>
                  <div className="mt-8 w-8 h-[2px] bg-border group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 bg-primary text-primary-foreground relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-20">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8">
              Ready to scale your content?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic intensity={0.2}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-background text-foreground rounded-full font-medium hover:scale-105 active:scale-95 transition-all duration-300 text-lg shadow-2xl">
                Start a Conversation <ArrowRight size={20} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
