import React from 'react';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

const DualCTASection = ({ onApplyClick, onCommunityClick }) => {
  return (
    <section 
      data-testid="dual-cta-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            data-testid="dual-cta-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 font-outfit"
          >
            Choose Your Entry Point
          </h2>
          <p className="text-base text-zinc-400 max-w-lg mx-auto">
            Serious creators don't wait. They either apply or get inside the circle.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Early Access Card */}
          <div
            data-testid="early-access-card"
            className="group bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-white mb-3 font-outfit">
                Apply for Early Access
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Get full access to DeployrAI and be among the first creators using AI agents.
              </p>
              <button
                onClick={onApplyClick}
                data-testid="apply-now-button"
                className="group/btn relative overflow-hidden bg-white text-black rounded-full px-6 py-3 font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Community Card */}
          <div
            data-testid="community-card"
            className="group bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-white mb-3 font-outfit">
                Join WhatsApp Community
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Get updates, early drops, and connect with other builders.
              </p>
              <button
                onClick={onCommunityClick}
                data-testid="join-community-button"
                className="bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                Join Community
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Urgency Line */}
        <p className="text-center text-sm text-zinc-500 mt-8 font-mono">
          Limited access. Community fills fast.
        </p>
      </div>
    </section>
  );
};

export default DualCTASection;
