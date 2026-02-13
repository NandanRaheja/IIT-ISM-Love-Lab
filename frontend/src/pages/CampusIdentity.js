import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { v4 as uuidv4 } from 'uuid';

const CampusIdentity = () => {
  const navigate = useNavigate();
  const mode = sessionStorage.getItem('mode');
  
  const [identity, setIdentity] = useState({
    batch: '',
    hostel: '',
    department: ''
  });

  const batches = ['B.Tech./Int.M.Tech.', 'M.Tech', 'M.Sc Tech', 'MBA'];
  const hostels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const departments = [
    {
      genre: 'Tech Romance Thriller',
      subtitle: 'Debugging code by day. Overthinking texts by night.',
      branch: 'Computer Science & Engineering'
    },
    {
      genre: 'Analytical Romantic Drama',
      subtitle: 'Finds patterns everywhere. Especially in mixed signals.',
      branch: 'Mathematics & Computing'
    },
    {
      genre: 'Intense Energy Saga',
      subtitle: 'High voltage outside. Low battery emotionally.',
      branch: 'Electrical Engineering'
    },
    {
      genre: 'Signal & Silence Story',
      subtitle: 'Knows transmission. Struggles with confession.',
      branch: 'Electronics & Communication Engineering'
    },
    {
      genre: 'Slow-Burn Love Story',
      subtitle: 'Builds patiently. Falls silently.',
      branch: 'Civil Engineering'
    },
    {
      genre: 'Action Hero With Soft Corner',
      subtitle: 'Loud laugh. Quiet feelings.',
      branch: 'Mechanical Engineering'
    },
    {
      genre: 'Deep & Dramatic Epic',
      subtitle: 'Understands depth. Rarely shows it.',
      branch: 'Mining Engineering'
    },
    {
      genre: 'Heavy Metal Romance',
      subtitle: 'Machines are simple. Hearts are not.',
      branch: 'Mining Machinery Engineering'
    },
    {
      genre: 'Experimental Love Story',
      subtitle: 'Unpredictable chemistry.',
      branch: 'Chemical Engineering'
    },
    {
      genre: 'Earth & Emotions Chronicle',
      subtitle: 'Studies layers. Hides their own.',
      branch: 'Applied Geology'
    },
    {
      genre: 'Seismic Heartbeat Saga',
      subtitle: 'Detects vibrations others miss.',
      branch: 'Applied Geophysics'
    },
    {
      genre: 'Environmental Parallel Cinema',
      subtitle: 'Cares deeply. Shows it quietly.',
      branch: 'Environmental Engineering'
    },
    {
      genre: 'Physics-Based Love Theory',
      subtitle: 'Believes in forces. Especially unseen ones.',
      branch: 'Engineering Physics'
    }
  ];

  const handleNext = () => {
    if (!identity.batch || !identity.hostel || !identity.department) {
      alert('Please fill all fields');
      return;
    }
    
    const sessionId = uuidv4();
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('campusIdentity', JSON.stringify(identity));
    
    if (mode === 'couple') {
      navigate('/couple');
    } else {
      navigate('/single');
    }
  };

  return (
    <Layout>
      <NotebookCard>
        <div className="flex-1 flex flex-col">
          <h2 className="handwritten text-4xl font-bold text-[#1C1917] mb-3">
            Campus Identity
          </h2>
          
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm mb-8 inline-block">
            <p className="text-[#1C1917] text-sm font-medium">
              Anonymous. Only for stats.
            </p>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-2">
                Batch <span className="text-[#E11D48]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {batches.map(batch => (
                  <button
                    key={batch}
                    data-testid={`batch-${batch.toLowerCase().replace(/\//g, '-').replace(/\./g, '')}`}
                    onClick={() => setIdentity({...identity, batch})}
                    className={`py-4 px-4 rounded-lg border-2 transition-all text-sm ${
                      identity.batch === batch
                        ? 'border-[#E11D48] bg-[#FFF1F2] text-[#E11D48] font-medium'
                        : 'border-[#E5E7EB] bg-white hover:border-[#E11D48] text-[#57534E] font-medium'
                    }`}
                  >
                    {batch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-2">
                Hostel <span className="text-[#E11D48]">*</span>
              </label>
              <select
                data-testid="hostel-select"
                value={identity.hostel}
                onChange={(e) => setIdentity({...identity, hostel: e.target.value})}
                className="w-full bg-white border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-[#57534E] font-medium focus:ring-2 focus:ring-[#E11D48] focus:border-transparent outline-none"
              >
                <option value="" className="text-[#A8A29E]">Select your hostel</option>
                {hostels.map(h => (
                  <option key={h} value={h} className="text-[#57534E]">Hostel {h}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-2">
                🎬 Choose Your Film Genre <span className="text-[#E11D48]">*</span>
              </label>
              <select
                data-testid="department-select"
                value={identity.department}
                onChange={(e) => setIdentity({...identity, department: e.target.value})}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-2xl px-4 py-4 text-[#57534E] font-medium focus:ring-2 focus:ring-[#E11D48] focus:border-[#E11D48] focus:shadow-lg focus:shadow-[#E11D48]/20 outline-none transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                }}
              >
                <option value="" className="text-[#A8A29E]">Select your genre...</option>
                {departments.map(dept => (
                  <option 
                    key={dept.branch} 
                    value={dept.branch}
                    className="text-[#1C1917] py-3"
                  >
                    {dept.genre} - {dept.subtitle}
                  </option>
                ))}
              </select>
              {identity.department && (
                <div className="mt-2 bg-[#FFF1F2] px-4 py-2 rounded-lg">
                  <p className="text-xs text-[#A8A29E] font-medium">
                    {departments.find(d => d.branch === identity.department)?.branch}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              data-testid="next-button"
              onClick={handleNext}
              className="w-full bg-[#E11D48] text-white hover:bg-[#BE123C] rounded-full px-8 py-4 font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Next
            </button>
            
            <button
              data-testid="back-button"
              onClick={() => navigate('/mode')}
              className="w-full text-[#57534E] hover:text-[#1C1917] text-sm transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default CampusIdentity;