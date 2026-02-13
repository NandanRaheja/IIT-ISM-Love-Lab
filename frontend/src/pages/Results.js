import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
              <p className="text-[#1C1917] text-center font-medium">
                Analyzing your emotional patterns...
              </p>
            </div>
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
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm mb-4">
              <p className="text-[#1C1917] text-center font-medium">Failed to load insights</p>
            </div>
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
              <div className="bg-[#FDFBF7] p-6 rounded-xl mb-6">
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
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm inline-block mb-2">
                    <div className="text-sm text-[#1C1917] font-medium">Perception Alignment</div>
                  </div>
                  <div className="block">
                    <div className="mt-2 px-4 py-2 bg-[#FFF1F2] rounded-full inline-block">
                      <span className="text-sm font-medium text-[#E11D48]">
                        {insights.relationship_type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Insights */}
              <div className="space-y-6">
                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    What You Got Right ✔️
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <ul className="space-y-2">
                      {insights.got_right.map((item, i) => (
                        <li key={i} className="text-[#1C1917] pl-4 border-l-2 border-[#10B981]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    What You Misread 💡
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <ul className="space-y-2">
                      {insights.misread.map((item, i) => (
                        <li key={i} className="text-[#1C1917] pl-4 border-l-2 border-[#F59E0B]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Key Insights
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <ul className="space-y-2">
                      {insights.insights.map((item, i) => (
                        <li key={i} className="text-[#1C1917] pl-4 border-l-2 border-[#E11D48]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                  <p className="text-[#1C1917] italic">{insights.alumni_letter_2035}</p>
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
              <div className="bg-[#FDFBF7] p-6 rounded-xl mb-6">
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
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm inline-block">
                    <div className="text-sm text-[#1C1917] font-medium">Self-Awareness Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Relationship Readiness
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-[#1C1917] pl-4 border-l-2 border-[#E11D48]">
                      {insights.relationship_readiness}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Your Emotional Pattern
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-[#1C1917] pl-4 border-l-2 border-[#10B981]">
                      {insights.emotional_pattern}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="handwritten text-2xl font-bold text-[#1C1917] mb-3">
                    Ideal Partner Traits
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <ul className="space-y-2">
                      {insights.ideal_partner_traits.map((trait, i) => (
                        <li key={i} className="text-[#1C1917] pl-4 border-l-2 border-[#E11D48]">
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
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
                  <p className="text-[#1C1917] italic">{insights.future_message}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="mt-8 space-y-3">
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

          {/* Partner Match CTA */}
          {mode === 'couple' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 text-center"
            >
              <div className="bg-gradient-to-r from-[#FFF1F2] via-white to-[#FFF1F2] p-6 rounded-2xl border border-[#E11D48]/20">
                <p 
                  className="text-2xl text-[#E11D48] font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Match your results with your partner
                </p>
                <p className="text-sm text-[#A8A29E] mt-2">Ask them to take the quiz too!</p>
              </div>
            </motion.div>
          )}
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default Results;