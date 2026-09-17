import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCatalog } from './components/ServiceCatalog';
import { QuoteCalculator } from './components/QuoteCalculator';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { TikTokSection } from './components/TikTokSection';
import { BookingSection } from './components/BookingSection';
import { LocalPayments } from './components/LocalPayments';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PreDeploymentMediaManager } from './components/PreDeploymentMediaManager';
import { initImageStore } from './config/siteImages';
import { ServiceItem } from './types';
import { Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [selectedCategoryForQuote, setSelectedCategoryForQuote] = useState<string>('tapis');
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [, setMediaVersion] = useState(0);

  // Initialize durable image store from IndexedDB
  useEffect(() => {
    initImageStore();
  }, []);

  // Keyboard shortcut (Alt + M) or URL param (?media=1) to open media manager
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        setIsMediaManagerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('media') === '1' || params.get('admin') === 'media') {
        setIsMediaManagerOpen(true);
      }
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (service: ServiceItem) => {
    setSelectedCategoryForQuote(service.category);
    scrollToSection('devis');
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setSelectedServiceForBooking(service.id);
    scrollToSection('reservation');
  };

  const handleImagesUpdated = () => {
    setMediaVersion((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col selection:bg-[#C5A869] selection:text-[#060B16]">
      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => scrollToSection('reservation')}
        onOpenQuote={() => scrollToSection('devis')}
        onOpenMediaManager={() => setIsMediaManagerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => scrollToSection('devis')}
          onOpenBooking={() => scrollToSection('reservation')}
        />

        {/* Services Showcase */}
        <ServiceCatalog
          onSelectServiceForQuote={handleSelectServiceForQuote}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Online Quote Calculator with FCFA & WhatsApp */}
        <QuoteCalculator initialCategory={selectedCategoryForQuote} />

        {/* Interactive Before / After Gallery */}
        <BeforeAfterGallery />

        {/* TikTok Showcase Section (@luxcleanmali223) */}
        <TikTokSection />

        {/* Quick Booking Section */}
        <BookingSection preselectedServiceId={selectedServiceForBooking} />

        {/* Local Payment Options (Orange Money, Wave, Moov, Cash) */}
        <LocalPayments />

        {/* Client Testimonials (Bamako) */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenMediaManager={() => setIsMediaManagerOpen(true)} />

      {/* Floating Quick-Access Image Manager Button */}
      <button
        id="floating-image-manager-btn"
        onClick={() => setIsMediaManagerOpen(true)}
        className="fixed bottom-20 lg:bottom-6 left-4 z-40 px-3.5 py-2.5 bg-[#070e1f]/95 hover:bg-[#0f1d3e] text-white border-2 border-[#C5A869] hover:border-[#DFC792] rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-bold transition-all transform hover:scale-105 cursor-pointer group"
        title="Ouvrir le gestionnaire pour modifier et téléverser toutes les images du site"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A869] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C5A869]"></span>
        </span>
        <ImageIcon className="w-4 h-4 text-[#C5A869] group-hover:rotate-12 transition-transform" />
        <span className="text-[#DFC792] font-semibold">📸 Gestionnaire d'Images</span>
      </button>

      {/* Sticky Mobile Smartphone Action Bar */}
      <MobileBottomBar
        onOpenQuote={() => scrollToSection('devis')}
        onOpenBooking={() => scrollToSection('reservation')}
      />

      {/* Hidden Pre-Deployment Media Manager Modal */}
      <PreDeploymentMediaManager
        isOpen={isMediaManagerOpen}
        onClose={() => setIsMediaManagerOpen(false)}
        onImagesUpdated={handleImagesUpdated}
      />
    </div>
  );
}
