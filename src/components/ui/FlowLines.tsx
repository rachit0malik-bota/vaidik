import { useEffect, useRef } from 'react';

export function FlowLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const draw = () => {
      time += 0.002;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colors based on the reference image (Purple, Blue, Gold/Cyan)
      const lines = [
        { color: '147, 51, 234', width: 120, offset: 0, speed: 1 },    // Purple
        { color: '59, 130, 246', width: 80, offset: 2, speed: 1.2 },   // Blue
        { color: '234, 179, 8', width: 60, offset: 4, speed: 0.8 },    // Gold
        { color: '6, 182, 212', width: 100, offset: 6, speed: 1.5 },   // Cyan
      ];

      lines.forEach((line) => {
        ctx.beginPath();
        
        // Create a gradient for each line
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `rgba(${line.color}, 0.0)`);
        gradient.addColorStop(0.5, `rgba(${line.color}, 0.15)`);
        gradient.addColorStop(1, `rgba(${line.color}, 0.0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.lineCap = 'round';
        
        // Subtle glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = `rgba(${line.color}, 0.2)`;

        const startY = canvas.height * 0.5 + Math.sin(time * line.speed + line.offset) * 200;
        ctx.moveTo(-200, startY);

        const cp1x = canvas.width * 0.3 + Math.sin(time * line.speed * 1.2 + line.offset) * 300 + mouseX * 400;
        const cp1y = canvas.height * 0.2 + Math.cos(time * line.speed * 0.8 + line.offset) * 300 + mouseY * 400;
        
        const cp2x = canvas.width * 0.7 + Math.cos(time * line.speed * 1.1 + line.offset) * 300 - mouseX * 400;
        const cp2y = canvas.height * 0.8 + Math.sin(time * line.speed * 0.9 + line.offset) * 300 - mouseY * 400;

        const endY = canvas.height * 0.5 + Math.cos(time * line.speed + line.offset) * 200;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, canvas.width + 200, endY);
        
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60 dark:opacity-100 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000" 
    />
  );
}
