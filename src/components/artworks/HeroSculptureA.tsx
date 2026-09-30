import React, { useState, useEffect } from 'react';

export const HeroSculptureA: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center select-none overflow-visible">
      {/* Dynamic ambient crimson glow behind ring */}
      <div 
        className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-red-600/25 blur-[90px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`
        }}
      />

      {/* Main SVG Composition */}
      <svg
        viewBox="0 0 700 700"
        className="w-full h-full max-w-[650px] overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <defs>
          {/* Intense Neon Red Halo Gradient */}
          <linearGradient id="neonRedRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>

          {/* Polished Obsidian Chrome Shading */}
          <linearGradient id="obsidianBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52525b" />
            <stop offset="25%" stopColor="#27272a" />
            <stop offset="60%" stopColor="#09090b" />
            <stop offset="90%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Facet Light Highlight */}
          <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#a1a1aa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#18181b" stopOpacity="0.1" />
          </linearGradient>

          {/* Crimson Lava Reflection */}
          <linearGradient id="lavaRim" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#991b1b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
          </linearGradient>

          {/* Halo Glow Filter */}
          <filter id="crimsonHaloGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. CRIMSON NEON RING HALO */}
        <g filter="url(#crimsonHaloGlow)">
          <circle
            cx="390"
            cy="320"
            r="190"
            fill="none"
            stroke="url(#neonRedRing)"
            strokeWidth="5"
            opacity="0.95"
          />
          <circle
            cx="390"
            cy="320"
            r="190"
            fill="none"
            stroke="#ff8080"
            strokeWidth="1.5"
            opacity="0.75"
          />
        </g>

        {/* 2. BACKGROUND ROCK TECTONICS & MOLTEN FRACTURES */}
        <g opacity="0.9">
          {/* Jagged Obsidian Boulder base */}
          <polygon
            points="140,580 260,490 380,510 520,480 640,560 680,680 100,680"
            fill="#09090b"
            stroke="#1c1917"
            strokeWidth="2"
          />
          {/* Molten red fissures */}
          <path
            d="M 220,530 Q 300,550 360,530 T 480,540 T 590,520"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            filter="drop-shadow(0 0 8px #ef4444)"
          />
          <path
            d="M 280,560 Q 340,590 440,570 T 520,610"
            stroke="#dc2626"
            strokeWidth="2"
            fill="none"
            filter="drop-shadow(0 0 6px #dc2626)"
          />
        </g>

        {/* 3. FLUID BLACK METALLIC RIBBONS (Behind letter A) */}
        <path
          d="M 460,180 C 560,120 620,220 580,340 C 550,440 460,460 380,480"
          fill="none"
          stroke="#18181b"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 460,180 C 560,120 620,220 580,340 C 550,440 460,460 380,480"
          fill="none"
          stroke="url(#obsidianBevel)"
          strokeWidth="22"
          strokeLinecap="round"
        />
        {/* Specular ribbon edge */}
        <path
          d="M 460,180 C 560,120 620,220 580,340"
          fill="none"
          stroke="#71717a"
          strokeWidth="3"
          opacity="0.7"
        />

        {/* 4. THE 3D SCULPTURAL LETTER 'A' */}
        <g id="letterA-3D" transform="translate(40, -10)">
          {/* Left Leg Base Obsidian block */}
          <polygon
            points="340,160 210,540 290,540 375,340"
            fill="url(#obsidianBevel)"
          />
          
          {/* Left Leg Facet with Red Rim Glow */}
          <polygon
            points="340,160 210,540 240,540 355,220"
            fill="url(#lavaRim)"
            opacity="0.8"
          />

          {/* Right Leg Facet (Heavy Chiseled Obsidian Slab) */}
          <polygon
            points="340,160 480,540 410,540 350,340"
            fill="url(#obsidianBevel)"
          />

          {/* Right Leg Beveled Face */}
          <polygon
            points="340,160 380,180 440,510 410,540"
            fill="#27272a"
          />

          {/* Right Leg Specular Highlight Blade */}
          <polygon
            points="340,160 380,180 395,280 355,250"
            fill="url(#facetHighlight)"
          />

          {/* Crossbar with Crimson Core */}
          <polygon
            points="260,370 430,370 415,420 280,420"
            fill="#18181b"
          />
          <polygon
            points="275,385 415,385 405,405 290,405"
            fill="#dc2626"
            filter="drop-shadow(0 0 10px #ef4444)"
          />

          {/* Top Apex Crown Facet */}
          <polygon
            points="340,140 370,175 340,195 310,175"
            fill="#f4f4f5"
            filter="drop-shadow(0 0 12px #ffffff)"
          />

          {/* Chiseled Fractures / Stone Cracks across A */}
          <path
            d="M 330,220 L 350,240 L 340,270 L 360,290"
            stroke="#ff6b6b"
            strokeWidth="1.8"
            fill="none"
            filter="drop-shadow(0 0 4px #ef4444)"
          />
          <path
            d="M 390,260 L 420,290 L 405,330"
            stroke="#ffffff"
            strokeWidth="1.2"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M 280,430 L 260,470 L 275,510"
            stroke="#ff4d4d"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* 5. FOREGROUND BLACK LIQUID METALLIC TENDRILS (Wrapping the front) */}
        <path
          d="M 280,460 C 240,430 230,380 270,350 C 330,310 390,390 450,440 C 510,480 560,460 580,430"
          fill="none"
          stroke="#000000"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <path
          d="M 280,460 C 240,430 230,380 270,350 C 330,310 390,390 450,440 C 510,480 560,460 580,430"
          fill="none"
          stroke="url(#obsidianBevel)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        {/* Molten red underglow on foreground tendril */}
        <path
          d="M 290,470 C 330,490 400,485 450,450"
          fill="none"
          stroke="#ef4444"
          strokeWidth="4"
          filter="drop-shadow(0 0 6px #ef4444)"
        />

        {/* 6. FLOATING EMBER PARTICLES */}
        <circle cx="280" cy="280" r="2.5" fill="#fca5a5" filter="drop-shadow(0 0 5px #ef4444)" />
        <circle cx="490" cy="220" r="3" fill="#ff4d4d" filter="drop-shadow(0 0 6px #ff4d4d)" />
        <circle cx="530" cy="380" r="2" fill="#fca5a5" filter="drop-shadow(0 0 4px #ef4444)" />
        <circle cx="210" cy="460" r="3.5" fill="#dc2626" filter="drop-shadow(0 0 8px #ef4444)" />
        <circle cx="370" cy="180" r="2.2" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
        <circle cx="430" cy="520" r="2.8" fill="#f87171" filter="drop-shadow(0 0 5px #ef4444)" />
      </svg>
    </div>
  );
};
