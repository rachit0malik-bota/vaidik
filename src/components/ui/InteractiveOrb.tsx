import { motion, useSpring, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import type { EasterEggType } from "../../hooks/useEasterEgg";

export function InteractiveOrb() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [isVisible, setIsVisible] = useState(false);
  const [eggType, setEggType] = useState<EasterEggType | null>(null);

  // Optimized spring configuration to prevent micro-oscillations
  const springConfig = { damping: 40, stiffness: 300, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
      if (!isVisible) setIsVisible(true);
    };
    
    window.addEventListener("mousemove", moveCursor, { passive: true });

    const handleEasterEgg = (e: Event) => {
      const customEvent = e as CustomEvent<EasterEggType>;
      
      // Toggle behavior
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

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("easterEgg", handleEasterEgg);
    };
  }, [cursorX, cursorY, isVisible, eggType]);

  const getOrbClasses = () => {
    // Replaced expensive CSS blur with highly performant radial gradients
    if (eggType === 'matrix') return "bg-[radial-gradient(circle,rgba(34,197,94,0.4)_0%,transparent_70%)]";
    if (eggType === 'cut') return "bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,transparent_70%)] scale-[3] transition-transform duration-75";
    if (eggType === 'grade') return "bg-[radial-gradient(circle,rgba(251,146,60,0.3)_0%,transparent_70%)]"; // Orange tint for grade
    
    // Default state: soft radial gradient matching theme
    return "bg-[radial-gradient(circle,rgba(0,0,0,0.08)_0%,transparent_60%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_60%)]";
  };

  return (
    <motion.div
      className={`pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-50 mix-blend-normal transition-colors duration-500 will-change-transform ${getOrbClasses()}`}
      style={{ 
        x: cursorXSpring, 
        y: cursorYSpring,
        opacity: isVisible ? (eggType === 'cut' ? 1 : (eggType ? 0.8 : 1)) : 0 
      }}
    />
  );
}
