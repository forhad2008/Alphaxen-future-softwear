import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';

interface StoryVideoModalProps {
  onClose: () => void;
}

export const StoryVideoModal: React.FC<StoryVideoModalProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const storySlides = [
    {
      time: '0:00 - 0:24',
      title: 'The Obsidian Genesis',
      subtitle: 'Where Metallurgy Meets Typography',
      narrative: 'Deep in the volcanic valleys of Iceland, our founders discovered how cooling obsidian fractures mirror the tension lines of Renaissance calligraphy. We set out to bridge primordial mineral geology with mathematical type design.'
    },
    {
      time: '0:25 - 0:52',
      title: 'Precision Punchcutting Guild',
      subtitle: 'From Steel Punches to OpenType SFNT Tables',
      narrative: 'Every letterform begins as a hand-drawn vector skeleton. We calibrate optical sizes from 6pt caption hints to 120pt monumental display cuts, preserving organic brutality without compromising digital legibility.'
    },
    {
      time: '0:53 - 1:18',
      title: 'Bespoke Identities for the Vanguard',
      subtitle: 'Crafting Voices for Global Icons',
      narrative: 'Over the past decade, Alphaxen-FontLab has authored the typographic identities behind cinematic space epics, avant-garde Parisian luxury houses, and cyberpunk video games played by millions.'
    },
    {
      time: '1:19 - 1:42',
      title: 'The Future of Computational Type',
      subtitle: '100% In-Browser Vector & OpenType Tooling',
      narrative: 'We believe punchcutting tools belong in the hands of every developer and creator. Today, our in-browser OTF engine democratizes font engineering worldwide.'
    }
  ];

  // Ambient sound synthesizer using Web Audio API
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % storySlides.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime); // Low cinematic A2 drone
      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      audioCtxRef.current = ctx;
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsMuted(false);
    } else {
      if (isMuted) {
        gainNodeRef.current?.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
        setIsMuted(false);
      } else {
        gainNodeRef.current?.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const slide = storySlides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#08080c] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* TOP BAR */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
              ALPHAXEN ARCHIVES // FILM REEL 1:42
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CINEMATIC VIDEO STAGE */}
        <div className="relative w-full h-[380px] sm:h-[460px] bg-gradient-to-b from-[#140609] via-[#09090d] to-[#040406] flex items-center justify-center overflow-hidden p-8 sm:p-12 text-center select-none">
          {/* Background animated fiery glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.2)_0%,_transparent_75%)] pointer-events-none" />

          {/* Obsidian Rock Fissure Graphic */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full max-w-[600px]">
              <circle cx="250" cy="250" r="180" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="6 6" />
              <text x="250" y="270" textAnchor="middle" fill="#ffffff" fontSize="120" fontFamily="serif" fontWeight="bold">
                A
              </text>
            </svg>
          </div>

          {/* Slide Narrative Overlay */}
          <div className="relative z-10 max-w-2xl space-y-4 transition-all duration-700">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-red-400 font-bold block">
              {slide.time} — {slide.subtitle}
            </span>

            <h2 className="font-display-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {slide.title}
            </h2>

            <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl mx-auto">
              "{slide.narrative}"
            </p>
          </div>

          {/* Bottom video controls */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 hover:border-red-500 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={toggleSound}
                className="w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 hover:border-red-500 text-white flex items-center justify-center transition-all cursor-pointer"
                title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-red-400" />}
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {storySlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'w-8 bg-red-600' : 'w-2 bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
