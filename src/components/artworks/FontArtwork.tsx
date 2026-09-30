import React from 'react';

interface FontArtworkProps {
  id: string;
  className?: string;
}

export const FontArtwork: React.FC<FontArtworkProps> = ({ id, className = '' }) => {
  switch (id) {
    case 'imperial-eagle':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#111118] to-[#08080c] select-none ${className}`}>
          {/* Subtle gothic cross & stone texture background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent pointer-events-none" />
          
          <svg viewBox="0 0 400 240" className="w-full h-full max-w-[340px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="silverChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#94a3b8" />
                <stop offset="45%" stopColor="#cbd5e1" />
                <stop offset="70%" stopColor="#475569" />
                <stop offset="90%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="eagleGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <filter id="metalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Heraldic Eagle Emblem Background */}
            <g opacity="0.35" transform="translate(200, 75) scale(0.65)">
              {/* Crown */}
              <path d="M-25,-55 L-15,-38 L0,-58 L15,-38 L25,-55 L20,-30 L-20,-30 Z" fill="#cbd5e1" />
              {/* Eagle Head & Beak */}
              <path d="M-8,-30 C-15,-25 -15,-10 -6,-5 C-2,-3 5,-4 10,-8 C14,-12 16,-20 12,-28 C8,-32 -2,-32 -8,-30 Z" fill="#94a3b8" />
              <path d="M10,-8 L22,-2 L10,2 Z" fill="#e2e8f0" />
              {/* Wings spread */}
              <path d="M-20,-20 C-60,-55 -120,-45 -160,-10 C-140,5 -100,20 -60,25 C-100,45 -140,75 -150,110 C-110,85 -60,70 -15,55 Z" fill="url(#silverChrome)" />
              <path d="M20,-20 C60,-55 120,-45 160,-10 C140,5 100,20 60,25 C100,45 140,75 150,110 C110,85 60,70 15,55 Z" fill="url(#silverChrome)" />
              {/* Tail feathers */}
              <path d="M-30,55 L-20,115 L0,95 L20,115 L30,55 Z" fill="#64748b" />
            </g>

            {/* Glowing Halo */}
            <circle cx="200" cy="120" r="70" fill="none" stroke="#64748b" strokeWidth="0.75" opacity="0.25" strokeDasharray="3 4" />

            {/* IMPERIAL Title */}
            <text
              x="200"
              y="110"
              textAnchor="middle"
              className="font-cinzel tracking-[0.22em] font-extrabold"
              fill="url(#silverChrome)"
              fontSize="31"
              style={{ letterSpacing: '0.18em' }}
            >
              IMPERIAL
            </text>

            {/* EAGLE Title */}
            <text
              x="200"
              y="152"
              textAnchor="middle"
              className="font-cinzel tracking-[0.25em] font-black"
              fill="url(#silverChrome)"
              fontSize="34"
              style={{ letterSpacing: '0.22em' }}
            >
              EAGLE
            </text>

            {/* Decorative filigree under text */}
            <path d="M120,172 L185,172 L200,182 L215,172 L280,172" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.6" />
            <polygon points="200,176 196,183 200,190 204,183" fill="#cbd5e1" opacity="0.8" />
          </svg>
        </div>
      );

    case 'bloody-dragon':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#120406] via-[#1a0507] to-[#0a0203] select-none ${className}`}>
          {/* Crimson ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.25)_0%,_transparent_70%)] pointer-events-none" />
          
          <svg viewBox="0 0 400 240" className="w-full h-full max-w-[340px] drop-shadow-[0_15px_30px_rgba(220,38,38,0.35)]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bloodRed" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="30%" stopColor="#ef4444" />
                <stop offset="70%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#450a0a" />
              </linearGradient>
              <linearGradient id="dragonFire" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7f1d1d" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
            </defs>

            {/* Menacing Dragon Silhouette & Horns in Background */}
            <g opacity="0.32" transform="translate(200, 75) scale(0.72)">
              {/* Dragon Head */}
              <path d="M-40,-50 C-10,-60 20,-55 45,-30 C60,-15 75,5 90,25 C70,20 50,22 35,35 C20,48 5,60 -25,55 C-45,50 -60,35 -70,10 C-80,-15 -65,-40 -40,-50 Z" fill="url(#bloodRed)" />
              {/* Horns */}
              <path d="M-30,-45 C-50,-75 -90,-85 -130,-80 C-110,-65 -85,-50 -60,-35 Z" fill="#ef4444" />
              <path d="M20,-45 C40,-75 80,-85 120,-80 C100,-65 75,-50 50,-35 Z" fill="#ef4444" />
              {/* Spikes / Spine */}
              <polygon points="0,-40 -10,-70 5,-50" fill="#f87171" />
              <polygon points="-25,-30 -40,-60 -20,-35" fill="#f87171" />
              <polygon points="25,-30 40,-60 20,-35" fill="#f87171" />
              {/* Glowing Dragon Eyes */}
              <circle cx="-15" cy="-5" r="4" fill="#fef08a" opacity="0.9" />
              <circle cx="20" cy="-5" r="4" fill="#fef08a" opacity="0.9" />
            </g>

            {/* Ornate Blackletter BLOODY */}
            <text
              x="200"
              y="108"
              textAnchor="middle"
              className="font-gothic tracking-wider font-extrabold"
              fill="url(#bloodRed)"
              fontSize="38"
            >
              Bloody
            </text>

            {/* Ornate Blackletter DRAGON */}
            <text
              x="200"
              y="156"
              textAnchor="middle"
              className="font-gothic tracking-wider font-extrabold"
              fill="url(#bloodRed)"
              fontSize="44"
            >
              Dragon
            </text>

            {/* Glowing embers */}
            <circle cx="110" cy="65" r="2" fill="#ef4444" opacity="0.7" />
            <circle cx="290" cy="50" r="1.5" fill="#f87171" opacity="0.8" />
            <circle cx="90" cy="180" r="1.8" fill="#fca5a5" opacity="0.6" />
            <circle cx="310" cy="170" r="2.2" fill="#dc2626" opacity="0.75" />
          </svg>
        </div>
      );

    case 'arctic-bear':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#041019] via-[#061824] to-[#030910] select-none ${className}`}>
          {/* Glacial cyan ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2)_0%,_transparent_75%)] pointer-events-none" />
          
          <svg viewBox="0 0 400 240" className="w-full h-full max-w-[340px] drop-shadow-[0_15px_30px_rgba(56,189,248,0.3)]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#bae6fd" />
                <stop offset="70%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="frostRock" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            {/* Roaring Geometric Polar Bear Head */}
            <g opacity="0.3" transform="translate(200, 72) scale(0.62)">
              {/* Low poly faceted bear head */}
              <polygon points="0,-70 -35,-45 0,-25 35,-45" fill="#e0f2fe" />
              <polygon points="-35,-45 -65,-25 -40,10 0,-25" fill="#bae6fd" />
              <polygon points="35,-45 65,-25 40,10 0,-25" fill="#bae6fd" />
              {/* Snout & Jaws */}
              <polygon points="0,-25 -25,20 0,35 25,20" fill="#38bdf8" />
              <polygon points="-25,20 -40,50 0,65 0,35" fill="#0284c7" />
              <polygon points="25,20 40,50 0,65 0,35" fill="#0284c7" />
              {/* Ears */}
              <polygon points="-55,-55 -80,-50 -60,-25" fill="#7dd3fc" />
              <polygon points="55,-55 80,-50 60,-25" fill="#7dd3fc" />
            </g>

            {/* ARCTIC Typography */}
            <text
              x="200"
              y="110"
              textAnchor="middle"
              className="font-syne font-black tracking-[0.2em]"
              fill="url(#iceGradient)"
              fontSize="34"
              style={{ letterSpacing: '0.18em' }}
            >
              ARCTIC
            </text>

            {/* BEAR Typography */}
            <text
              x="200"
              y="155"
              textAnchor="middle"
              className="font-syne font-black tracking-[0.25em]"
              fill="url(#iceGradient)"
              fontSize="38"
              style={{ letterSpacing: '0.24em' }}
            >
              BEAR
            </text>

            {/* Ice shard accents */}
            <line x1="80" y1="130" x2="110" y2="130" stroke="#7dd3fc" strokeWidth="2" opacity="0.5" />
            <line x1="290" y1="130" x2="320" y2="130" stroke="#7dd3fc" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
      );

    case 'better-jellyfish':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0518] via-[#120826] to-[#05020d] select-none ${className}`}>
          {/* Bioluminescent purple/cyan ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.25)_0%,_transparent_70%)] pointer-events-none" />
          
          <svg viewBox="0 0 400 240" className="w-full h-full max-w-[340px] drop-shadow-[0_15px_30px_rgba(168,85,247,0.35)]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="jellyNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="35%" stopColor="#c084fc" />
                <stop offset="70%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="bellDome" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e879f9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Glowing Translucent Jellyfish Creature */}
            <g opacity="0.4" transform="translate(200, 70) scale(0.65)">
              {/* Bell dome */}
              <path d="M-60,0 C-60,-55 60,-55 60,0 C45,15 15,10 0,15 C-15,10 -45,15 -60,0 Z" fill="url(#bellDome)" />
              {/* Inner organs glow */}
              <ellipse cx="0" cy="-15" rx="20" ry="12" fill="#f43f5e" opacity="0.6" filter="blur(2px)" />
              {/* Tentacles */}
              <path d="M-35,10 Q-50,60 -30,110 Q-15,150 -25,180" fill="none" stroke="#c084fc" strokeWidth="2.5" opacity="0.8" />
              <path d="M-15,12 Q-5,70 -20,120 Q-10,160 -15,190" fill="none" stroke="#e879f9" strokeWidth="2" opacity="0.7" />
              <path d="M15,12 Q5,70 20,120 Q10,160 15,190" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
              <path d="M35,10 Q50,60 30,110 Q15,150 25,180" fill="none" stroke="#818cf8" strokeWidth="2.5" opacity="0.8" />
            </g>

            {/* Fluid Undulating Typography */}
            <text
              x="200"
              y="135"
              textAnchor="middle"
              className="font-display-serif italic font-bold tracking-wide"
              fill="url(#jellyNeon)"
              fontSize="48"
              style={{ fontStyle: 'italic', letterSpacing: '0.04em' }}
            >
              Jellyfish
            </text>

            <text
              x="200"
              y="90"
              textAnchor="middle"
              className="font-syne uppercase font-bold tracking-[0.3em]"
              fill="#c084fc"
              fontSize="12"
              opacity="0.8"
            >
              Better Type Series
            </text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
