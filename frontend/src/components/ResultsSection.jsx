import React from 'react';

const results = [
  { metric: '10x', label: 'Content Output' },
  { metric: '5x', label: 'Faster Execution' },
  { metric: '100%', label: 'Growth System' },
  { metric: 'Clear', label: 'Monetization Path' }
];

const ResultsSection = () => {
  return (
    <section 
      data-testid="results-section"
      id="results"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
            Outcomes
          </p>
          <h2 
            data-testid="results-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 font-outfit"
          >
            What You Unlock
          </h2>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <div
              key={result.label}
              data-testid={`result-card-${index}`}
              className="bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center hover:border-purple-500/30 transition-all duration-500 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent font-outfit mb-3">
                {result.metric}
              </div>
              <p className="text-sm text-zinc-400 font-medium">
                {result.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
