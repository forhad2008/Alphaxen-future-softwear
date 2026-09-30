import React from 'react';
import { ArrowUpRight, Github, Twitter, Instagram, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040406] border-t border-zinc-900 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-7 h-7 text-white">
                  <polygon points="20,4 36,36 4,36" fill="none" stroke="currentColor" strokeWidth="3" />
                  <polygon points="20,12 30,32 10,32" fill="currentColor" opacity="0.9" />
                  <line x1="12" y1="26" x2="28" y2="26" stroke="#050507" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="text-xl tracking-tight text-white font-medium">
                Alphaxen-<span className="font-bold">FontLab</span>
              </span>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-sm">
              Independent computational type foundry & design studio. Sculpting brutalist, gothic, and high-fashion display typefaces for visionaries worldwide.
            </p>

            <div className="flex items-center space-x-4 pt-2 text-zinc-500">
              <a href="#" className="hover:text-white transition-colors" aria-label="Globe">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 1: FONTS */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold">
              FLAGSHIP FONTS
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#fonts" className="hover:text-white transition-colors">Imperial Eagle</a></li>
              <li><a href="#fonts" className="hover:text-white transition-colors">Bloody Dragon</a></li>
              <li><a href="#fonts" className="hover:text-white transition-colors">Arctic Bear</a></li>
              <li><a href="#fonts" className="hover:text-white transition-colors">Better Jellyfish</a></li>
              <li><a href="#fonts" className="hover:text-white transition-colors">Obsidian Display</a></li>
            </ul>
          </div>

          {/* COLUMN 2: DEVELOPER SUITE */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold">
              DEVELOPER TOOLS
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#tools" className="hover:text-white transition-colors">Vector Font Maker (.OTF)</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">Binary SFNT Inspector</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">Webfont Subsetter (WOFF2)</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">OpenType GSUB Syntax</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">Variable Axes Multi-Lab</a></li>
            </ul>
          </div>

          {/* COLUMN 3: CORPORATE */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold">
              CORPORATE & FOUNDRY
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#about" className="hover:text-white transition-colors">Foundry Pedigree</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Bespoke Commissions</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Enterprise Licensing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Punchcutters Guild</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Security</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>© 2026 Alphaxen-FontLab™. All rights reserved. Registered trademark.</p>
          <p className="flex items-center gap-4">
            <span className="text-red-500">●</span>
            <span>OTF 2.0 Compliant Engine</span>
            <span>Made for Developers & Type Designers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
