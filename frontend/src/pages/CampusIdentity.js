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
      short: 'CSE',
      genre: 'Tech Romance Thriller',
      branch: 'Computer Science & Engineering'
    },
    {
      short: 'MnC',
      genre: 'Analytical Romantic Drama',
      branch: 'Mathematics & Computing'
    },
    {
      short: 'EE',
      genre: 'Intense Energy Saga',
      branch: 'Electrical Engineering'
    },
    {
      short: 'ECE',
      genre: 'Signal & Silence Story',
      branch: 'Electronics & Communication Engineering'
    },
    {
      short: 'CE',
      genre: 'Slow-Burn Love Story',
      branch: 'Civil Engineering'
    },
    {
      short: 'ME',
      genre: 'Action Hero With Soft Corner',
      branch: 'Mechanical Engineering'
    },
    {
      short: 'Mining Eng.',
      genre: 'Deep & Dramatic Epic',
      branch: 'Mining Engineering'
    },
    {
      short: 'MME',
      genre: 'Heavy Metal Romance',
      branch: 'Mining Machinery Engineering'
    },
    {
      short: 'CHE',
      genre: 'Experimental Love Story',
      branch: 'Chemical Engineering'
    },
    {
      short: 'AGL',
      genre: 'Earth & Emotions Chronicle',
      branch: 'Applied Geology'
    },
    {
      short: 'AGP',
      genre: 'Seismic Heartbeat Saga',
      branch: 'Applied Geophysics'
    },
    {
      short: 'ENV',
      genre: 'Environmental Parallel Cinema',
      branch: 'Environmental Engineering'
    },
    {
      short: 'EP',
      genre: 'Physics-Based Love Theory',
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
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-2xl px-4 py-4 text-[#1C1917] font-medium focus:ring-2 focus:ring-[#E11D48] focus:border-[#E11D48] focus:shadow-lg focus:shadow-[#E11D48]/20 outline-none transition-all duration-300"
              >
                <option value="" className="text-[#A8A29E]">Select your genre...</option>
                {departments.map(dept => (
                  <option 
                    key={dept.branch} 
                    value={dept.branch}
                    className="text-[#1C1917] py-3"
                  >
                    {dept.short} - {dept.genre}
                  </option>
                ))}
              </select>
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