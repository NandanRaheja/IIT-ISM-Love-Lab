import { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2024/11/04/audio_65a37c2eb9.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  };

  const startMusic = () => {
    if (!audioRef.current || isPlaying) return;
    
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.log('Audio play failed:', err);
    });
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isLoaded, toggleMusic, startMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
