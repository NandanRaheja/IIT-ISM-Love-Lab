import React from 'react';
import { Share2, Linkedin, Twitter, Users } from 'lucide-react';

const ViralLoopSection = () => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://deployrai.com';
  const shareText = "I just applied for early access to DeployrAI — AI agents that actually create, grow, and monetize content. Limited spots!";

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      data-testid="viral-loop-section"
      className="relative py-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-3xl p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 mb-6">
            <Share2 className="w-5 h-5 text-purple-400" />
          </div>

          {/* Content */}
          <h3 
            data-testid="viral-loop-title"
            className="text-xl font-medium text-white mb-3 font-outfit"
          >
            Want Faster Access?
          </h3>
          <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">
            Skip the line by inviting other creators. Share on social or bring 3 creators to move up the waitlist.
          </p>

          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleTwitterShare}
              data-testid="share-twitter-button"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <Twitter className="w-4 h-4" />
              Share on X
            </button>
            <button
              onClick={handleLinkedInShare}
              data-testid="share-linkedin-button"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <Linkedin className="w-4 h-4" />
              Share on LinkedIn
            </button>
            <button
              data-testid="invite-creators-button"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <Users className="w-4 h-4" />
              Invite 3 Creators
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViralLoopSection;
