import React, { useEffect, useCallback } from 'react';
import { X, Play } from 'lucide-react';

const VideoModal = ({ isOpen, video, onClose }) => {
  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!video) return null;

  return (
    <div
      data-testid="video-modal"
      className={`video-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Video player: ${video.title}`}
    >
      <div className="video-modal-container">
        {/* Close Button */}
        <button
          data-testid="close-modal-button"
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Content */}
        {video.videoUrl ? (
          // If actual video URL is provided
          <video
            src={video.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        ) : video.embedUrl ? (
          // If embed URL (YouTube/Vimeo) is provided
          <div className="relative w-full h-full">
            <iframe
              src={video.embedUrl}
              className="w-full h-full"
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Fallback link if embedding doesn't work */}
            {video.youtubeUrl && (
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white hover:bg-white/20 transition-colors"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        ) : (
          // Placeholder state - shows thumbnail with play overlay
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center animate-pulse-glow">
                <Play className="w-8 h-8 ml-1 text-white" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-outfit">
                {video.title}
              </h3>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                Video preview coming soon. This content was created using AI-driven workflows similar to DeployrAI agents.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
                  {video.tag}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
