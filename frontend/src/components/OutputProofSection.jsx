import React, { useState } from 'react';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

// Real video content - AI-driven workflow outputs
const defaultVideos = [
  {
    id: 1,
    thumbnail: 'https://img.youtube.com/vi/ywKgYxYTprw/maxresdefault.jpg',
    title: 'AI Short Film',
    tag: 'AI-assisted workflow',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: 'https://www.youtube-nocookie.com/embed/ywKgYxYTprw?autoplay=1&rel=0',
    youtubeUrl: 'https://youtu.be/ywKgYxYTprw',
  },
  {
    id: 2,
    thumbnail: 'https://img.youtube.com/vi/PFXnk2tLAbs/maxresdefault.jpg',
    title: 'Cinematic AI Visual',
    tag: 'Script → Visual → Output',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: 'https://www.youtube-nocookie.com/embed/PFXnk2tLAbs?autoplay=1&rel=0',
    youtubeUrl: 'https://youtu.be/PFXnk2tLAbs',
  },
  {
    id: 3,
    thumbnail: 'https://img.youtube.com/vi/p39yPT-_Idc/maxresdefault.jpg',
    title: 'AI Film Production',
    tag: 'Short-form content',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: 'https://www.youtube-nocookie.com/embed/p39yPT-_Idc?autoplay=1&rel=0',
    youtubeUrl: 'https://youtu.be/p39yPT-_Idc',
  },
  {
    id: 4,
    thumbnail: 'https://img.youtube.com/vi/VXUJyjm01qw/maxresdefault.jpg',
    title: 'Visual Story Output',
    tag: 'AI Film',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: 'https://www.youtube-nocookie.com/embed/VXUJyjm01qw?autoplay=1&rel=0',
    youtubeUrl: 'https://youtu.be/VXUJyjm01qw',
  },
  {
    id: 5,
    thumbnail: 'https://img.youtube.com/vi/Om8taBAxqbE/maxresdefault.jpg',
    title: 'AI Creative Workflow',
    tag: 'Script → Visual → Output',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: 'https://www.youtube-nocookie.com/embed/Om8taBAxqbE?autoplay=1&rel=0',
    youtubeUrl: 'https://youtu.be/Om8taBAxqbE',
  },
  {
    id: 6,
    thumbnail: 'https://img.youtube.com/vi/AGr5SOMgo0c/maxresdefault.jpg',
    title: 'AI-Generated Content',
    tag: 'AI-assisted workflow',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: 'https://www.youtube-nocookie.com/embed/AGr5SOMgo0c?autoplay=1&rel=0',
    youtubeUrl: 'https://youtu.be/AGr5SOMgo0c',
  },
];

const OutputProofSection = ({ videos = defaultVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <section 
      data-testid="output-proof-section"
      className="relative min-h-screen py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="grid-pattern" />
      
      {/* Gradient orbs */}
      <div className="bg-glow-orb purple" style={{ 
        width: '600px', 
        height: '600px', 
        top: '-200px', 
        left: '-200px' 
      }} />
      <div className="bg-glow-orb blue" style={{ 
        width: '500px', 
        height: '500px', 
        bottom: '-100px', 
        right: '-100px' 
      }} />
      <div className="bg-glow-orb purple" style={{ 
        width: '400px', 
        height: '400px', 
        top: '50%', 
        right: '20%',
        opacity: 0.5 
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative text-center mb-16 lg:mb-20">
          <div className="section-header-glow" />
          
          {/* Pre-title line */}
          <p 
            data-testid="section-pretitle"
            className="text-sm md:text-base text-purple-300/80 font-mono tracking-widest uppercase mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0s', animationFillMode: 'forwards' }}
          >
            Before building DeployrAI, these workflows were already in use.
          </p>

          {/* Main Title */}
          <h2 
            data-testid="section-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-outfit opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            Built With the System
          </h2>

          {/* Subtitle */}
          <p 
            data-testid="section-subtitle"
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Real content created using AI-driven workflows behind DeployrAI.
          </p>

          {/* Positioning line */}
          <p 
            data-testid="section-positioning"
            className="text-sm text-white/40 italic opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            This isn't theoretical—<span className="positioning-line text-white/60">this is what the system is designed to produce.</span>
          </p>
        </div>

        {/* Video Cards Grid */}
        <div 
          data-testid="video-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onClick={handleVideoClick}
            />
          ))}
        </div>

        {/* Bottom CTA / Trust line */}
        <div 
          className="mt-16 lg:mt-20 text-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <p 
            data-testid="trust-line"
            className="text-sm text-white/50 font-mono tracking-wide"
          >
            System capability • Workflow-driven creation • Real outputs
          </p>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default OutputProofSection;
