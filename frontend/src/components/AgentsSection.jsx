import React, { useState } from 'react';
import { 
  TrendingUp, 
  Timer, 
  Pen, 
  LayoutGrid, 
  DollarSign, 
  Sparkles,
  Lock,
  Play,
  Clock
} from 'lucide-react';
import TrendScoutModal from './TrendScoutModal';
import RetentionAgentModal from './RetentionAgentModal';

const agents = [
  {
    name: 'Trend Scout Agent',
    description: 'Finds what\'s working now across platforms in real-time',
    icon: TrendingUp,
    color: 'from-purple-500 to-violet-500',
    isActive: true,
    modalType: 'trend_scout'
  },
  {
    name: 'Retention Strategy Agent',
    description: 'Optimizes watch time and keeps viewers hooked till the end',
    icon: Timer,
    color: 'from-blue-500 to-cyan-500',
    isActive: true,
    modalType: 'retention'
  },
  {
    name: 'Viral Scriptwriter',
    description: 'Creates high-retention scripts with proven hooks and payoffs',
    icon: Pen,
    color: 'from-violet-500 to-purple-500',
    isActive: true,
    modalType: 'coming_soon'
  },
  {
    name: 'Content Strategy Expert',
    description: 'Builds intelligent posting plans aligned with your goals',
    icon: LayoutGrid,
    color: 'from-indigo-500 to-blue-500',
    isActive: true,
    modalType: 'coming_soon'
  },
  {
    name: 'Monetization Agent',
    description: 'Turns content into income with strategic revenue paths',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-500',
    isActive: true,
    modalType: 'coming_soon'
  },
  {
    name: 'Visual Story Agent',
    description: 'Generates AI visuals & cinematic outputs for your content',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
    isActive: false,
    isComingSoon: true,
    modalType: null
  }
];

const AgentsSection = () => {
  const [isTrendScoutOpen, setIsTrendScoutOpen] = useState(false);
  const [isRetentionOpen, setIsRetentionOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleAgentClick = (agent) => {
    if (agent.modalType === 'trend_scout') {
      setIsTrendScoutOpen(true);
    } else if (agent.modalType === 'retention') {
      setIsRetentionOpen(true);
    } else if (agent.modalType === 'coming_soon') {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 3000);
    }
  };

  return (
    <section 
      data-testid="agents-section"
      id="agents"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
            Your AI Team
          </p>
          <h2 
            data-testid="agents-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 font-outfit"
          >
            Not Available to Everyone
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Each agent replaces hours of manual work and delivers execution-ready outputs.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div 
          data-testid="agents-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              data-testid={`agent-card-${index}`}
              onClick={() => handleAgentClick(agent)}
              className={`group bg-[#12121A]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden opacity-0 animate-fade-in-up ${
                agent.isActive || agent.isComingSoon ? 'cursor-pointer' : 'cursor-default'
              }`}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${agent.color} rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Live badge for active agents */}
              {agent.isActive && !agent.isComingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">Live</span>
                </div>
              )}

              {/* Coming Soon badge for last agent */}
              {agent.isComingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-amber-400 font-medium">Coming Soon</span>
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.color} p-0.5 mb-6`}>
                <div className="w-full h-full bg-[#12121A] rounded-[14px] flex items-center justify-center">
                  <agent.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium tracking-tight text-white mb-3 font-outfit">
                {agent.name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {agent.description}
              </p>

              {/* Try Now button for active agents */}
              {agent.isActive && !agent.isComingSoon && (
                <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Try Now</span>
                </div>
              )}

              {/* Coming Soon text for last agent */}
              {agent.isComingSoon && (
                <div className="flex items-center gap-2 text-sm text-amber-400/70">
                  <Clock className="w-4 h-4" />
                  <span>Launching Soon</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon Toast */}
        {showComingSoon && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#12121A] border border-purple-500/30 rounded-2xl px-6 py-4 shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Coming Soon!</p>
                <p className="text-sm text-zinc-400">This agent is currently in development.</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            data-testid="unlock-access-button"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all"
          >
            <Lock className="w-4 h-4" />
            Unlock Full Access
          </button>
        </div>
      </div>

      {/* Trend Scout Modal */}
      <TrendScoutModal 
        isOpen={isTrendScoutOpen} 
        onClose={() => setIsTrendScoutOpen(false)} 
      />

      {/* Retention Agent Modal */}
      <RetentionAgentModal
        isOpen={isRetentionOpen}
        onClose={() => setIsRetentionOpen(false)}
      />
    </section>
  );
};

export default AgentsSection;
