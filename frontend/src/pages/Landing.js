import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';

const Landing = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Event active only on Feb 14, 2026 (00:00:00 to 23:59:59)
    const eventStart = new Date('2026-02-14T00:00:00').getTime();
    const eventEnd = new Date('2026-02-14T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      
      // If event hasn't started yet, countdown to start
      if (now < eventStart) {
        const distance = eventStart - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
      // If event is active, countdown to end
      else if (now >= eventStart && now <= eventEnd) {
        const distance = eventEnd - now;
        setTimeLeft({
          days: 0,
          hours: Math.floor(distance / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
      // Event has ended
      else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <NotebookCard>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="handwritten text-5xl md:text-6xl font-bold text-[#E11D48] mb-4"
          >
            IIT(ISM) Love Lab
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white px-6 py-3 rounded-lg shadow-sm mb-8"
          >
            <p className="text-[#1C1917] text-base md:text-lg">
              Anonymous Valentine Social Experiment 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 space-y-3"
          >
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm inline-block">
              <p className="text-sm text-[#1C1917] font-medium">
                {new Date().getTime() < new Date('2026-02-14T00:00:00').getTime() 
                  ? 'Event starts in:' 
                  : 'Time remaining:'}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E11D48]">{timeLeft.days}</div>
                <div className="text-xs text-[#57534E] font-medium">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E11D48]">{timeLeft.hours}</div>
                <div className="text-xs text-[#57534E] font-medium">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E11D48]">{timeLeft.minutes}</div>
                <div className="text-xs text-[#57534E] font-medium">Mins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E11D48]">{timeLeft.seconds}</div>
                <div className="text-xs text-[#57534E] font-medium">Secs</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 w-full"
          >
            <button
              data-testid="start-button"
              onClick={() => navigate('/mode')}
              className="w-full bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-full px-8 py-4 font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Start Experience
            </button>
            
            <div className="flex gap-2">
              <button
                data-testid="leaderboards-button"
                onClick={() => navigate('/leaderboards')}
                className="flex-1 bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-4 py-3 text-sm font-medium transition-all"
              >
                Leaderboards
              </button>
              <button
                data-testid="confessions-button"
                onClick={() => navigate('/confessions')}
                className="flex-1 bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-4 py-3 text-sm font-medium transition-all"
              >
                Confessions
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 space-y-2"
          >
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm inline-block">
              <p className="text-xs text-[#57534E] italic font-medium">
                Completely anonymous. No login required.
              </p>
            </div>
            <div className="bg-[#FFF1F2] px-4 py-2 rounded-lg shadow-sm inline-block">
              <p className="text-xs text-[#E11D48] font-bold">
                🎯 Active only on Feb 14, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default Landing;