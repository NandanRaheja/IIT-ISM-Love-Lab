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
    year: '',
    hostel: '',
    department: ''
  });

  const years = [
    { number: '1', title: 'Fresh Release', year: '1st Year' },
    { number: '2', title: 'Interval Complications', year: '2nd Year' },
    { number: '3', title: 'Emotional Plot Twist', year: '3rd Year' },
    { number: '4', title: 'Pre-Climax Realisation', year: '4th Year' },
    { number: '5', title: 'Grand Finale Season', year: '5th Year / Dual Degree' }
  ];
  const hostels = ['Amber', 'Diamond', 'Jasper', 'Sapphire', 'Topaz', 'Emerald', 'Aquamarine', 'Rosaline', 'Ruby', 'Opal'];
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
    if (!identity.year || !identity.hostel || !identity.department) {
      alert('Please fill all fields');
      return;
    }
    
    const sessionId = uuidv4();
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('campusIdentity', JSON.stringify(identity));
    
    // Check if this is a partner joining via link
    const partnerMode = sessionStorage.getItem('mode');
    if (partnerMode === 'partner') {
      // Skip poster and go directly to questionnaire
      navigate('/couple');
      return;
    }
    
    // Navigate to poster generator first
    navigate('/poster');
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

            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-2">
                🎬 Which Part of the Movie Are You In? <span className="text-[#E11D48]">*</span>
              </label>
              <select
                data-testid="year-select"
                value={identity.year}
                onChange={(e) => setIdentity({...identity, year: e.target.value})}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-2xl px-4 py-4 text-[#1C1917] font-medium focus:ring-2 focus:ring-[#E11D48] focus:border-[#E11D48] focus:shadow-lg focus:shadow-[#E11D48]/20 outline-none transition-all duration-300"
              >
                <option value="" className="text-[#A8A29E]">Select your part...</option>
                {years.map(yr => (
                  <option 
                    key={yr.year} 
                    value={yr.year}
                    className="text-[#1C1917] py-3"
                  >
                    {yr.number} - {yr.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-2">
                🎬 Where Is Your Story Shot? <span className="text-[#E11D48]">*</span>
              </label>
              <select
                data-testid="hostel-select"
                value={identity.hostel}
                onChange={(e) => setIdentity({...identity, hostel: e.target.value})}
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-[#E5E7EB] rounded-2xl px-4 py-4 text-[#1C1917] font-medium focus:ring-2 focus:ring-[#E11D48] focus:border-[#E11D48] focus:shadow-lg focus:shadow-[#E11D48]/20 outline-none transition-all duration-300"
              >
                <option value="" className="text-[#A8A29E]">Select your location...</option>
                {hostels.map(h => (
                  <option key={h} value={h} className="text-[#1C1917]">{h}</option>
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
              onClick={() => {
                const partnerMode = sessionStorage.getItem('mode');
                if (partnerMode === 'partner') {
                  navigate(-1);
                } else {
                  navigate('/mode');
                }
              }}
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