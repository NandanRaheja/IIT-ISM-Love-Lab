import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import html2canvas from 'html2canvas';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { Download, Share2, MessageCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [mode, setMode] = useState('couple');

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    try {
      const sessionId = sessionStorage.getItem('sessionId');
      const storedMode = sessionStorage.getItem('mode');
      setMode(storedMode);
      
      const response = await axios.post(`${API}/generate-insights`, {
        session_id: sessionId,
        mode: storedMode
      });
      
      setInsights(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error generating insights:', error);
      alert('Failed to generate insights');
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#FDFBF7',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = 'iitism-love-lab-result.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const shareToWhatsApp = async () => {
    const text = mode === 'couple' 
      ? `I got ${insights.perception_score}% perception alignment on IIT(ISM) Love Lab! 💕`
      : `My self-awareness score: ${insights.self_awareness_score}% on IIT(ISM) Love Lab! 🎯`;
    const url = 'https://campus-hearts-5.preview.emergentagent.com';
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareToInstagram = async () => {
    alert('Download the card and share it to your Instagram story!');
    downloadCard();
  };

  if (loading) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex space-x-2 mb-4">
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
            <p className="text-[#57534E] text-center">
              Analyzing your emotional patterns...
            </p>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  if (!insights) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-[#57534E] text-center mb-4">Failed to load insights</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#E11D48] text-white rounded-full px-6 py-3"
            >
              Back to Home
            </button>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  return (
    <Layout>
      <NotebookCard className="overflow-y-auto">
        <div className="flex-1">
          {mode === 'couple' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Shareable Card */}
              <div ref={cardRef} className="bg-[#FDFBF7] p-6 rounded-xl mb-6">
                <div className="text-center mb-4">
                  <h1 className="handwritten text-4xl font-bold text-[#E11D48] mb-2">
                    IIT(ISM) Love Lab
                  </h1>
                  <p className="text-xs text-[#A8A29E]">Valentine 2026</p>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-[#E11D48] mb-2">
                    {insights.perception_score}%
                  </div>
                  <div className="text-sm text-[#57534E]">Perception Alignment</div>
                  <div className="mt-2 px-4 py-2 bg-[#FFF1F2] rounded-full inline-block">
                    <span className="text-sm font-medium text-[#E11D48]">
                      {insights.relationship_type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Insights */}
              <div className="space-y-6">
                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    What You Got Right ✔️
                  </h3>
                  <ul className="space-y-2">
                    {insights.got_right.map((item, i) => (
                      <li key={i} className="text-[#57534E] pl-4 border-l-2 border-[#10B981]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    What You Misread 💡
                  </h3>
                  <ul className="space-y-2">
                    {insights.misread.map((item, i) => (
                      <li key={i} className="text-[#57534E] pl-4 border-l-2 border-[#F59E0B]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Key Insights
                  </h3>
                  <ul className="space-y-2">
                    {insights.insights.map((item, i) => (
                      <li key={i} className="text-[#57534E] pl-4 border-l-2 border-[#E11D48]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FFF1F2] p-4 rounded-xl">
                  <h3 className="handwritten text-xl font-bold text-[#1C1917] mb-2">
                    This Semester Needs:
                  </h3>
                  <p className="text-[#57534E]">{insights.semester_needs}</p>
                </div>

                <div className="bg-[#FFF1F2] p-4 rounded-xl">
                  <h3 className="handwritten text-xl font-bold text-[#1C1917] mb-2">
                    Hidden Admiration:
                  </h3>
                  <p className="text-[#57534E] italic">"{insights.hidden_admiration_reveal}"</p>
                </div>

                <div className="bg-gradient-to-br from-[#E11D48]/10 to-[#F59E0B]/10 p-4 rounded-xl">
                  <h3 className="handwritten text-xl font-bold text-[#1C1917] mb-2">
                    Message from 2035:
                  </h3>
                  <p className="text-[#57534E] italic">{insights.alumni_letter_2035}</p>
                </div>

                <div className="text-center py-6 border-t-2 border-b-2 border-[#E11D48]">
                  <p className="handwritten text-2xl text-[#1C1917] font-medium">
                    "{insights.sentence_to_say}"
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Single Mode Results */}
              <div ref={cardRef} className="bg-[#FDFBF7] p-6 rounded-xl mb-6">
                <div className="text-center mb-4">
                  <h1 className="handwritten text-4xl font-bold text-[#E11D48] mb-2">
                    IIT(ISM) Love Lab
                  </h1>
                  <p className="text-xs text-[#A8A29E]">Valentine 2026</p>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-[#E11D48] mb-2">
                    {insights.self_awareness_score}%
                  </div>
                  <div className="text-sm text-[#57534E]">Self-Awareness Score</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Relationship Readiness
                  </h3>
                  <p className="text-[#57534E] pl-4 border-l-2 border-[#E11D48]">
                    {insights.relationship_readiness}
                  </p>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Your Emotional Pattern
                  </h3>
                  <p className="text-[#57534E] pl-4 border-l-2 border-[#10B981]">
                    {insights.emotional_pattern}
                  </p>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Ideal Partner Traits
                  </h3>
                  <ul className="space-y-2">
                    {insights.ideal_partner_traits.map((trait, i) => (
                      <li key={i} className="text-[#57534E] pl-4 border-l-2 border-[#E11D48]">
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FFF1F2] p-4 rounded-xl">
                  <h3 className="handwritten text-xl font-bold text-[#1C1917] mb-2">
                    Your IIT(ISM) Meet-Cute:
                  </h3>
                  <p className="text-[#57534E] italic">{insights.meet_cute_story}</p>
                </div>

                <div className="bg-gradient-to-br from-[#E11D48]/10 to-[#F59E0B]/10 p-4 rounded-xl">
                  <h3 className="handwritten text-xl font-bold text-[#1C1917] mb-2">
                    Message from Your Future Partner:
                  </h3>
                  <p className="text-[#57534E] italic">{insights.future_message}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button
              data-testid="download-button"
              onClick={downloadCard}
              className="w-full bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-full px-8 py-4 font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Result Card
            </button>
            
            <div className="flex gap-2">
              <button
                data-testid="share-whatsapp-button"
                onClick={shareToWhatsApp}
                className="flex-1 bg-[#10B981] text-white hover:bg-[#059669] rounded-full px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                data-testid="share-instagram-button"
                onClick={shareToInstagram}
                className="flex-1 bg-gradient-to-r from-[#E11D48] to-[#F59E0B] text-white hover:opacity-90 rounded-full px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Instagram
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                data-testid="leaderboards-button"
                onClick={() => navigate('/leaderboards')}
                className="flex-1 bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-4 py-3 text-sm font-medium transition-all"
              >
                Leaderboards
              </button>
              <button
                data-testid="home-button"
                onClick={() => navigate('/')}
                className="flex-1 bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-4 py-3 text-sm font-medium transition-all"
              >
                Home
              </button>
            </div>
          </div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-12 text-center py-6"
          >
            <p className="handwritten text-2xl text-[#1C1917] italic">
              "In a campus built on competition,
            </p>
            <p className="handwritten text-2xl text-[#E11D48] italic font-bold">
              you chose understanding."
            </p>
          </motion.div>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default Results;