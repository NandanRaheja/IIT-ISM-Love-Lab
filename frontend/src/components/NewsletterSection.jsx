import React, { useState } from 'react';
import { Zap, CheckCircle, Loader2 } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
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
      
      <div className="relative z-10 max-w-xl mx-auto px-6 md:px-8 text-center">
        {/* Title */}
        <h2 
          data-testid="newsletter-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-4 font-outfit"
        >
          Get AI Agent Breakdowns
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-zinc-400 mb-8">
          Actionable workflows. No fluff.
        </p>

        {/* Form or Success Message */}
        {isSubmitted ? (
          <div 
            data-testid="newsletter-success"
            className="bg-[#12121A]/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1 font-outfit">
              You're in!
            </h3>
            <p className="text-zinc-400 text-sm">
              Check your inbox soon.
            </p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              data-testid="newsletter-email-input"
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !email}
              data-testid="newsletter-submit-button"
              className="bg-white text-black rounded-full px-6 py-3 font-semibold transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
