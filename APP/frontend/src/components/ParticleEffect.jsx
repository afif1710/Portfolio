import React, { useEffect, useRef, useCallback } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const lastAmbientRef = useRef(0);
  const { reducedMotion } = useAccessibility();

  const createParticle = useCallback((x, y, isAmbient = false) => {
    const colors = ['#ffd1e7', '#d987ff', '#88a2ff', '#f6fd87', '#78d692'];
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * (isAmbient ? 2 : 4),
      vy: (Math.random() - 0.5) * (isAmbient ? 2 : 4),
      size: Math.random() * (isAmbient ? 4 : 8) + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: isAmbient ? 0.015 : 0.02,
      life: 0,
    };
  }, []);

  const spawnParticles = useCallback((x, y, count = 12) => {
    if (reducedMotion) return;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y));
    }
  }, [reducedMotion, createParticle]);

  const spawnAmbientParticles = useCallback(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particlesRef.current.push(createParticle(x, y, true));
    }
  }, [reducedMotion, createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleClick = (e) => {
      if (reducedMotion) return;
      const target = e.target;
      const isInteractive = target.closest('input, textarea');
      if (!isInteractive) {
        spawnParticles(e.clientX, e.clientY);
        const now = Date.now();
        if (now - lastAmbientRef.current > 2000) {
          lastAmbientRef.current = now;
          spawnAmbientParticles();
        }
      }
    };

    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.life++;

        if (p.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reducedMotion, spawnParticles, spawnAmbientParticles]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleEffect;