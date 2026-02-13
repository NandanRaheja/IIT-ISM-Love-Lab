import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { Send, Cloud } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Confessions = () => {
  const navigate = useNavigate();
  const [confessions, setConfessions] = useState([]);
  const [wordCloud, setWordCloud] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showWordCloud, setShowWordCloud] = useState(false);
  const [newConfession, setNewConfession] = useState('');
  const [identity, setIdentity] = useState({
    batch: '',
    hostel: '',
    department: ''
  });

  useEffect(() => {
    fetchConfessions();
    fetchWordCloud();
  }, []);

  const fetchConfessions = async () => {
    try {
      const response = await axios.get(`${API}/confessions`);
      setConfessions(response.data.confessions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching confessions:', error);
      setLoading(false);
    }
  };

  const fetchWordCloud = async () => {
    try {
      const response = await axios.get(`${API}/wordcloud`);
      setWordCloud(response.data.words || []);
    } catch (error) {
      console.error('Error fetching word cloud:', error);
    }
  };

  const submitConfession = async () => {
    if (!newConfession.trim() || !identity.batch || !identity.hostel || !identity.department) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post(`${API}/confessions`, {
        text: newConfession,
        campus_identity: identity
      });
      
      setNewConfession('');
      setShowForm(false);
      fetchConfessions();
      alert('Confession submitted!');
    } catch (error) {
      console.error('Error submitting:', error);
      alert(error.response?.data?.detail || 'Failed to submit confession');
    }
  };

  const batches = ['B.Tech./Int.M.Tech.', 'M.Tech', 'M.Sc Tech', 'MBA'];
  const hostels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const departments = [
    { genre: 'Tech Romance Thriller', branch: 'Computer Science & Engineering' },
    { genre: 'Analytical Romantic Drama', branch: 'Mathematics & Computing' },
    { genre: 'Intense Energy Saga', branch: 'Electrical Engineering' },
    { genre: 'Signal & Silence Story', branch: 'Electronics & Communication Engineering' },
    { genre: 'Slow-Burn Love Story', branch: 'Civil Engineering' },
    { genre: 'Action Hero With Soft Corner', branch: 'Mechanical Engineering' },
    { genre: 'Deep & Dramatic Epic', branch: 'Mining Engineering' },
    { genre: 'Heavy Metal Romance', branch: 'Mining Machinery Engineering' },
    { genre: 'Experimental Love Story', branch: 'Chemical Engineering' },
    { genre: 'Earth & Emotions Chronicle', branch: 'Applied Geology' },
    { genre: 'Seismic Heartbeat Saga', branch: 'Applied Geophysics' },
    { genre: 'Environmental Parallel Cinema', branch: 'Environmental Engineering' },
    { genre: 'Physics-Based Love Theory', branch: 'Engineering Physics' }
  ];

  return (
    <Layout>
      <NotebookCard className="overflow-y-auto">
        <div className="flex-1">
          <div className="text-center mb-6">
            <h1 className="handwritten text-4xl font-bold text-[#E11D48] mb-3">
              Confession Wall
            </h1>
            <div className="bg-white px-6 py-2 rounded-lg shadow-sm inline-block">
              <p className="text-[#1C1917] text-sm font-medium">
                Anonymous. Moderated. 24-hour visibility.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              data-testid="add-confession-button"
              onClick={() => { setShowForm(!showForm); setShowWordCloud(false); }}
              className="flex-1 bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-full px-6 py-3 font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {showForm ? 'Cancel' : 'Add'}
            </button>
            
            <button
              data-testid="wordcloud-button"
              onClick={() => { setShowWordCloud(!showWordCloud); setShowForm(false); }}
              className="flex-1 bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-6 py-3 font-medium transition-all flex items-center justify-center gap-2"
            >
              <Cloud className="w-5 h-5" />
              Word Cloud
            </button>
          </div>

          <AnimatePresence>
            {showWordCloud && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-[#FFF1F2] to-[#FFE4E6] p-6 rounded-xl">
                  <h3 className="handwritten text-2xl font-bold text-[#E11D48] mb-4 text-center">
                    Most Used Words in Memories
                  </h3>
                  {wordCloud.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {wordCloud.slice(0, 20).map((word, index) => {
                        const size = Math.max(12, Math.min(32, 12 + word.count * 2));
                        return (
                          <motion.span
                            key={word.text}
                            data-testid={`word-${index}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="font-medium text-[#E11D48] hover:text-[#BE123C] cursor-default transition-colors"
                            style={{ fontSize: `${size}px` }}
                          >
                            {word.text}
                          </motion.span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-[#A8A29E]">Not enough data yet</p>
                  )}
                </div>
              </motion.div>
            )}
            
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 space-y-4 overflow-hidden"
              >
                <textarea
                  data-testid="confession-text"
                  value={newConfession}
                  onChange={(e) => setNewConfession(e.target.value)}
                  placeholder="Share your anonymous confession..."
                  className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-[#1C1917] focus:ring-2 focus:ring-[#E11D48] focus:border-transparent outline-none resize-none min-h-[100px]"
                />

                <div className="grid grid-cols-2 gap-2">
                  {batches.map(batch => (
                    <button
                      key={batch}
                      data-testid={`batch-${batch.toLowerCase().replace(/\//g, '-').replace(/\./g, '')}`}
                      onClick={() => setIdentity({...identity, batch})}
                      className={`py-2 px-3 text-sm rounded-lg border-2 transition-all ${
                        identity.batch === batch
                          ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48] font-medium'
                          : 'border-[#E5E7EB] hover:border-[#E11D48] text-[#57534E] font-medium bg-white'
                      }`}
                    >
                      {batch}
                    </button>
                  ))}
                </div>

                <select
                  data-testid="hostel-select"
                  value={identity.hostel}
                  onChange={(e) => setIdentity({...identity, hostel: e.target.value})}
                  className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg px-4 py-2 text-sm"
                >
                  <option value="">Select hostel</option>
                  {hostels.map(h => <option key={h} value={h}>Hostel {h}</option>)}
                </select>

                <select
                  data-testid="department-select"
                  value={identity.department}
                  onChange={(e) => setIdentity({...identity, department: e.target.value})}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-xl px-4 py-2 text-sm text-[#57534E] font-medium focus:ring-2 focus:ring-[#E11D48] outline-none"
                >
                  <option value="" className="text-[#A8A29E]">Select genre</option>
                  {departments.map(d => (
                    <option key={d.branch} value={d.branch} className="text-[#57534E]">{d.genre}</option>
                  ))}
                </select>

                <button
                  data-testid="submit-confession-button"
                  onClick={submitConfession}
                  className="w-full bg-[#E11D48] text-white rounded-full px-6 py-3 font-medium"
                >
                  Submit Anonymously
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confessions List */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-[#A8A29E] py-8">Loading confessions...</p>
            ) : confessions.length === 0 ? (
              <p className="text-center text-[#A8A29E] py-8">No confessions yet. Be the first!</p>
            ) : (
              confessions.map((confession, index) => (
                <motion.div
                  key={confession.id}
                  data-testid={`confession-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] hover:border-[#E11D48] transition-all"
                >
                  <p className="text-[#1C1917] mb-3">{confession.text}</p>
                  <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                    <span>{confession.campus_identity.batch}</span>
                    <span>•</span>
                    <span>Hostel {confession.campus_identity.hostel}</span>
                    <span>•</span>
                    <span>{confession.campus_identity.department}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-8">
            <button
              data-testid="back-button"
              onClick={() => navigate('/')}
              className="w-full bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-8 py-3 font-medium transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default Confessions;