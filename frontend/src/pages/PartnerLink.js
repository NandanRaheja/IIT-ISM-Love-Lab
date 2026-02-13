import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { Heart, Copy, Check, Users } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PartnerLink = () => {
  const navigate = useNavigate();
  const { linkId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [linkInfo, setLinkInfo] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (linkId) {
      checkLink();
    } else {
      // Check if we have a generated link to show
      const storedLink = sessionStorage.getItem('partnerLinkId');
      if (storedLink) {
        setGeneratedLink(storedLink);
        checkResults(storedLink);
      }
      setLoading(false);
    }
  }, [linkId]);

  const checkLink = async () => {
    try {
      const response = await axios.get(`${API}/partner-link/${linkId}`);
      setLinkInfo(response.data);
      
      if (response.data.completed) {
        // Get results
        const resultsRes = await axios.get(`${API}/partner-link/${linkId}/results`);
        setResults(resultsRes.data);
      }
    } catch (err) {
      setError('Link not found or expired');
    }
    setLoading(false);
  };

  const checkResults = async (link) => {
    try {
      const response = await axios.get(`${API}/partner-link/${link}/results`);
      if (response.data.completed) {
        setResults(response.data);
      }
    } catch (err) {
      // Not ready yet
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/partner/${generatedLink}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startPartnerQuiz = () => {
    sessionStorage.setItem('partnerLinkId', linkId);
    sessionStorage.setItem('mode', 'partner');
    navigate('/campus-identity');
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
            <p className="text-[#1C1917]">Loading...</p>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  // Show results if completed
  if (results && results.completed) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Heart className="w-16 h-16 text-[#E11D48] mx-auto mb-4" />
              <h1 className="handwritten text-4xl font-bold text-[#E11D48] mb-2">
                Partner Match Results
              </h1>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="text-center mb-8"
            >
              <div className="text-7xl font-bold text-[#E11D48] mb-2">
                {results.match_score}%
              </div>
              <p className="text-[#57534E]">Compatibility Score</p>
            </motion.div>

            {results.matches && results.matches.length > 0 && (
              <div className="mb-6">
                <h3 className="handwritten text-2xl font-bold text-[#10B981] mb-3">
                  You Both Agree On
                </h3>
                <div className="space-y-3">
                  {results.matches.map((match, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-[#D1FAE5] p-4 rounded-lg"
                    >
                      <p className="font-medium text-[#065F46]">{match.question}</p>
                      <p className="text-sm text-[#047857]">
                        {Array.isArray(match.your_answer) 
                          ? match.your_answer.join(', ')
                          : match.your_answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {results.mismatches && results.mismatches.length > 0 && (
              <div className="mb-6">
                <h3 className="handwritten text-2xl font-bold text-[#F59E0B] mb-3">
                  Room for Discovery
                </h3>
                <div className="space-y-3">
                  {results.mismatches.map((mismatch, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-[#FEF3C7] p-4 rounded-lg"
                    >
                      <p className="font-medium text-[#92400E]">{mismatch.question}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div className="bg-white/50 p-2 rounded">
                          <p className="text-xs text-[#78716C]">You said</p>
                          <p className="text-[#92400E]">
                            {Array.isArray(mismatch.your_answer)
                              ? mismatch.your_answer.join(', ')
                              : mismatch.your_answer}
                          </p>
                        </div>
                        <div className="bg-white/50 p-2 rounded">
                          <p className="text-xs text-[#78716C]">Partner said</p>
                          <p className="text-[#92400E]">
                            {Array.isArray(mismatch.partner_answer)
                              ? mismatch.partner_answer.join(', ')
                              : mismatch.partner_answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#E11D48] text-white rounded-full py-4 font-medium mt-6"
            >
              Back to Home
            </button>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  // Show share link page (for Partner A after generating link)
  if (generatedLink && !linkId) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Users className="w-16 h-16 text-[#E11D48] mx-auto mb-4" />
              <h1 className="handwritten text-3xl font-bold text-[#E11D48] text-center mb-2">
                Share With Your Partner
              </h1>
              <p className="text-[#57534E] text-center mb-6">
                Send this link to your partner. When they complete the quiz, you'll both see how well you match!
              </p>
            </motion.div>

            <div className="w-full bg-[#FFF1F2] p-4 rounded-xl mb-4">
              <p className="text-xs text-[#A8A29E] mb-1">Your Partner Link</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-[#E11D48] font-mono text-lg break-all">
                  {generatedLink}
                </code>
                <button
                  onClick={copyLink}
                  className="p-2 bg-[#E11D48] text-white rounded-lg"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={copyLink}
              className="w-full bg-[#E11D48] text-white rounded-full py-4 font-medium mb-3"
            >
              {copied ? 'Copied!' : 'Copy Full Link'}
            </button>

            <button
              onClick={() => checkResults(generatedLink)}
              className="w-full bg-transparent border-2 border-[#E11D48] text-[#E11D48] rounded-full py-3 font-medium mb-3"
            >
              Check if Partner Completed
            </button>

            <button
              onClick={() => navigate('/')}
              className="text-[#A8A29E] text-sm"
            >
              Back to Home
            </button>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  // Show error
  if (error) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-[#E11D48] mb-4">{error}</p>
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

  // Show join page (for Partner B)
  if (linkId && linkInfo && !linkInfo.completed) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Heart className="w-20 h-20 text-[#E11D48] mx-auto mb-4" />
              <h1 className="handwritten text-3xl font-bold text-[#E11D48] text-center mb-2">
                Your Partner Invited You!
              </h1>
              <p className="text-[#57534E] text-center mb-6">
                Answer the same questions and see how well your answers match!
              </p>

              {linkInfo.partner_a_campus && (
                <div className="bg-[#FFF1F2] p-4 rounded-xl mb-6 text-center">
                  <p className="text-sm text-[#A8A29E]">Your partner is from</p>
                  <p className="text-[#E11D48] font-medium">
                    {linkInfo.partner_a_campus.department}
                  </p>
                  <p className="text-[#57534E] text-sm">
                    {linkInfo.partner_a_campus.year} • {linkInfo.partner_a_campus.hostel}
                  </p>
                </div>
              )}

              <button
                onClick={startPartnerQuiz}
                className="w-full bg-[#E11D48] text-white rounded-full py-4 font-medium"
              >
                Start Quiz
              </button>
            </motion.div>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  // Default - no link
  return (
    <Layout>
      <NotebookCard>
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[#57534E] mb-4">No partner link found</p>
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
};

export default PartnerLink;
