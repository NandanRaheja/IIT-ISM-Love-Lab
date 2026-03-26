import React from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingLearnButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/learn')}
      data-testid="floating-learn-button"
      className="fixed left-6 bottom-6 z-40 group flex items-center gap-3 bg-[#12121A]/90 backdrop-blur-xl border border-purple-500/30 rounded-full pl-4 pr-5 py-3 shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:border-purple-500/50 transition-all duration-300"
    >
      {/* Icon with glow */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      
      {/* Text */}
      <div className="text-left">
        <p className="text-sm font-semibold text-white">Learn the System</p>
        <p className="text-xs text-zinc-400">Playbooks & Guides</p>
      </div>
    </button>
  );
};

export default FloatingLearnButton;
