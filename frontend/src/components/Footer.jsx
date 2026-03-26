import React from 'react';
import { Twitter, Linkedin, Youtube } from 'lucide-react';
import DeployrLogo from './DeployrLogo';

const Footer = () => {
  return (
    <footer 
      data-testid="footer"
      className="relative border-t border-white/5 bg-[#0B0B0F]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2.5 group mb-4">
              <DeployrLogo size={36} className="group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all" />
              <span className="text-xl font-semibold text-white font-outfit tracking-tight">
                Deployr<span className="text-purple-400">AI</span>
              </span>
            </a>
            <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
              DeployrAI is not for everyone. It's for creators ready to build, scale, and monetize with AI.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex md:justify-end items-start">
            <div className="flex items-center gap-3">
              <a
                href="#"
                data-testid="social-twitter"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                data-testid="social-linkedin"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                data-testid="social-youtube"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 DeployrAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <span className="font-mono">For serious creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
