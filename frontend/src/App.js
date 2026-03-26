import React from 'react';
import '@/App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import OutputProofSection from './components/OutputProofSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="deployr-app">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Output Proof Section */}
      <div id="proof">
        <OutputProofSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
