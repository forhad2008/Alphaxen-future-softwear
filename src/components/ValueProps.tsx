import React from 'react';
import { Sparkles, FileCode, ShieldCheck, LifeBuoy, Gem } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-red-500/20 stroke-current" strokeWidth="1.8">
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
        </svg>
      ),
      title: 'PREMIUM QUALITY',
      description: 'Meticulous craftsmanship in every glyph.'
    },
    {
      icon: <FileCode className="w-5 h-5 text-red-500 stroke-[1.8]" />,
      title: 'MULTI FORMAT',
      description: 'OTF / TTF / Webfont Ready'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-500 stroke-[1.8]" />,
      title: 'COMMERCIAL LICENSE',
      description: 'For personal & professional use.'
    },
    {
      icon: <LifeBuoy className="w-5 h-5 text-red-500 stroke-[1.8]" />,
      title: 'DEDICATED SUPPORT',
      description: "We're here to help always."
    },
    {
      icon: <Gem className="w-5 h-5 text-red-500 stroke-[1.8]" />,
      title: 'TRUSTED BY CREATORS',
      description: 'Designers, brands & studios worldwide.'
    }
  ];

  return (
    <section className="relative border-y border-zinc-900 bg-[#07070a]/95 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900">
          {values.map((val, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-4 ${idx > 0 ? 'pt-5 lg:pt-0 lg:pl-6' : ''}`}
            >
              <div className="mt-0.5 shrink-0 p-2 rounded-lg bg-red-950/20 border border-red-900/30">
                {val.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-mono font-bold tracking-wider text-zinc-100 uppercase">
                  {val.title}
                </h3>
                <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
