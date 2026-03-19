import React, { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create neon particles
    const particles = [];
    const numParticles = 100;

    const colors = [
      { r: 0, g: 255, b: 255 },   // Cyan
      { r: 255, g: 0, b: 255 },   // Magenta
      { r: 255, g: 0, b: 128 },   // Pink
    ];

    for (let i = 0; i < numParticles; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        color,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Create grid lines
    const gridLines = [];
    const gridSpacing = 60;

    for (let x = 0; x < canvas.width; x += gridSpacing) {
      gridLines.push({ type: 'vertical', pos: x });
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      gridLines.push({ type: 'horizontal', pos: y });
    }

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      gridLines.forEach(line => {
        ctx.beginPath();
        if (line.type === 'vertical') {
          ctx.moveTo(line.pos, 0);
          ctx.lineTo(line.pos, canvas.height);
        } else {
          ctx.moveTo(0, line.pos);
          ctx.lineTo(canvas.width, line.pos);
        }
        ctx.stroke();
      });

      // Draw and update particles
      particles.forEach((particle) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Twinkle
        particle.opacity += particle.speed * 0.02;
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.speed = -particle.speed;
        }

        const { r, g, b } = particle.color;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity * 1.5})`;
        ctx.fill();
      });

      // Draw occasional scan line
      const scanY = (Date.now() * 0.1) % canvas.height;
      ctx.fillStyle = 'rgba(0, 255, 255, 0.03)';
      ctx.fillRect(0, scanY, canvas.width, 2);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050508 50%, #0a0512 100%)'
      }}
    />
  );
};

export default StarfieldBackground;
