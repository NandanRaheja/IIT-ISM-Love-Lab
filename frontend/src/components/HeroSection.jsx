import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = ({ onApplyClick, onCommunityClick }) => {
  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
        {/* Trust Line - Visible First */}
        <p 
          className="text-sm text-zinc-400 mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0s', animationFillMode: 'forwards' }}
        >
          Built by creators. Backed by real AI filmmaking and automation experience.
        </p>

        {/* Main Headline */}
        <h1 
          data-testid="hero-title"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-8 font-outfit leading-[1.1] opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          One Creator. Infinite Output.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            AI Agents That Actually Ship.
          </span>
        </h1>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <button
            data-testid="apply-early-access-button"
            onClick={onApplyClick}
            className="group relative overflow-hidden bg-white text-black rounded-full px-8 py-4 font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Apply for Early Access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            data-testid="join-community-button"
            onClick={onCommunityClick}
            className="bg-white/5 border border-white/10 text-white rounded-full px-8 py-4 font-medium hover:bg-white/10 transition-all flex items-center gap-2"
          >
            Join WhatsApp Community
          </button>
        </div>

        {/* Scarcity Line */}
        <p 
          className="text-sm text-zinc-500 font-mono tracking-wide opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          Limited spots. Rolling access.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
