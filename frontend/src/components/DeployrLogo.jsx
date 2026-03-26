import React from 'react';

const DeployrLogo = ({ size = 36, className = '' }) => {
  const id = React.useId();
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="deployr-logo-icon"
    >
      <defs>
        {/* Main gradient */}
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Node gradient */}
        <radialGradient id={`node-gradient-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      
      {/* Background circle with subtle glow */}
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="#12121A"
        stroke={`url(#gradient-${id})`}
        strokeWidth="1.5"
        opacity="0.9"
      />
      
      {/* Three vertical parallel lines - representing deployment/execution */}
      <g filter={`url(#glow-${id})`}>
        {/* Left line */}
        <rect
          x="13"
          y="14"
          width="4"
          height="20"
          rx="2"
          fill={`url(#gradient-${id})`}
        />
        
        {/* Center line (taller) */}
        <rect
          x="22"
          y="10"
          width="4"
          height="28"
          rx="2"
          fill={`url(#gradient-${id})`}
        />
        
        {/* Right line */}
        <rect
          x="31"
          y="14"
          width="4"
          height="20"
          rx="2"
          fill={`url(#gradient-${id})`}
        />
      </g>
      
      {/* AI Network nodes - small circles at connection points */}
      <g filter={`url(#glow-${id})`}>
        {/* Top nodes */}
        <circle cx="15" cy="14" r="2" fill={`url(#node-gradient-${id})`} />
        <circle cx="24" cy="10" r="2.5" fill={`url(#node-gradient-${id})`} />
        <circle cx="33" cy="14" r="2" fill={`url(#node-gradient-${id})`} />
        
        {/* Bottom nodes */}
        <circle cx="15" cy="34" r="2" fill={`url(#node-gradient-${id})`} />
        <circle cx="24" cy="38" r="2.5" fill={`url(#node-gradient-${id})`} />
        <circle cx="33" cy="34" r="2" fill={`url(#node-gradient-${id})`} />
        
        {/* Connection lines between nodes (subtle) */}
        <line x1="15" y1="14" x2="24" y2="10" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.4" />
        <line x1="24" y1="10" x2="33" y2="14" stroke="#3B82F6" strokeWidth="0.5" opacity="0.4" />
        <line x1="15" y1="34" x2="24" y2="38" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.4" />
        <line x1="24" y1="38" x2="33" y2="34" stroke="#3B82F6" strokeWidth="0.5" opacity="0.4" />
      </g>
    </svg>
  );
};

export default DeployrLogo;
