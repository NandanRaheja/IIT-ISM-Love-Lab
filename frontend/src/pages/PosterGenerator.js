import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import Layout from '../components/Layout';
import { Download, Share2, MessageCircle, Instagram } from 'lucide-react';

const PosterGenerator = () => {
  const navigate = useNavigate();
  const posterRef = useRef(null);
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);

  const campusSpots = ['RD', 'Ruby Park', 'Library', 'NLHC', 'Srijan Grounds'];
  
  const genreTitles = {
    'Tech Romance Thriller': [
      'Debugging Destiny',
      '404: Heart Not Found',
      'Ctrl + Alt + Forever',
      'Algorithm of Us'
    ],
    'Analytical Romantic Drama': [
      'The Pattern Between Us',
      'Variables of the Heart',
      'Calculated Chaos',
      'Theorem of Love'
    ],
    'Intense Energy Saga': [
      'High Voltage Hearts',
      'Short Circuit',
      'Current Affairs',
      'The Spark Within'
    ],
    'Signal & Silence Story': [
      'Signal Lost',
      'Frequency of Us',
      'Between Transmissions',
      'The Silent Wave'
    ],
    'Slow-Burn Love Story': [
      'Foundations of February',
      'Under Construction: Love',
      'The Long Build',
      'Blueprint Hearts'
    ],
    'Action Hero With Soft Corner': [
      'Steel & Silence',
      'Torque of the Heart',
      'Heavy Machinery, Soft Emotions',
      'Pressure & Patience'
    ],
    'Deep & Dramatic Epic': [
      'Beneath the Surface',
      'Layers',
      'Coal & Confessions',
      'Depths'
    ],
    'Heavy Metal Romance': [
      'Iron & Innocence',
      'The Weight of Us',
      'Machinery & Memory',
      'Steel Soul'
    ],
    'Experimental Love Story': [
      'Unstable Reactions',
      'Catalyst',
      'Controlled Explosion',
      'The Chemistry Test'
    ],
    'Earth & Emotions Chronicle': [
      'Fault Lines',
      'Sediments of the Soul',
      'Layers of You',
      'The Core'
    ],
    'Seismic Heartbeat Saga': [
      'Seismic Signals',
      'The Aftershock',
      'Magnitude',
      'Tremors'
    ],
    'Environmental Parallel Cinema': [
      'Quiet Climate',
      'The Soft Revolution',
      'Sustainable Hearts',
      'Eco of Us'
    ],
    'Physics-Based Love Theory': [
      'The Unseen Force',
      'Laws of Attraction',
      'Quantum Hearts',
      'Momentum'
    ]
  };

  const taglines = [
    'Because nothing goes according to script.',
    'Not every love story is loud.',
    'Some chapters stay.',
    'This one was never accidental.',
    'Every plot twist has a reason.',
    'Certain feelings do not need permission.'
  ];

  const releaseLines = [
    'Releasing 14th February. Only at IIT(ISM).',
    'This Valentine Day, your story takes the screen.',
    'Premiering this 14th February.',
    'A campus original. 14th February.'
  ];

  useEffect(() => {
    generatePoster();
  }, []);

  const generatePoster = () => {
    const identity = JSON.parse(sessionStorage.getItem('campusIdentity') || '{}');
    const department = identity.department;
    const year = identity.year;
    const hostel = identity.hostel;

    // Find genre from department
    const genreMap = {
      'Computer Science & Engineering': 'Tech Romance Thriller',
      'Mathematics & Computing': 'Analytical Romantic Drama',
      'Electrical Engineering': 'Intense Energy Saga',
      'Electronics & Communication Engineering': 'Signal & Silence Story',
      'Civil Engineering': 'Slow-Burn Love Story',
      'Mechanical Engineering': 'Action Hero With Soft Corner',
      'Mining Engineering': 'Deep & Dramatic Epic',
      'Mining Machinery Engineering': 'Heavy Metal Romance',
      'Chemical Engineering': 'Experimental Love Story',
      'Applied Geology': 'Earth & Emotions Chronicle',
      'Applied Geophysics': 'Seismic Heartbeat Saga',
      'Environmental Engineering': 'Environmental Parallel Cinema',
      'Engineering Physics': 'Physics-Based Love Theory'
    };

    const yearPhases = {
      '1st Year': 'Fresh Release',
      '2nd Year': 'Interval Complications',
      '3rd Year': 'Emotional Plot Twist',
      '4th Year': 'Pre-Climax Realisation',
      '5th Year / Dual Degree': 'Grand Finale Season'
    };

    const genre = genreMap[department] || 'Romantic Drama';
    const phase = yearPhases[year] || 'Mid-Season Arc';
    
    // Pick random title from genre
    const titles = genreTitles[genre] || ['Campus Hearts'];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    // Generate filming location with creative liberty
    const randomSpots = [...campusSpots].sort(() => 0.5 - Math.random()).slice(0, 2);
    const locationTemplates = [
      `Filmed primarily in ${hostel}, with stolen chai moments at ${randomSpots[0]} and quiet scenes inside ${randomSpots[1]}.`,
      `Shot across ${hostel} corridors and unforgettable evenings near ${randomSpots[0]}.`,
      `Produced in ${hostel} with emotional sequences unfolding after ${randomSpots[1]} lectures.`,
      `Set in ${hostel}, featuring late-night conversations at ${randomSpots[0]} and silent walks through ${randomSpots[1]}.`
    ];
    
    const location = locationTemplates[Math.floor(Math.random() * locationTemplates.length)];
    
    // Pick random tagline and release line
    const tagline = taglines[Math.floor(Math.random() * taglines.length)];
    const release = releaseLines[Math.floor(Math.random() * releaseLines.length)];

    setPoster({
      title,
      genre,
      phase,
      location,
      tagline,
      release
    });
    
    setLoading(false);
  };

  const downloadPoster = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: null,
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = 'iitism-valentine-poster.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const shareToWhatsApp = async () => {
    const text = `🎬 My IIT(ISM) Love Lab Film: "${poster.title}" - ${poster.tagline}`;
    const url = window.location.origin;
    const fullText = text + ' ' + url;
    
    // Try native share first (works best on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IIT(ISM) Love Lab',
          text: fullText
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall through to copy
      }
    }
    
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(fullText);
      alert('Message copied! Paste it in WhatsApp to share.');
    } catch (err) {
      // Final fallback: prompt with text
      prompt('Copy this message and share on WhatsApp:', fullText);
    }
  };

  const shareToInstagram = async () => {
    // Download the image first, then prompt user to share
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: null,
        scale: 2
      });
      
      // Convert to blob for better handling
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'iitism-valentine-poster.png';
        link.href = url;
        link.click();
        
        // Show instruction after download
        setTimeout(() => {
          alert('Your poster has been downloaded! Open Instagram and share it to your story.');
        }, 500);
      }, 'image/png');
    }
  };

  const continueToQuestionnaire = () => {
    const mode = sessionStorage.getItem('mode');
    if (mode === 'couple') {
      navigate('/couple');
    } else {
      navigate('/single');
    }
  };

  if (loading || !poster) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="flex space-x-2 mb-4 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-[#E11D48] rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
            <p className="text-white text-lg">Generating your film poster...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8">
        {/* Poster */}
        <motion.div
          ref={posterRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #7F1D1D 0%, #1e1b4b 100%)',
            minHeight: '600px'
          }}
        >
          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
              backgroundSize: '200px 200px'
            }}
          />
          
          {/* Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)'
            }}
          />

          {/* Content */}
          <div className="relative p-12 flex flex-col items-center justify-center min-h-[600px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 
                className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
                  letterSpacing: '0.05em'
                }}
              >
                {poster.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8"
            >
              <p 
                className="text-xl text-amber-100 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                A {poster.genre}
              </p>
              <p 
                className="text-lg text-amber-200/80"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                in its {poster.phase} Era
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="max-w-md mb-8"
            >
              <p 
                className="text-sm text-gray-300 italic leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {poster.location}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-8"
            >
              <p 
                className="text-xl text-white font-light italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "{poster.tagline}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-auto"
            >
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />
              <p 
                className="text-sm text-amber-200 font-medium tracking-wider uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {poster.release}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mt-8 space-y-4"
        >
          <button
            data-testid="download-poster-button"
            onClick={downloadPoster}
            className="w-full bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-full px-8 py-4 font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Your Film Poster
          </button>

          <div className="flex gap-3">
            <button
              data-testid="share-whatsapp-button"
              onClick={async () => {
                const text = `🎬 My IIT(ISM) Love Lab Film: "${poster?.title}" - ${poster?.tagline} ${window.location.origin}`;
                try {
                  await navigator.clipboard.writeText(text);
                  alert('✅ Copied! Now open WhatsApp and paste the message.');
                } catch (err) {
                  prompt('Copy this message:', text);
                }
              }}
              className="flex-1 bg-[#25D366] text-white hover:bg-[#1da851] rounded-full px-4 py-3 font-medium transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              data-testid="share-instagram-button"
              onClick={shareToInstagram}
              className="flex-1 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white hover:opacity-90 rounded-full px-4 py-3 font-medium transition-all flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </button>
          </div>
          
          <button
            data-testid="continue-button"
            onClick={continueToQuestionnaire}
            className="w-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-6 py-3 font-medium transition-all border border-white/20 mt-2"
          >
            Continue Experience →
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PosterGenerator;
