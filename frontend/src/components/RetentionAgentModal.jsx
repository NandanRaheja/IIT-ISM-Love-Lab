import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2, Timer, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const audienceTypes = [
  { value: 'Students', label: 'Students' },
  { value: 'Professionals', label: 'Professionals' },
  { value: 'Creators', label: 'Creators' },
  { value: 'Entrepreneurs', label: 'Entrepreneurs' }
];

const platforms = [
  { value: 'YouTube', label: 'YouTube' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'Instagram', label: 'Instagram Reels' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Twitter', label: 'X (Twitter)' }
];

const RetentionAgentModal = ({ isOpen, onClose }) => {
  const [audienceType, setAudienceType] = useState('');
  const [platform, setPlatform] = useState('');
  const [topic, setTopic] = useState('');
  const [creatorNiche, setCreatorNiche] = useState('');
  const [script, setScript] = useState('');
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
    if (!audienceType || !platform || !topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const payload = {
        audienceType,
        platform,
        topic: topic.trim()
      };
      
      if (creatorNiche.trim()) {
        payload.creatorNiche = creatorNiche.trim();
      }
      if (script.trim()) {
        payload.script = script.trim();
      }

      const response = await axios.post(`${API}/agents/retention`, payload, { 
        timeout: 120000 
      });

      if (response.data.success) {
        // Check if it's still processing (async)
        if (response.data.status === 'processing') {
          setResults({
            status: 'processing',
            invocationId: response.data.invocationId,
            message: response.data.message
          });
        } else if (response.data.data) {
          setResults(response.data.data);
        } else {
          setResults(response.data);
        }
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
    setAudienceType('');
    setPlatform('');
    setTopic('');
    setCreatorNiche('');
    setScript('');
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
                {/* Audience Type */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Audience Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={audienceType}
                    onChange={(e) => setAudienceType(e.target.value)}
                    data-testid="retention-audience"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    required
                    disabled={isLoading}
                  >
                    <option value="" className="bg-[#12121A]">Select audience type</option>
                    {audienceTypes.map(type => (
                      <option key={type.value} value={type.value} className="bg-[#12121A]">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Platform <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    data-testid="retention-platform"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    required
                    disabled={isLoading}
                  >
                    <option value="" className="bg-[#12121A]">Select platform</option>
                    {platforms.map(p => (
                      <option key={p.value} value={p.value} className="bg-[#12121A]">
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Topic <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., AI filmmaking tutorials, fitness transformation"
                    data-testid="retention-topic"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Creator Niche (Optional) */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Creator Niche <span className="text-zinc-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={creatorNiche}
                    onChange={(e) => setCreatorNiche(e.target.value)}
                    placeholder="e.g., fitness coaching, tech reviews"
                    data-testid="retention-niche"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-zinc-600 mt-1">For more targeted recommendations</p>
                </div>

                {/* Script (Optional) */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Existing Script <span className="text-zinc-600">(optional)</span>
                  </label>
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Paste your script to analyze its opening hook..."
                    data-testid="retention-script"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-zinc-600 mt-1">If provided, the opening hook will be scored and analyzed</p>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !audienceType || !platform || !topic.trim()}
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
              {/* Processing state */}
              {results.status === 'processing' && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 text-center">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Agent is Processing
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {results.message || "Your retention strategy is being analyzed..."}
                  </p>
                </div>
              )}

              {/* Display results - handle various response formats */}
              {results.status !== 'processing' && typeof results === 'object' && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Retention Analysis Results
                  </h3>
                  <pre className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap overflow-auto max-h-96">
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
                  Analyze Another
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
