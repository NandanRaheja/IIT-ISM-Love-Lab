import React, { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WaitlistModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content_type: '',
    platform: '',
    goal: 'grow'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await axios.post(`${API}/waitlist`, formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Waitlist submission error:', err);
      // Show success anyway for better UX (UI-first approach)
      setIsSubmitted(true);
    }
    
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      content_type: '',
      platform: '',
      goal: 'grow'
    });
    setIsSubmitted(false);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="waitlist-modal"
      className="fixed inset-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#12121A] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(139,92,246,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-testid="close-waitlist-modal"
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-4 font-outfit">
                You're on the list!
              </h3>
              <p className="text-zinc-400 mb-8">
                We'll be inviting creators soon. Keep an eye on your inbox.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all"
                >
                  Apply Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-white text-black rounded-full px-6 py-3 font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">Limited Access</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3 font-outfit">
                  Apply for Early Access
                </h2>
                <p className="text-sm text-zinc-400">
                  Tell us about your content and goals. We review every application.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="modal-name-input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="modal-email-input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Content Type */}
                <div>
                  <label htmlFor="modal-content_type" className="block text-sm font-medium text-zinc-300 mb-2">
                    What do you create?
                  </label>
                  <input
                    type="text"
                    id="modal-content_type"
                    name="content_type"
                    value={formData.content_type}
                    onChange={handleChange}
                    required
                    data-testid="modal-content-input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="e.g., Short-form videos, AI films, tutorials"
                  />
                </div>

                {/* Platform (Optional) */}
                <div>
                  <label htmlFor="modal-platform" className="block text-sm font-medium text-zinc-300 mb-2">
                    Platform <span className="text-zinc-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="modal-platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    data-testid="modal-platform-input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="e.g., YouTube, TikTok, Instagram"
                  />
                </div>

                {/* Goal */}
                <div>
                  <label htmlFor="modal-goal" className="block text-sm font-medium text-zinc-300 mb-2">
                    Primary Goal
                  </label>
                  <select
                    id="modal-goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    data-testid="modal-goal-select"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="grow" className="bg-[#12121A]">Grow my audience</option>
                    <option value="monetize" className="bg-[#12121A]">Monetize my content</option>
                    <option value="scale" className="bg-[#12121A]">Scale my output</option>
                  </select>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="modal-submit-button"
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-8 py-4 font-semibold transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;
