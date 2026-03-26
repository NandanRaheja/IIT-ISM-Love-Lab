import React, { useState } from 'react';
import { Sparkles, CheckCircle, Loader2 } from 'lucide-react';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content_type: '',
    platform: '',
    goal: 'grow'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call (UI-only for now)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section 
        data-testid="waitlist-section"
        id="waitlist"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 text-center">
          <div className="bg-[#12121A]/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 font-outfit">
              You're on the list!
            </h3>
            <p className="text-zinc-400">
              We'll be inviting creators soon. Keep an eye on your inbox.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      data-testid="waitlist-section"
      id="waitlist"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
            Limited Access
          </p>
          <h2 
            data-testid="waitlist-title"
            className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4 font-outfit"
          >
            Apply for Early Access
          </h2>
          <p className="text-base text-zinc-400">
            Tell us about your content and goals. We review every application.
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              data-testid="form-name-input"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              data-testid="form-email-input"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>

          {/* Content Type */}
          <div>
            <label htmlFor="content_type" className="block text-sm font-medium text-zinc-300 mb-2">
              What do you create?
            </label>
            <input
              type="text"
              id="content_type"
              name="content_type"
              value={formData.content_type}
              onChange={handleChange}
              required
              data-testid="form-content-input"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="e.g., Short-form videos, AI films, tutorials"
            />
          </div>

          {/* Platform (Optional) */}
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-zinc-300 mb-2">
              Platform <span className="text-zinc-500">(optional)</span>
            </label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              data-testid="form-platform-input"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="e.g., YouTube, TikTok, Instagram"
            />
          </div>

          {/* Goal */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-zinc-300 mb-2">
              Primary Goal
            </label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              data-testid="form-goal-select"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="grow" className="bg-[#12121A]">Grow my audience</option>
              <option value="monetize" className="bg-[#12121A]">Monetize my content</option>
              <option value="scale" className="bg-[#12121A]">Scale my output</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="form-submit-button"
            className="w-full group relative overflow-hidden bg-white text-black rounded-full px-8 py-4 font-semibold transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Request Access
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;
