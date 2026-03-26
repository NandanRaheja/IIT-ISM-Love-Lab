import React from 'react';
import { Play } from 'lucide-react';

const VideoCard = ({ 
  video, 
  index, 
  onClick 
}) => {
  return (
    <div
      data-testid={`video-card-${index}`}
      className="video-card opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
      onClick={() => onClick(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(video)}
      aria-label={`Play ${video.title}`}
    >
      {/* Image Container */}
      <div className="video-card-image-container">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-card-image"
          loading="lazy"
        />
        <div className="video-card-overlay" />
        
        {/* Play Button */}
        <div className="play-button" data-testid={`play-button-${index}`}>
          <Play className="w-6 h-6 ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Content */}
      <div className="video-card-content">
        <span className="video-card-tag">
          {video.tag}
        </span>
        <h3 className="video-card-title">{video.title}</h3>
        {video.caption && (
          <p className="video-card-caption">{video.caption}</p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
