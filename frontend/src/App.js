import React, { useState } from 'react';
import '@/App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AgentsSection from './components/AgentsSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyDeployrSection from './components/WhyDeployrSection';
import ResultsSection from './components/ResultsSection';
import OutputProofSection from './components/OutputProofSection';
import CommunitySection from './components/CommunitySection';
import WaitlistForm from './components/WaitlistForm';
import DualCTASection from './components/DualCTASection';
import ViralLoopSection from './components/ViralLoopSection';
import Footer from './components/Footer';
import AgentDemo from './components/AgentDemo';

// WhatsApp community link (placeholder)
const WHATSAPP_LINK = 'https://chat.whatsapp.com/placeholder-invite-link';

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };

  const openDemo = () => {
    setIsDemoOpen(true);
  };

  return (
    <div className="deployr-app">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header onApplyClick={scrollToWaitlist} />
      
      {/* Hero Section */}
      <HeroSection 
        onApplyClick={scrollToWaitlist} 
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
      
      {/* Community Section */}
      <CommunitySection onApplyClick={scrollToWaitlist} />
      
      {/* Waitlist Form */}
      <WaitlistForm />
      
      {/* Dual CTA Section */}
      <DualCTASection 
        onApplyClick={scrollToWaitlist} 
        onCommunityClick={openWhatsApp}
      />
      
      {/* Viral Loop */}
      <ViralLoopSection />
      
      {/* Footer */}
      <Footer />

      {/* Agent Demo Modal */}
      <AgentDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

export default App;
