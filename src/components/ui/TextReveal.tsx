import { motion } from 'motion/react';
import React from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ 
            duration: 0.8, 
            delay: delay + (i * 0.03), 
            ease: [0.21, 0.47, 0.32, 0.98] 
          }}
          className="mr-[0.25em] mb-[0.1em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
