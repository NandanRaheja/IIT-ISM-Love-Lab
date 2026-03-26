import React from 'react';
import { FileText, UserCheck, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Apply',
    description: 'Tell us about your content and goals',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Get Selected',
    description: 'We onboard creators in batches',
    icon: UserCheck,
  },
  {
    number: '03',
    title: 'Deploy Agents',
    description: 'Start creating, growing, monetizing',
    icon: Rocket,
  },
];

const HowItWorksSection = () => {
  return (
    <section 
      data-testid="how-it-works-section"
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
            Process
          </p>
          <h2 
            data-testid="how-it-works-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 font-outfit"
          >
            From Idea to Income
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-1/2" />
          
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-testid={`step-card-${index}`}
              className="relative group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 h-full">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent font-outfit">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-purple-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-medium tracking-tight text-white mb-3 font-outfit">
                  {step.title}
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
