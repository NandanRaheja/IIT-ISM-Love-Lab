import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { Heart, User } from 'lucide-react';

const ModeSelection = () => {
  const navigate = useNavigate();

  const selectMode = (mode) => {
    sessionStorage.setItem('mode', mode);
    navigate('/identity');
  };

  return (
    <Layout>
      <NotebookCard>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="handwritten text-4xl md:text-5xl font-bold text-[#1C1917] mb-4 text-center">
            Choose Your Path
          </h2>
          
          <p className="text-[#57534E] text-center mb-12">
            Select the experience that fits you
          </p>

          <div className="space-y-4 w-full">
            <motion.button
              data-testid="couple-mode-button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectMode('couple')}
              className="w-full bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-2xl px-8 py-6 transition-all shadow-lg flex items-center gap-4"
            >
              <Heart className="w-8 h-8" />
              <div className="text-left flex-1">
                <div className="font-bold text-xl">Couple Mode</div>
                <div className="text-sm opacity-90">Test your perception alignment</div>
              </div>
            </motion.button>

            <motion.button
              data-testid="single-mode-button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectMode('single')}
              className="w-full bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-2xl px-8 py-6 transition-all flex items-center gap-4"
            >
              <User className="w-8 h-8" />
              <div className="text-left flex-1">
                <div className="font-bold text-xl">Single Mode</div>
                <div className="text-sm">Discover your relationship readiness</div>
              </div>
            </motion.button>
          </div>

          <button
            data-testid="back-button"
            onClick={() => navigate('/')}
            className="mt-8 text-[#57534E] hover:text-[#1C1917] text-sm transition-colors"
          >
            ← Back
          </button>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default ModeSelection;