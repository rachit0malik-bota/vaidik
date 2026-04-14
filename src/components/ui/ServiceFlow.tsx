import { useEffect, useRef } from 'react';

export function ServiceFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let scrollY = 0;
    let targetScrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const draw = () => {
      time += 0.02;
      
      // Smooth interpolation for mouse and scroll
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      scrollY += (targetScrollY - scrollY) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Audio Waveforms (Translation/Voiceover) ---
      const drawWaveform = (baseYOffset: number, color: string, speed: number, parallax: number, amplitudeMult: number) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color}, 0.3)`;
        ctx.lineWidth = 2;
        
        const y = canvas.height * baseYOffset - scrollY * parallax;
        
        ctx.moveTo(0, y);
        for (let x = 0; x <= canvas.width; x += 4) {
          // Create a realistic looking audio waveform envelope
          const envelope = Math.max(0, Math.sin(x * 0.003 - time * speed * 0.2));
          const noise = Math.sin(x * 0.05 + time * speed) * Math.cos(x * 0.02 - time * speed * 1.2);
          const amplitude = amplitudeMult * envelope * noise;
          
          let pointY = y + amplitude;

          // Mouse interaction (repel)
          const dx = x - mouseX;
          const dy = pointY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            pointY += (dy / dist) * (150 - dist) * 0.2;
          }

          ctx.lineTo(x, pointY);
        }
        ctx.stroke();
      };

      // --- Timeline Tracks (Video Editing) ---
      const drawTimeline = (baseYOffset: number, color: string, parallax: number, direction: number) => {
        const y = canvas.height * baseYOffset - scrollY * parallax;
        
        // Track background
        ctx.fillStyle = `rgba(${color}, 0.03)`;
        ctx.fillRect(0, y - 15, canvas.width, 30);

        // Clips (Blocks representing video clips on a timeline)
        ctx.fillStyle = `rgba(${color}, 0.15)`;
        const clipOffset = (time * 40 * direction) % 400;
        
        // Draw repeating clips
        for (let i = -1; i < canvas.width / 400 + 2; i++) {
          const baseX = i * 400 + clipOffset;
          ctx.fillRect(baseX + 20, y - 10, 120, 20);
          ctx.fillRect(baseX + 160, y - 10, 80, 20);
          ctx.fillRect(baseX + 260, y - 10, 100, 20);
        }

        // Playhead (Red vertical line)
        const playheadX = canvas.width * 0.5 + Math.sin(time * 0.5 * direction) * 200;
        
        // Mouse interaction for playhead (pull towards mouse if close)
        let finalPlayheadX = playheadX;
        const dx = playheadX - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          finalPlayheadX -= dx * 0.2;
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, 0.6)`; // Red
        ctx.lineWidth = 2;
        ctx.moveTo(finalPlayheadX, y - 25);
        ctx.lineTo(finalPlayheadX, y + 25);
        ctx.stroke();
        
        // Playhead triangle top
        ctx.fillStyle = `rgba(239, 68, 68, 0.9)`;
        ctx.beginPath();
        ctx.moveTo(finalPlayheadX - 6, y - 25);
        ctx.lineTo(finalPlayheadX + 6, y - 25);
        ctx.lineTo(finalPlayheadX, y - 15);
        ctx.fill();
      };

      // --- Abstract Data Stream (AI/Tech) ---
      const drawDataStream = (baseYOffset: number, color: string, parallax: number) => {
        const y = canvas.height * baseYOffset - scrollY * parallax;
        ctx.fillStyle = `rgba(${color}, 0.4)`;
        
        for (let i = 0; i < 60; i++) {
          const x = (i * 40 + time * 80) % canvas.width;
          const size = Math.sin(i + time) * 2 + 3;
          
          let pointY = y + Math.cos(i * 0.5 + time) * 40;
          
          // Mouse interaction (scatter)
          const dx = x - mouseX;
          const dy = pointY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            pointY += (dy / dist) * (120 - dist) * 0.5;
          }

          ctx.fillRect(x, pointY, size, size);
        }
      };

      // Draw all thematic elements
      drawTimeline(0.2, '59, 130, 246', 0.15, 1);       // Blue (Video Production)
      drawWaveform(0.4, '16, 185, 129', 2, 0.25, 70);   // Emerald (Audio/Localization)
      drawDataStream(0.6, '245, 158, 11', 0.35);        // Amber (AI Data)
      drawTimeline(0.8, '139, 92, 246', 0.2, -1);       // Purple (Motion Graphics)
      drawWaveform(0.95, '6, 182, 212', 1.5, 0.4, 50);  // Cyan (Global Reach)

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-50 dark:opacity-80 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000 will-change-transform" 
      />
    </div>
  );
}
