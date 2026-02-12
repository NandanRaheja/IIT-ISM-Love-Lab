import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import ProgressBar from '../components/ProgressBar';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CoupleQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    survived: '',
    story_began: '',
    texts_first: '',
    real_memory: '',
    partner_stress: '',
    partner_appreciated: '',
    partner_needs: '',
    take_for_granted: '',
    hidden_admiration: ''
  });

  const questions = [
    {
      id: 'survived',
      title: 'Your relationship survived:',
      type: 'choice',
      options: ['Mess paneer', '75% attendance', 'Intern season', 'Lab politics', 'Placement anxiety']
    },
    {
      id: 'story_began',
      title: 'Where did your story begin?',
      type: 'choice',
      options: ['Main Building stairs', 'Library', 'Hostel corridor', 'Fest', 'Tutorial section']
    },
    {
      id: 'texts_first',
      title: 'Who texts "Reached hostel?" first?',
      type: 'choice',
      options: ['Me', 'Them', 'Both equally', 'Neither - we call']
    },
    {
      id: 'real_memory',
      title: 'Share one real memory',
      type: 'text',
      placeholder: 'A moment that still makes you smile...'
    },
    {
      id: 'partner_stress',
      title: 'What stresses your partner most right now?',
      type: 'text',
      placeholder: 'Be honest and thoughtful...'
    },
    {
      id: 'partner_appreciated',
      title: 'When does your partner feel most appreciated?',
      type: 'text',
      placeholder: 'Think about the small moments...'
    },
    {
      id: 'partner_needs',
      title: 'What does your partner need more of?',
      type: 'choice',
      options: ['Reassurance', 'Space', 'Motivation', 'Appreciation', 'Patience']
    },
    {
      id: 'take_for_granted',
      title: 'One thing you take for granted about them',
      type: 'text',
      placeholder: 'What do they always do that you rarely acknowledge?'
    },
    {
      id: 'hidden_admiration',
      title: 'What do you admire but rarely say?',
      type: 'text',
      placeholder: 'Something you notice but don\'t express often...'
    }
  ];

  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      alert('Please answer the question');
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAnswers();
    }
  };

  const submitAnswers = async () => {
    try {
      const sessionId = sessionStorage.getItem('sessionId');
      const campusIdentity = JSON.parse(sessionStorage.getItem('campusIdentity'));
      
      // Submit responses
      await axios.post(`${API}/responses/couple`, {
        session_id: sessionId,
        campus_identity: campusIdentity,
        mode: 'couple',
        ...answers
      });
      
      // Navigate to loading and generate insights
      navigate('/results', { state: { generating: true } });
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <Layout>
      <NotebookCard>
        <div className="flex-1 flex flex-col">
          <ProgressBar current={currentStep + 1} total={questions.length} />
          
          <div className="flex-1">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="handwritten text-3xl md:text-4xl font-bold text-[#1C1917] mb-8">
                {currentQuestion.title}
              </h2>

              {currentQuestion.type === 'choice' ? (
                <div className="space-y-3">
                  {currentQuestion.options.map(option => (
                    <button
                      key={option}
                      data-testid={`option-${option.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setAnswers({...answers, [currentQuestion.id]: option})}
                      className={`w-full text-left py-4 px-6 rounded-xl border-2 transition-all ${
                        answers[currentQuestion.id] === option
                          ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48] font-medium'
                          : 'border-[#E5E7EB] hover:border-[#E11D48] text-[#57534E]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  data-testid="text-input"
                  value={answers[currentQuestion.id]}
                  onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                  placeholder={currentQuestion.placeholder}
                  className="w-full bg-transparent border-b-2 border-[#A8A29E] focus:border-[#E11D48] px-0 py-3 outline-none text-lg text-[#1C1917] placeholder:text-[#A8A29E] transition-colors resize-none min-h-[120px]"
                />
              )}
            </motion.div>
          </div>

          <div className="mt-8 flex gap-3">
            {currentStep > 0 && (
              <button
                data-testid="previous-button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                ← Previous
              </button>
            )}
            
            <button
              data-testid="next-button"
              onClick={handleNext}
              className="flex-1 bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-full px-8 py-4 font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default CoupleQuestionnaire;