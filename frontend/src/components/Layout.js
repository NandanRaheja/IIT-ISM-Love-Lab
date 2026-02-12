import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="brick-bg min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
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