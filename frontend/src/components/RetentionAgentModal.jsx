import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2, Timer, Sparkles, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RetentionAgentModal = ({ isOpen, onClose }) => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [contentType, setContentType] = useState('short-form video');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post(`${API}/agents/retention`, {
        niche: niche,
        platform: platform,
        content_type: contentType
      }, { timeout: 120000 });

      if (response.data.success && response.data.data) {
        setResults(response.data.data);
      } else if (response.data) {
        // Handle direct response format
        setResults(response.data);
      } else {
        setError('No results returned from agent');
      }
    } catch (err) {
      console.error('Retention Agent error:', err);
      setError(err.response?.data?.detail || 'Failed to analyze retention strategies. Please try again.');
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setResults(null);
    setNiche('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="retention-agent-modal"
      className="fixed inset-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#12121A] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(59,130,246,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-testid="close-retention-agent"
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#12121A] rounded-[14px] flex items-center justify-center">
                <Timer className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-medium text-white font-outfit">
                Retention Strategy Agent
              </h2>
              <p className="text-sm text-zinc-400">
                Optimizes watch time and keeps viewers hooked
              </p>
            </div>
          </div>

          {!results ? (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    What's your niche?
                  </label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., AI filmmaking, fitness, tech reviews"
                    data-testid="retention-niche"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      data-testid="retention-platform"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                      disabled={isLoading}
                    >
                      <option value="YouTube" className="bg-[#12121A]">YouTube</option>
                      <option value="TikTok" className="bg-[#12121A]">TikTok</option>
                      <option value="Instagram" className="bg-[#12121A]">Instagram</option>
                      <option value="LinkedIn" className="bg-[#12121A]">LinkedIn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Content Type
                    </label>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      data-testid="retention-content-type"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                      disabled={isLoading}
                    >
                      <option value="short-form video" className="bg-[#12121A]">Short-form Video</option>
                      <option value="long-form video" className="bg-[#12121A]">Long-form Video</option>
                      <option value="reels" className="bg-[#12121A]">Reels/Shorts</option>
                      <option value="tutorial" className="bg-[#12121A]">Tutorial</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !niche.trim()}
                  data-testid="run-retention-agent"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-6 py-4 font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Retention...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Optimize Retention
                    </>
                  )}
                </button>

                {isLoading && (
                  <p className="text-center text-xs text-zinc-500">
                    This may take up to 60 seconds...
                  </p>
                )}
              </form>
            </>
          ) : (
            /* Results */
            <div data-testid="retention-results" className="space-y-6">
              {/* Retention Hooks */}
              {results.retention_hooks && results.retention_hooks.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    Hook Techniques (First 3 Seconds)
                  </h3>
                  <ul className="space-y-3">
                    {results.retention_hooks.map((hook, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{hook}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Engagement Tactics */}
              {results.engagement_tactics && results.engagement_tactics.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-cyan-400" />
                    Engagement Tactics
                  </h3>
                  <ul className="space-y-3">
                    {results.engagement_tactics.map((tactic, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pacing Tips */}
              {results.pacing_tips && results.pacing_tips.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Pacing Tips
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.pacing_tips.map((tip, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-300"
                      >
                        {tip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Strategies */}
              {results.cta_strategies && results.cta_strategies.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    CTA Strategies
                  </h3>
                  <ul className="space-y-3">
                    {results.cta_strategies.map((cta, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <ArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{cta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Watch Time Tips */}
              {results.watch_time_tips && (
                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Watch Time Optimization
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {results.watch_time_tips}
                  </p>
                </div>
              )}

              {/* Raw response fallback */}
              {!results.retention_hooks && !results.engagement_tactics && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Agent Response
                  </h3>
                  <pre className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(results, null, 2)}
                  </pre>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all"
                >
                  Analyze Another Niche
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-white text-black rounded-full px-6 py-3 font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  Done
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetentionAgentModal;
