import { Reveal } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Video, Scissors, Wand2, Film, Mic, Languages, Globe2, Database, Cpu, Sparkles, MonitorPlay, Code } from 'lucide-react';
import { ServiceFlow } from '../components/ui/ServiceFlow';

const FloatingShape = ({ delay, className, scrollYProgress, yRange }: { delay: number, className: string, scrollYProgress: MotionValue<number>, yRange: string[] }) => {
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  return (
    <motion.div
      style={{ y }}
      className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 pointer-events-none z-0 ${className}`}
    >
      <motion.div
        animate={{
          y: ["0%", "-20%", "0%"],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        className="w-full h-full bg-current rounded-full"
      />
    </motion.div>
  );
};

const FloatingIcon = ({ Icon, delay, className, scrollYProgress, yRange, rotateRange }: { Icon: any, delay: number, className: string, scrollYProgress: MotionValue<number>, yRange: string[], rotateRange: number[] }) => {
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  
  return (
    <motion.div
      style={{ y, rotate }}
      className={`absolute opacity-10 dark:opacity-[0.03] pointer-events-none z-0 ${className}`}
    >
      <motion.div
        animate={{
          y: ["0%", "-15%", "0%"],
          x: ["0%", "10%", "0%"],
        }}
        transition={{
          duration: 15 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        <Icon size={160} />
      </motion.div>
    </motion.div>
  );
};

export function Services() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('media');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: sectionsProgress } = useScroll({
    target: sectionsRef,
    offset: ["start center", "end bottom"]
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['media', 'language', 'technology'];
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div ref={containerRef} className="w-full pt-32 pb-24 relative overflow-hidden">
      {/* Background Animation */}
      <ServiceFlow />

      {/* Background Floating Elements - Scroll Reactive */}
      <FloatingShape scrollYProgress={scrollYProgress} yRange={["-20%", "20%"]} delay={0} className="w-[40vw] h-[40vw] text-blue-500/10 top-[5%] -left-[10%]" />
      <FloatingShape scrollYProgress={scrollYProgress} yRange={["10%", "-30%"]} delay={2} className="w-[30vw] h-[30vw] text-purple-500/10 top-[35%] -right-[5%]" />
      <FloatingShape scrollYProgress={scrollYProgress} yRange={["-10%", "15%"]} delay={4} className="w-[50vw] h-[50vw] text-emerald-500/10 bottom-[10%] left-[20%]" />
      <FloatingShape scrollYProgress={scrollYProgress} yRange={["20%", "-20%"]} delay={1} className="w-[20vw] h-[20vw] text-amber-500/10 top-[60%] left-[10%]" />

      {/* Thematic Floating Icons - Scroll Reactive */}
      <FloatingIcon Icon={Video} scrollYProgress={scrollYProgress} yRange={["-50%", "50%"]} rotateRange={[0, 45]} delay={0} className="top-[15%] left-[5%]" />
      <FloatingIcon Icon={Languages} scrollYProgress={scrollYProgress} yRange={["50%", "-50%"]} rotateRange={[-20, 20]} delay={2} className="top-[25%] right-[10%]" />
      <FloatingIcon Icon={Scissors} scrollYProgress={scrollYProgress} yRange={["-30%", "60%"]} rotateRange={[10, -30]} delay={1} className="top-[45%] left-[15%]" />
      <FloatingIcon Icon={Globe2} scrollYProgress={scrollYProgress} yRange={["40%", "-40%"]} rotateRange={[-45, 45]} delay={3} className="top-[65%] right-[5%]" />
      <FloatingIcon Icon={Cpu} scrollYProgress={scrollYProgress} yRange={["-60%", "30%"]} rotateRange={[0, 90]} delay={4} className="top-[80%] left-[8%]" />
      <FloatingIcon Icon={Film} scrollYProgress={scrollYProgress} yRange={["20%", "-60%"]} rotateRange={[-15, 15]} delay={2.5} className="top-[10%] right-[30%]" />
      <FloatingIcon Icon={MonitorPlay} scrollYProgress={scrollYProgress} yRange={["-40%", "40%"]} rotateRange={[10, -10]} delay={1.5} className="top-[55%] right-[25%]" />
      <FloatingIcon Icon={Code} scrollYProgress={scrollYProgress} yRange={["30%", "-50%"]} rotateRange={[-30, 30]} delay={3.5} className="top-[85%] right-[15%]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <TextReveal 
          text="Comprehensive solutions for global impact."
          className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 max-w-4xl"
        />
        <Reveal delay={0.2}>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            We offer end-to-end services across media production, language localization, and AI data solutions, ensuring your content maintains its integrity across all borders.
          </p>
        </Reveal>

        {/* Sticky Sub-Navigation */}
        <Reveal delay={0.4}>
          <div className="sticky top-24 z-50 flex flex-col gap-2 mb-24 w-fit">
            <div className="flex flex-wrap gap-2 md:gap-4 p-2 bg-background/80 backdrop-blur-md border border-border rounded-2xl md:rounded-full shadow-sm relative overflow-hidden">
              {/* Progress Bar Background */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 opacity-50"
                style={{ width: useTransform(sectionsProgress, [0, 1], ['0%', '100%']) }}
              />
              
              {[
                { id: 'media', label: 'Media & Production', icon: Video },
                { id: 'language', label: 'Language Services', icon: Languages },
                { id: 'technology', label: 'Technology & AI', icon: Cpu }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      const offset = 100; // Account for sticky header
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                      
                      // Update URL hash without jumping
                      window.history.pushState(null, '', `#${item.id}`);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                    activeSection === item.id 
                      ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div ref={sectionsRef} className="relative">
          {/* Media & Production */}
        <section id="media" className="mb-32 scroll-mt-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <div className="sticky top-32">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                    <Video size={14} /> Production
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">Media & Production</h2>
                  <p className="text-muted-foreground text-lg mb-8">High-end visual storytelling crafted for modern audiences.</p>
                  
                  <div className="hidden md:block p-6 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border">
                    <h4 className="font-semibold mb-4">The Process</h4>
                    <ul className="space-y-3">
                      {['Pre-production & Strategy', 'Principal Photography', 'Post-Production', 'Final Delivery'].map((step, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-blue-500" /> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Video,
                  title: "Video Production",
                  desc: "From concept to final cut, we produce commercial, corporate, and documentary content with cinematic quality. Our global network of directors and DPs ensures we can shoot anywhere, anytime.",
                  workflow: "Concept → Scripting → Location Scouting → Principal Photography",
                  color: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  icon: Scissors,
                  title: "Post Production",
                  desc: "Expert editing, color grading, and sound design to elevate your raw footage into a polished masterpiece. We utilize industry-standard workflows for 4K and 8K delivery.",
                  workflow: "Offline Editing → Color Grading → Sound Mixing → Mastering",
                  color: "from-indigo-500/20 to-blue-500/20"
                },
                {
                  icon: Wand2,
                  title: "Motion Graphics",
                  desc: "Dynamic 2D and 3D animation to explain complex concepts or add visual flair to your brand. Our motion team works seamlessly with live-action to create hybrid visual experiences.",
                  workflow: "Storyboarding → Asset Design → Animation → Compositing",
                  color: "from-violet-500/20 to-purple-500/20"
                },
                {
                  icon: Film,
                  title: "Animation",
                  desc: "Full-scale animation production, from character design to storyboarding and final render. We handle both stylized 2D and photorealistic 3D pipelines.",
                  workflow: "Character Design → Rigging → Layout → Final Render",
                  color: "from-fuchsia-500/20 to-pink-500/20"
                }
              ].map((service, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-transparent hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group cursor-default relative overflow-hidden h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                      <service.icon size={80} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mb-5 text-foreground shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <service.icon size={20} />
                      </div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl md:text-2xl font-semibold transition-colors">{service.title}</h3>
                        <ArrowRight className="text-foreground opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                      </div>
                      <p className="text-muted-foreground group-hover:text-foreground/80 text-base leading-relaxed mb-6 transition-colors duration-300 flex-grow">{service.desc}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground/80 mt-auto w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        <span className="truncate">{service.workflow.split('→')[0].trim()} & More</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Language Services */}
        <section id="language" className="mb-32 scroll-mt-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <div className="sticky top-32">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
                    <Languages size={14} /> Localization
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">Language Services</h2>
                  <p className="text-muted-foreground text-lg mb-8">Precision localization and data services for a connected world.</p>
                  
                  <div className="hidden md:block p-6 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border">
                    <h4 className="font-semibold mb-4">Our Capabilities</h4>
                    <ul className="space-y-3">
                      {['50+ Languages Supported', 'Native-Speaking Talent', 'ISO-Certified Workflows', 'Cultural Adaptation'].map((step, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-emerald-500" /> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Mic,
                  title: "Dubbing & Voiceover",
                  desc: "Professional voice casting, recording, and mixing in over 50 languages. We focus on emotional resonance and lip-sync accuracy to ensure the performance feels native.",
                  consideration: "Lip-sync precision & emotional authenticity",
                  color: "from-emerald-500/20 to-teal-500/20"
                },
                {
                  icon: Languages,
                  title: "Localization",
                  desc: "Culturally accurate translation and adaptation of scripts, software, and marketing materials. We go beyond literal translation to capture the true intent of your message.",
                  consideration: "Idiomatic accuracy & cultural nuance",
                  color: "from-teal-500/20 to-cyan-500/20"
                },
                {
                  icon: Globe2,
                  title: "Multilingual Content",
                  desc: "End-to-end management of global content rollouts, ensuring consistency across all regions. We handle the complexity of multi-market distribution so you don't have to.",
                  consideration: "Centralized management & brand consistency",
                  color: "from-cyan-500/20 to-blue-500/20"
                }
              ].map((service, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-transparent hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group cursor-default relative overflow-hidden h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                      <service.icon size={80} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mb-5 text-foreground shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <service.icon size={20} />
                      </div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl md:text-2xl font-semibold transition-colors">{service.title}</h3>
                        <ArrowRight className="text-foreground opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                      </div>
                      <p className="text-muted-foreground group-hover:text-foreground/80 text-base leading-relaxed mb-6 transition-colors duration-300 flex-grow">{service.desc}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground/80 mt-auto w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        <span className="truncate">{service.consideration}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Technology & AI Data */}
        <section id="technology" className="scroll-mt-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <div className="sticky top-32">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6">
                    <Sparkles size={14} /> AI & Tech
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">Technology & AI Data</h2>
                  <p className="text-muted-foreground text-lg mb-8">Powering the next generation of intelligent systems with human nuance.</p>
                  
                  <div className="hidden md:block p-6 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border">
                    <h4 className="font-semibold mb-4">Data Types</h4>
                    <ul className="space-y-3">
                      {['Audio & Speech', 'Text & NLP', 'Computer Vision', 'RLHF Feedback'].map((step, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-amber-500" /> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Database,
                  title: "AI Language Data",
                  desc: "High-quality data annotation, transcription, and linguistic validation for training AI models. We provide the human-in-the-loop precision required for advanced LLMs.",
                  consideration: "Human-in-the-loop precision",
                  color: "from-amber-500/20 to-orange-500/20"
                },
                {
                  icon: Mic,
                  title: "Speech & Audio Datasets",
                  desc: "Custom collection and tagging of diverse voice data across dialects, emotions, and acoustic environments to train robust speech recognition and synthesis models.",
                  consideration: "Acoustic & dialectical diversity",
                  color: "from-orange-500/20 to-red-500/20"
                },
                {
                  icon: Cpu,
                  title: "RLHF & Model Evaluation",
                  desc: "Reinforcement Learning from Human Feedback (RLHF) services. Our domain experts evaluate model outputs for accuracy, safety, and cultural alignment.",
                  consideration: "Safety & cultural alignment",
                  color: "from-red-500/20 to-rose-500/20"
                }
              ].map((service, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-transparent hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group cursor-default relative overflow-hidden h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                      <service.icon size={80} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mb-5 text-foreground shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <service.icon size={20} />
                      </div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl md:text-2xl font-semibold transition-colors">{service.title}</h3>
                        <ArrowRight className="text-foreground opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                      </div>
                      <p className="text-muted-foreground group-hover:text-foreground/80 text-base leading-relaxed mb-6 transition-colors duration-300 flex-grow">{service.desc}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground/80 mt-auto w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        <span className="truncate">{service.consideration}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        </div>

        {/* Methodology Section */}
        <section className="py-24 md:py-32 relative z-10 border-t border-border mt-12 bg-muted/10">
          <Reveal>
            <div className="mb-24 text-center max-w-3xl mx-auto px-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Methodology</h3>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6">The Vaidik Pipeline.</h2>
              <p className="text-lg text-muted-foreground">
                A deterministic approach to creative problem solving. We eliminate variables to ensure consistent, premium output at scale.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-16 md:gap-12 max-w-5xl mx-auto relative px-4 md:px-0">
            {[
              {
                step: "01",
                title: "Ingestion & Conformance",
                desc: "We receive raw assets and conform them to our standardized pipeline. Technical directors assess color spaces, frame rates, and linguistic requirements."
              },
              {
                step: "02",
                title: "AI Processing Layer",
                desc: "Proprietary models run initial passes: transcription, rough translation, rotoscoping, and tracking. This accelerates the timeline by 40%."
              },
              {
                step: "03",
                title: "Creative Execution",
                desc: "Senior artists and native linguists take over. This is where the craft happens—color grading, VFX integration, and nuanced dubbing."
              },
              {
                step: "04",
                title: "Global QC & Delivery",
                desc: "Automated technical checks combined with human creative review. We deliver localized masters tailored for every platform and territory."
              }
            ].map((phase, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className={`flex w-full ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`relative w-full md:w-[55%] p-8 pt-14 md:p-12 rounded-3xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300 ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
                    {/* Number Circle */}
                    <div className={`absolute -top-6 left-8 md:top-1/2 md:-translate-y-1/2 w-14 h-14 bg-card border border-border rounded-full flex items-center justify-center text-sm font-bold text-muted-foreground shadow-sm z-10 ${isEven ? 'md:left-auto md:-right-7' : 'md:left-auto md:-left-7'}`}>
                      {phase.step}
                    </div>
                    
                    {/* Inner content container to guarantee text doesn't overlap circle */}
                    <div className={isEven ? 'md:pr-12' : 'md:pl-12'}>
                      <h4 className="text-xl md:text-2xl font-semibold mb-4">{phase.title}</h4>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{phase.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
