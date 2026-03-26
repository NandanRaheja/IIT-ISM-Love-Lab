import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

const CommunitySection = ({ onApplyClick }) => {
  return (
    <section 
      data-testid="community-section"
      id="community"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 mb-8">
          <Users className="w-8 h-8 text-purple-400" />
        </div>

        {/* Content */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
          Founding Creators
        </p>
        <h2 
          data-testid="community-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 font-outfit"
        >
          Join the First Wave
        </h2>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Early creators will shape DeployrAI, get priority access, and join a high-growth AI creator community. Be part of something selective.
        </p>

        {/* CTA */}
        <button
          data-testid="become-founder-button"
          onClick={onApplyClick}
          className="group relative overflow-hidden bg-white text-black rounded-full px-8 py-4 font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] inline-flex items-center gap-2"
        >
          Become a Founding Creator
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Trust badges */}
        <div className="mt-12 flex items-center justify-center gap-8 text-zinc-600">
          <span className="text-sm">No coding required</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-sm">Execution-first AI</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-sm">Rolling admissions</span>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
