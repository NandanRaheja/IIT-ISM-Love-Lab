import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

const creativeMessages = [
  "Got questions? I'm your AI guide!",
  "Need help? Let's chat!",
  "Stuck? I've got answers!",
  "Let's build something epic!",
  "Your AI assistant is ready!",
  "Ask me anything about DeployrAI!",
  "Ready to 10x your content?",
];

const FloatingChatbot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Show bubble after 3 seconds, then cycle messages
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  // Cycle through messages
  useEffect(() => {
    if (showBubble && !isChatOpen) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % creativeMessages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showBubble, isChatOpen]);

  // Hide bubble after showing for a while
  useEffect(() => {
    if (showBubble && !isHovered && !isChatOpen) {
      const hideTimer = setTimeout(() => {
        setShowBubble(false);
      }, 15000);
      return () => clearTimeout(hideTimer);
    }
  }, [showBubble, isHovered, isChatOpen]);

  const handleClick = () => {
    setIsChatOpen(!isChatOpen);
    setShowBubble(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 flex-row-reverse">
      {/* Chat bubble message */}
      {(showBubble || isHovered) && !isChatOpen && (
        <div 
          className="animate-fade-in-up bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-[0_0_30px_rgba(139,92,246,0.3)] max-w-[200px] relative"
          style={{ animationDuration: '0.3s' }}
        >
          <p className="text-sm font-medium">{creativeMessages[currentMessage]}</p>
          <div className="absolute -bottom-1 right-3 w-3 h-3 bg-blue-600 rotate-45" />
        </div>
      )}

      {/* Chatbot button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="floating-chatbot-button"
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] ${
          isChatOpen 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 hover:scale-110'
        }`}
      >
        {/* Pulse ring animation */}
        {!isChatOpen && (
          <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
        )}
        
        {/* Icon */}
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat panel */}
      {isChatOpen && (
        <div 
          className="fixed bottom-24 right-6 w-80 bg-[#12121A] border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(139,92,246,0.3)] overflow-hidden animate-fade-in-up"
          style={{ animationDuration: '0.3s' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">DeployrAI Assistant</h3>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online & ready to help
                </p>
              </div>
            </div>
          </div>

          {/* Chat body */}
          <div className="p-5 h-64 overflow-y-auto">
            {/* Welcome message */}
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-sm text-zinc-300">
                  Hey there! 👋 I'm your DeployrAI assistant. I can help you:
                </p>
                <ul className="text-sm text-zinc-400 mt-2 space-y-1">
                  <li>• Understand our AI agents</li>
                  <li>• Get content creation tips</li>
                  <li>• Navigate the platform</li>
                </ul>
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 mb-2">Quick questions:</p>
              {[
                "How do the AI agents work?",
                "What's the pricing?",
                "How to get started?"
              ].map((question, i) => (
                <button
                  key={i}
                  className="w-full text-left text-sm text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl px-4 py-2.5 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Powered by DeployrAI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
