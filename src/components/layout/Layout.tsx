import { useLocation, useOutlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InteractiveOrb } from '../ui/InteractiveOrb';
import { useEasterEggs, EasterEggType } from '../../hooks/useEasterEgg';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useAnimationFrame } from 'motion/react';
import Lenis from 'lenis';

export function Layout() {
  useEasterEggs(); // Listens for multiple easter eggs
  const [eggType, setEggType] = useState<EasterEggType | null>(null);

  const location = useLocation();
  const outlet = useOutlet();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis for smooth scrolling with optimized configuration
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.5, // Slightly longer duration for a more fluid feel
      easing: (t) => 1 - Math.pow(1 - t, 4), // QuartOut easing for natural deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronize Lenis with Framer Motion's internal RAF loop for perfect parallax/reveal sync
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  useEffect(() => {
    const handleEasterEgg = (e: Event) => {
      const customEvent = e as CustomEvent<EasterEggType>;
      
      // If the same effect is triggered again, turn it off (toggle behavior for persistent effects)
      if (eggType === customEvent.detail && customEvent.detail !== 'cut') {
        setEggType(null);
        return;
      }
      
      setEggType(customEvent.detail);
      
      // Reset 'cut' effect quickly
      if (customEvent.detail === 'cut') {
        setTimeout(() => setEggType(null), 150); // Faster flash
      }
    };
    window.addEventListener("easterEgg", handleEasterEgg);
    return () => window.removeEventListener("easterEgg", handleEasterEgg);
  }, [eggType]);

  // Determine global classes based on active easter egg
  let globalClasses = "min-h-screen flex flex-col relative transition-all duration-1000 ";
  if (eggType === 'matrix') globalClasses += "font-mono text-green-500 ";
  if (eggType === 'grade') globalClasses += "saturate-[1.5] contrast-[1.1] hue-rotate-[-10deg] sepia-[0.2] ";

  return (
    <div className={globalClasses}>
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 z-[500] origin-left"
        style={{ scaleX }}
      />
      
      {/* Cinematic Bars */}
      <div className={`fixed top-0 left-0 w-full bg-black z-[100] transition-all duration-1000 ${eggType === 'cinematic' ? 'h-24' : 'h-0'}`} />
      <div className={`fixed bottom-0 left-0 w-full bg-black z-[100] transition-all duration-1000 ${eggType === 'cinematic' ? 'h-24' : 'h-0'}`} />
      
      {/* Cut Flash */}
      <div className={`fixed inset-0 bg-white z-[200] pointer-events-none transition-opacity duration-75 ${eggType === 'cut' ? 'opacity-100' : 'opacity-0'}`} />

      {/* 35mm Film Grain Overlay */}
      <div 
        className={`fixed inset-0 z-[150] pointer-events-none transition-opacity duration-1000 ${eggType === '35mm' ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`
        }}
      />

      <InteractiveOrb />
      <Navbar />
      <main className="flex-grow z-10 relative flex flex-col">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex-grow flex flex-col"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
