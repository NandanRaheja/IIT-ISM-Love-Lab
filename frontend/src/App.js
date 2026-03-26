import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AgentsSection from './components/AgentsSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyDeployrSection from './components/WhyDeployrSection';
import ResultsSection from './components/ResultsSection';
import OutputProofSection from './components/OutputProofSection';
import NewsletterSection from './components/NewsletterSection';
import CommunitySection from './components/CommunitySection';
import DualCTASection from './components/DualCTASection';
import ViralLoopSection from './components/ViralLoopSection';
import Footer from './components/Footer';
import AgentDemo from './components/AgentDemo';
import LearnPage from './components/LearnPage';
import FloatingLearnButton from './components/FloatingLearnButton';
import WaitlistModal from './components/WaitlistModal';
import FloatingChatbot from './components/FloatingChatbot';

// WhatsApp community link (placeholder)
const WHATSAPP_LINK = 'https://chat.whatsapp.com/placeholder-invite-link';

// Home page component
const HomePage = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlistModal = () => {
    setIsWaitlistOpen(true);
  };

  const openWhatsApp = () => {
    window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="deployr-app">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header onApplyClick={openWaitlistModal} />
      
      {/* Hero Section */}
      <HeroSection 
        onApplyClick={openWaitlistModal} 
        onCommunityClick={openWhatsApp}
      />
      
      {/* Agents Section */}
      <AgentsSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Output Proof Section - "Built With the System" */}
      <div id="proof">
        <OutputProofSection />
      </div>
      
      {/* Why DeployrAI */}
      <WhyDeployrSection />
      
      {/* Results Section */}
      <ResultsSection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* Community Section */}
      <CommunitySection onApplyClick={openWaitlistModal} />
      
      {/* Dual CTA Section */}
      <DualCTASection 
        onApplyClick={openWaitlistModal} 
        onCommunityClick={openWhatsApp}
      />
      
      {/* Viral Loop */}
      <ViralLoopSection />
      
      {/* Footer */}
      <Footer />

      {/* Agent Demo Modal */}
      <AgentDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      
      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      {/* Floating Learn Button */}
      <FloatingLearnButton />
      
      {/* Floating AI Chatbot */}
      <FloatingChatbot />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
