/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingToolbar } from './components/FloatingToolbar';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { FeaturedCreations } from './components/FeaturedCreations';
import { MoreThanFonts } from './components/MoreThanFonts';
import { FontManagerSuite } from './components/tools/FontManagerSuite';
import { AboutPortfolio } from './components/AboutPortfolio';
import { Footer } from './components/Footer';
import { FontSpecimenModal } from './components/modals/FontSpecimenModal';
import { StoryVideoModal } from './components/modals/StoryVideoModal';
import { CartModal } from './components/modals/CartModal';
import { SearchModal } from './components/modals/SearchModal';
import { AlphaxenFontStudio } from './components/editor/AlphaxenFontStudio';
import { FontItem } from './types/fontLab';
import { FEATURED_FONTS } from './data/fontsData';

export default function App() {
  const [appMode, setAppMode] = useState<'foundry' | 'studio'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'studio' || window.location.hash === '#studio') {
        return 'studio';
      }
    }
    return 'foundry';
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'studio' || window.location.hash === '#studio') {
        setAppMode('studio');
      } else {
        setAppMode('foundry');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenStudio = () => {
    setAppMode('studio');
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'studio');
    window.history.pushState(null, '', url.toString());
  };

  const handleBackToFoundry = () => {
    setAppMode('foundry');
    const url = new URL(window.location.href);
    url.searchParams.delete('mode');
    window.history.pushState(null, '', url.pathname);
  };

  const handleOpenStudioInNewWindow = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'studio');
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedFont, setSelectedFont] = useState<FontItem | null>(null);
  const [storyModalOpen, setStoryModalOpen] = useState<boolean>(false);
  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<{ font: FontItem; licenseId: string; price: number }>>([
    { font: FEATURED_FONTS[0], licenseId: 'desktop', price: 49 }
  ]);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const handleAddToCart = (font: FontItem, licenseId: string) => {
    const multipliers: Record<string, number> = {
      desktop: 1,
      web: 1.5,
      app: 2.5,
      enterprise: 6
    };
    const mult = multipliers[licenseId] || 1;
    const price = Math.round(font.price * mult);

    setCartItems((prev) => [...prev, { font, licenseId, price }]);
    setCartModalOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFloatingTool = (toolId: string) => {
    setActiveToolId(toolId);
    if (toolId === 'highlight') {
      scrollToSection('about');
    } else if (toolId === 'specimen') {
      setSelectedFont(FEATURED_FONTS[0]);
    } else if (toolId === 'font-maker') {
      handleOpenStudio();
    } else if (toolId === 'converter') {
      handleOpenStudio();
    } else if (toolId === 'inspector') {
      handleOpenStudio();
    } else if (toolId === 'variable') {
      handleOpenStudio();
    } else if (toolId === 'bespoke') {
      scrollToSection('contact');
    }
  };

  if (appMode === 'studio') {
    return <AlphaxenFontStudio onBackToFoundry={handleBackToFoundry} />;
  }

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#e2e8f0] selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* 1. TOP NAVIGATION */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        onOpenCart={() => setCartModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFontMaker={handleOpenStudio}
        onOpenStudio={handleOpenStudio}
      />

      {/* 2. FLOATING RIGHT VERTICAL DOCK (from image.png) */}
      <FloatingToolbar
        activeTool={activeToolId}
        onSelectTool={handleSelectFloatingTool}
      />

      {/* 3. HERO SECTION (centered container, bg.png background, 3D letter 'A' render) */}
      <Hero
        onExploreFonts={() => scrollToSection('fonts')}
        onWatchStory={() => setStoryModalOpen(true)}
        onOpenStudio={handleOpenStudio}
      />

      {/* 4. VALUE PROPOSITION BAR (5 features from image.png) */}
      <ValueProps />

      {/* 5. FEATURED CREATIONS (Our Latest Creations grid from image.png) */}
      <FeaturedCreations
        onSelectFont={(font) => setSelectedFont(font)}
        onOpenFontMaker={handleOpenStudio}
        onOpenStudioInNewWindow={handleOpenStudioInNewWindow}
        onViewAllFonts={() => scrollToSection('fonts')}
      />

      {/* 6. MORE THAN FONTS (Bottom strip from image.png) */}
      <MoreThanFonts
        onSelectCategory={(category) => {
          if (category === 'fonts') scrollToSection('fonts');
          else scrollToSection('about');
        }}
        onExploreWorld={() => scrollToSection('about')}
      />

      {/* 7. COMPLETE DEVELOPER & FONT MAKER ENGINEERING SUITE */}
      <FontManagerSuite onOpenStudio={handleOpenStudio} />

      {/* 8. CORPORATE PORTFOLIO & FOUNDRY PEDIGREE */}
      <AboutPortfolio />

      {/* 9. FOOTER */}
      <Footer />

      {/* MODALS */}
      {selectedFont && (
        <FontSpecimenModal
          font={selectedFont}
          onClose={() => setSelectedFont(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {storyModalOpen && (
        <StoryVideoModal
          onClose={() => setStoryModalOpen(false)}
        />
      )}

      {cartModalOpen && (
        <CartModal
          items={cartItems}
          onClose={() => setCartModalOpen(false)}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
        />
      )}

      {searchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelectFont={(font) => setSelectedFont(font)}
        />
      )}

    </div>
  );
}
