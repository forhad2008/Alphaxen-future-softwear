import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowRight, Menu, X, Sliders, PenTool, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenFontMaker: () => void;
  onOpenStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenFontMaker,
  onOpenStudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fonts', label: 'Fonts' },
    { id: 'about', label: 'About' },
    { id: 'tools', label: 'Tools' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050507]/80 backdrop-blur-md border-b border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Custom Stylized Logo Icon (matching the image) */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-white">
              {/* Sharp triangle with inner negative space matching Alphaxen symbol */}
              <polygon points="20,4 36,36 4,36" fill="none" stroke="currentColor" strokeWidth="3" />
              <polygon points="20,12 30,32 10,32" fill="currentColor" opacity="0.9" />
              <line x1="12" y1="26" x2="28" y2="26" stroke="#050507" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="text-xl tracking-tight text-white font-medium select-none">
            Alphaxen-<span className="font-bold">FontLab</span>
          </span>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-sm tracking-wide transition-colors py-1 cursor-pointer ${
                  isActive ? 'text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Direct Launch to Studio App */}
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-red-500/40 text-red-400 hover:text-white hover:bg-red-950/40 text-xs font-mono tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.25)]"
              title="Launch Alphaxen-FontLab Studio Application"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>FONTLAB APP</span>
            </button>
          )}

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-zinc-800/50"
            title="Search Fonts & Glyphs"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-zinc-800/50 flex items-center"
            title="Commercial Cart"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="ml-1 text-xs font-semibold text-zinc-300">
              {cartCount}
            </span>
          </button>

          {/* Get Started Button (Pill red button as in image) */}
          <button
            onClick={onOpenFontMaker}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-900/60 bg-gradient-to-r from-red-700/80 via-red-600/90 to-red-700/80 text-white text-xs sm:text-sm font-semibold hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] transition-all cursor-pointer group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090d]/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-zinc-800/80">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm ${
                  activeTab === item.id
                    ? 'bg-red-950/40 text-red-400 border border-red-800/40 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {onOpenStudio && (
              <button
                onClick={() => {
                  onOpenStudio();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-zinc-900 border border-red-600/50 text-red-400 font-semibold text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Launch ALPHAXEN-FONTLAB Software</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenFontMaker();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-red-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            >
              <PenTool className="w-4 h-4" />
              <span>Vector OTF Maker</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
