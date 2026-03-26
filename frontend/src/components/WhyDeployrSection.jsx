import React from 'react';
import { Zap, Users, Award, Layers, Cpu } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Execution > Ideas',
    description: 'We don\'t just ideate. Our agents execute and deliver real outputs you can use immediately.'
  },
  {
    icon: Users,
    title: 'Built for Creators',
    description: 'Designed specifically for content creators, filmmakers, and digital builders who need results.'
  },
  {
    icon: Award,
    title: 'Real Experience',
    description: 'Built by creators with proven AI filmmaking and automation experience. Not theory—practice.'
  },
  {
    icon: Layers,
    title: 'All-in-One System',
    description: 'From trends to scripts to monetization—one integrated system of AI agents working together.'
  },
  {
    icon: Cpu,
    title: 'Future-Ready',
    description: 'As AI evolves, so do your agents. Always updated with the latest capabilities.'
  }
];

const WhyDeployrSection = () => {
  return (
    <section 
      data-testid="why-deployr-section"
      id="why"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Sticky Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
              Why DeployrAI
            </p>
            <h2 
              data-testid="why-deployr-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 font-outfit leading-[1.1]"
            >
              Not Another AI Tool.
              <br />
              <span className="text-zinc-400">A Complete Execution System.</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed mb-8">
              Stop collecting AI tools. Start deploying AI agents that actually work together to create, grow, and monetize your content.
            </p>
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white font-outfit">5+</span>
              </div>
              <div>
                <p className="text-white font-medium">Specialized Agents</p>
                <p className="text-sm text-zinc-500">Working in sync</p>
              </div>
            </div>
          </div>

          {/* Right Column - Scrolling Benefits */}
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                data-testid={`reason-card-${index}`}
                className="group bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-white mb-2 font-outfit">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDeployrSection;
