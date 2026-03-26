import React from 'react';
import { ArrowDown, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="grid-pattern" />
      
      {/* Gradient orbs */}
      <div className="bg-glow-orb purple" style={{ 
        width: '800px', 
        height: '800px', 
        top: '-300px', 
        left: '50%',
        transform: 'translateX(-50%)'
      }} />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0s', animationFillMode: 'forwards' }}
        >
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-mono text-purple-300 tracking-wide">
            VibeCon 2025 Submission
          </span>
        </div>

        {/* Main Headline */}
        <h1 
          data-testid="hero-title"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 font-outfit opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Deploy
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">AI</span>
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl text-white/80 font-light">
            Agents at Scale
          </span>
        </h1>

        {/* Subheadline */}
        <p 
          data-testid="hero-subtitle"
          className="text-base md:text-lg lg:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          From script to visual output—AI-powered workflows that produce 
          real, high-quality content. No theory. Just results.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          <a
            href="#proof"
            data-testid="hero-cta-primary"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow"
          >
            See the Proof
          </a>
          <a
            href="#about"
            data-testid="hero-cta-secondary"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-base hover:bg-white/10 hover:border-purple-500/30 transition-all"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div 
          className="flex flex-col items-center gap-2 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center pt-2 animate-float">
            <ArrowDown className="w-4 h-4 text-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
