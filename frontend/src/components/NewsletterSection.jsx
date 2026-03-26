import React, { useState } from 'react';
import { Zap, CheckCircle, Loader2 } from 'lucide-react';

const interestOptions = [
  { value: '', label: 'Select your interest' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'marketing', label: 'Marketing & Sales' },
  { value: 'creativity', label: 'Creativity' },
  { value: 'social', label: 'Social & Community' },
  { value: 'finance', label: 'Finance' },
  { value: 'filmmaking', label: 'AI Filmmaking' },
  { value: 'personal-brand', label: 'Personal Brand' },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate submission (UI-only)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section 
      data-testid="newsletter-section"
      id="newsletter"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 mb-8">
          <Zap className="w-6 h-6 text-purple-400" />
        </div>

        {/* Title */}
        <h2 
          data-testid="newsletter-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 font-outfit leading-[1.1]"
        >
          Stop Collecting AI Tools.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Start Building Systems.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-zinc-400 mb-4 leading-relaxed">
          Everyone is sharing tools. That phase is over.
          <br className="hidden sm:block" />
          We break down how AI agents actually work—and how to use them to execute, not just experiment.
        </p>

        {/* Supporting Line */}
        <p className="text-sm text-zinc-500 mb-10 max-w-lg mx-auto">
          Join a small group of creators getting actionable breakdowns on AI workflows, agents, and real execution strategies.
        </p>

        {/* Form or Success Message */}
        {isSubmitted ? (
          <div 
            data-testid="newsletter-success"
            className="bg-[#12121A]/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2 font-outfit">
              You're in.
            </h3>
            <p className="text-zinc-400 text-sm">
              We'll send you practical breakdowns—not noise.
            </p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-5"
          >
            {/* Microcopy */}
            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 mb-2">
              <span>No spam. Only execution.</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span>Built for serious creators</span>
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                data-testid="newsletter-email-input"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center"
              />
            </div>

            {/* Interest Dropdown */}
            <div>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                data-testid="newsletter-interest-select"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer text-center"
              >
                {interestOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className="bg-[#12121A] text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !email}
              data-testid="newsletter-submit-button"
              className="w-full group relative overflow-hidden bg-white text-black rounded-full px-8 py-4 font-semibold transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Get Agent Breakdowns
                </>
              )}
            </button>

            {/* Bottom Microcopy */}
            <p className="text-xs text-zinc-600 italic">
              "Tools don't build. Systems do."
            </p>
          </form>
        )}

        {/* Additional Microcopy */}
        <p className="mt-6 text-xs text-zinc-600">
          Learn how to actually use AI agents
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
