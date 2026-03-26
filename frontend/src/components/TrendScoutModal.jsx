import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2, TrendingUp, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TrendScoutModal = ({ isOpen, onClose }) => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('YouTube');
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
      const response = await axios.post(`${API}/agents/airtop`, {
        niche: niche,
        platform: platform,
        agent_type: 'trend_scout'
      }, { timeout: 120000 }); // 2 min timeout

      if (response.data.success && response.data.data) {
        setResults(response.data.data);
      } else {
        setError('No results returned from agent');
      }
    } catch (err) {
      console.error('Trend Scout error:', err);
      setError(err.response?.data?.detail || 'Failed to fetch trends. Please try again.');
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
      data-testid="trend-scout-modal"
      className="fixed inset-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#12121A] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(139,92,246,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-testid="close-trend-scout"
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 p-0.5">
              <div className="w-full h-full bg-[#12121A] rounded-[14px] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-medium text-white font-outfit">
                Trend Scout Agent
              </h2>
              <p className="text-sm text-zinc-400">
                Finds what's working now across platforms
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
                    data-testid="trend-scout-niche"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    data-testid="trend-scout-platform"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    disabled={isLoading}
                  >
                    <option value="YouTube" className="bg-[#12121A]">YouTube</option>
                    <option value="TikTok" className="bg-[#12121A]">TikTok</option>
                    <option value="Instagram" className="bg-[#12121A]">Instagram</option>
                    <option value="LinkedIn" className="bg-[#12121A]">LinkedIn</option>
                  </select>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !niche.trim()}
                  data-testid="run-trend-scout"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-6 py-4 font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Scanning Trends...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Find Viral Trends
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
            <div data-testid="trend-scout-results" className="space-y-6">
              {/* Trends */}
              {results.trends && results.trends.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Trending Topics
                  </h3>
                  <ul className="space-y-3">
                    {results.trends.map((trend, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Formats */}
              {results.formats && results.formats.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Viral Formats
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.formats.map((format, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Insights */}
              {results.insights && (
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/10 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Key Insights
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {results.insights}
                  </p>
                </div>
              )}

              {/* Raw response fallback */}
              {results.raw_response && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Agent Response
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {results.raw_response}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all"
                >
                  Search Another Niche
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-white text-black rounded-full px-6 py-3 font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2"
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

export default TrendScoutModal;
