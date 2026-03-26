import React, { useState } from 'react';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

// Default video content data - user will replace with real content
const defaultVideos = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/7345169/pexels-photo-7345169.jpeg',
    title: 'Neon Wave Simulation',
    tag: 'AI-assisted workflow',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: null,
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1762279388956-1c098163a2a8',
    title: 'Digital Landscape Render',
    tag: 'Script → Visual → Output',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: null,
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/4362515/pexels-photo-4362515.png',
    title: 'Cinematic Character Design',
    tag: 'Short-form content',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: null,
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1762281602433-9deeaabb8981',
    title: 'Abstract Swirl Dynamics',
    tag: 'AI Film',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: null,
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1729167318434-5cefa05fa3ad',
    title: 'VFX Character Study',
    tag: 'Script → Visual → Output',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: null,
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1770968476272-69e3e4af5df7',
    title: 'Cyberpunk Particle Flow',
    tag: 'AI-assisted workflow',
    caption: 'Created using workflows similar to DeployrAI agents',
    videoUrl: null,
    embedUrl: null,
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
