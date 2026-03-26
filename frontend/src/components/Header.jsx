import React from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onApplyClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Agents', href: '#agents' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Us', href: '#why' },
    { label: 'Newsletter', href: '#newsletter' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <header 
      data-testid="header"
      className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0B0B0F]/60 border-b border-white/5 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="/"
            data-testid="logo"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-white font-outfit tracking-tight">
              Deployr<span className="text-purple-400">AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onApplyClick}
              data-testid="header-apply-button"
              className="bg-white text-black rounded-full px-5 py-2 text-sm font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-semibold w-full mt-2"
              >
                Apply Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
