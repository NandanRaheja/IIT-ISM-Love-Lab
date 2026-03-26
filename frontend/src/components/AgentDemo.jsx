import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2, TrendingUp, Lightbulb, MessageSquare, FileText, Target, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const agentSteps = [
  { id: 'trend', name: 'Trend Scout', icon: TrendingUp, color: 'purple' },
  { id: 'idea', name: 'Idea Generator', icon: Lightbulb, color: 'blue' },
  { id: 'hook', name: 'Hook Master', icon: MessageSquare, color: 'violet' },
  { id: 'script', name: 'Script Writer', icon: FileText, color: 'indigo' },
  { id: 'strategy', name: 'Strategy Agent', icon: Target, color: 'cyan' },
];

const AgentDemo = ({ isOpen, onClose }) => {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState({
    niche: '',
    platform: 'YouTube',
    goal: 'grow',
    content_type: 'short-form video'
  });

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
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

  // Simulate agent progression
  useEffect(() => {
    if (isProcessing && currentAgent < agentSteps.length) {
      const timer = setTimeout(() => {
        setCurrentAgent(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentAgent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.niche.trim()) return;

    setIsProcessing(true);
    setCurrentAgent(0);
    setResults(null);

    try {
      const response = await axios.post(`${API}/agents/generate`, formData);
      setResults(response.data);
    } catch (error) {
      console.error('Agent generation error:', error);
      // Fallback mock response
      setResults({
        trends: ['AI-generated content is trending', 'Behind-the-scenes content performs well', 'Short tutorials getting high engagement'],
        content_ideas: ['Day in the life of an AI creator', 'Tutorial: How I use AI for content', 'AI vs Human content challenge'],
        hooks: ['What if AI could create your entire video?', 'I let AI run my content for a week...', 'The secret tool top creators are using'],
        script: 'Hook: "What if I told you AI could 10x your content output?"\n\nBody: Today I\'m going to show you exactly how I use AI agents to create, plan, and even monetize my content...\n\nCTA: Drop a comment if you want to see more AI content creation tips!',
        strategy: 'Post 5x per week, focus on short-form content, monetize through brand deals and digital products. Target watch time: 70%+.'
      });
    }

    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="agent-demo-modal"
      className={`fixed inset-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-2xl flex items-center justify-center p-4 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#12121A] border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(139,92,246,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-testid="close-demo-button"
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-3">
              Live Demo
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit">
              See AI Agents in Action
            </h2>
          </div>

          {!results ? (
            <>
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Your Niche</label>
                    <input
                      type="text"
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      placeholder="e.g., AI filmmaking, fitness, tech reviews"
                      data-testid="demo-niche-input"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Platform</label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      data-testid="demo-platform-select"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="YouTube" className="bg-[#12121A]">YouTube</option>
                      <option value="TikTok" className="bg-[#12121A]">TikTok</option>
                      <option value="Instagram" className="bg-[#12121A]">Instagram</option>
                      <option value="LinkedIn" className="bg-[#12121A]">LinkedIn</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing || !formData.niche.trim()}
                  data-testid="run-agents-button"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-6 py-4 font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Running Agents...
                    </>
                  ) : (
                    'Run AI Agents'
                  )}
                </button>
              </form>

              {/* Agent Progress */}
              {isProcessing && (
                <div className="space-y-3">
                  {agentSteps.map((agent, index) => (
                    <div
                      key={agent.id}
                      data-testid={`agent-step-${agent.id}`}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                        index < currentAgent
                          ? 'bg-green-500/10 border-green-500/30'
                          : index === currentAgent
                          ? 'bg-purple-500/10 border-purple-500/30'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        index < currentAgent
                          ? 'bg-green-500/20'
                          : index === currentAgent
                          ? 'bg-purple-500/20'
                          : 'bg-white/5'
                      }`}>
                        {index < currentAgent ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : index === currentAgent ? (
                          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                        ) : (
                          <agent.icon className="w-5 h-5 text-zinc-500" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          index <= currentAgent ? 'text-white' : 'text-zinc-500'
                        }`}>
                          {agent.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {index < currentAgent ? 'Complete' : index === currentAgent ? 'Processing...' : 'Waiting'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Results Display */
            <div className="space-y-6" data-testid="agent-results">
              {/* Trends */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Trends Found
                </h3>
                <ul className="space-y-2">
                  {results.trends?.map((trend, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideas */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-400" />
                  Content Ideas
                </h3>
                <ul className="space-y-2">
                  {results.content_ideas?.map((idea, i) => (
                    <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hooks */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-violet-400" />
                  Viral Hooks
                </h3>
                <ul className="space-y-2">
                  {results.hooks?.map((hook, i) => (
                    <li key={i} className="text-sm text-zinc-300 italic">"{hook}"</li>
                  ))}
                </ul>
              </div>

              {/* Script */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Generated Script
                </h3>
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono bg-black/20 p-4 rounded-xl">
                  {results.script}
                </pre>
              </div>

              {/* Strategy */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Growth Strategy
                </h3>
                <p className="text-sm text-zinc-300">{results.strategy}</p>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setResults(null)}
                data-testid="try-again-button"
                className="w-full bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all"
              >
                Try Another Niche
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDemo;
