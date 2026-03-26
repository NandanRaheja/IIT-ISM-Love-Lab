import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header 
      data-testid="header"
      className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="/"
            data-testid="logo"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-outfit tracking-tight">
              Deployr<span className="text-purple-400">AI</span>
            </span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#proof" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Proof
            </a>
            <a 
              href="#features" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              About
            </a>
          </nav>

          {/* CTA */}
          <a
            href="#"
            data-testid="header-cta"
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
