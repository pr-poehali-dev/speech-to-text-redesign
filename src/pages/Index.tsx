import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DemoSection from '@/components/DemoSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import ApiSection from '@/components/ApiSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function Index() {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  return (
    <div className="min-h-screen bg-[#060a0f] text-white">
      <Navbar onAuthOpen={setAuthMode} />
      <HeroSection onAuthOpen={setAuthMode} />
      <DemoSection />
      <FeaturesSection />
      <PricingSection />
      <ApiSection />
      <ContactSection />
      <Footer />

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onModeSwitch={setAuthMode}
        />
      )}
    </div>
  );
}
