import { motion } from 'framer-motion';
import { useMusic } from '../context/MusicContext';
import { Volume2, VolumeX } from 'lucide-react';

const Layout = ({ children }) => {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <div className="brick-bg min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
      
      {/* Floating hearts animation */}
      <div className="floating-hearts">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="heart-particle text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;