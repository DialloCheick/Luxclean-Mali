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
      <Footer />

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
