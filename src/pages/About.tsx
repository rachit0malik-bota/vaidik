import { Reveal } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <TextReveal 
          text="We are architects of global narratives."
          className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 max-w-4xl"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-16 md:mt-32">
          <div className="md:col-span-4">
            <Reveal delay={0.2}>
              <h2 className="text-2xl font-medium sticky top-32">Our Philosophy</h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.3}>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="text-2xl md:text-3xl leading-relaxed mb-12 text-foreground font-medium">
                  At Vaidik Co., we believe that a great story deserves to be heard exactly as intended, no matter the language or platform.
                </p>
                <div className="space-y-8 text-lg">
                  <p>
                    Founded on the intersection of high-end creative production and meticulous linguistic precision, we serve as the singular partner for brands and studios looking to scale their content globally.
                  </p>
                  <p>
                    The modern media landscape is fragmented. Content is consumed across borders instantly, yet the cultural nuances required to make that content resonate are often lost in translation. We exist to close that gap.
                  </p>
                  <p>
                    We don't just translate; we transcreate. We don't just produce; we engineer experiences that resonate across cultural boundaries, ensuring your brand voice remains authentic everywhere.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Parallax Image Section */}
      <div ref={containerRef} className="w-full h-[70vh] md:h-[90vh] mt-32 relative overflow-hidden bg-muted">
        <motion.img 
          style={{ y: y1 }}
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
          alt="Team Collaboration" 
          className="absolute inset-0 w-full h-[130%] object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight text-center max-w-3xl px-6">
              Built by creatives. <br /> Powered by technology.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-2xl font-medium sticky top-32">Our Approach</h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Reveal delay={0.1}>
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-4">Craftsmanship</h3>
                <p className="text-muted-foreground leading-relaxed">Every frame, every word, every sound is treated with the utmost care. We employ industry-leading talent to ensure premium quality at every touchpoint.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-4">Technology</h3>
                <p className="text-muted-foreground leading-relaxed">We leverage cutting-edge AI and workflow automation to deliver at scale without compromising the human touch that makes content great.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-4">Cultural Nuance</h3>
                <p className="text-muted-foreground leading-relaxed">True localization requires deep cultural understanding. Our global network ensures your message lands perfectly in any market.</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="p-10 rounded-3xl bg-card border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-4">Partnership</h3>
                <p className="text-muted-foreground leading-relaxed">We operate as an extension of your team, providing transparent communication, dedicated support, and proactive problem-solving.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
