import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { Trophy, Heart, Building, GraduationCap } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Leaderboards = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('batch');

  // Department name mapping
  const departmentShortNames = {
    'Computer Science & Engineering': 'CSE',
    'Mathematics & Computing': 'MnC',
    'Electrical Engineering': 'EE',
    'Electronics & Communication Engineering': 'ECE',
    'Civil Engineering': 'CE',
    'Mechanical Engineering': 'ME',
    'Mining Engineering': 'Mining',
    'Mining Machinery Engineering': 'MME',
    'Chemical Engineering': 'CHE',
    'Applied Geology': 'AGL',
    'Applied Geophysics': 'AGP',
    'Environmental Engineering': 'ENV',
    'Engineering Physics': 'EP'
  };

  const getDepartmentShortName = (fullName) => {
    return departmentShortNames[fullName] || fullName;
  };

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const response = await axios.get(`${API}/leaderboards`);
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#57534E]">Loading stats...</p>
          </div>
        </NotebookCard>
      </Layout>
    );
  }

  return (
    <Layout>
      <NotebookCard className="overflow-y-auto">
        <div className="flex-1">
          <div className="text-center mb-6">
            <h1 className="handwritten text-4xl font-bold text-[#E11D48] mb-3">
              Campus Leaderboards
            </h1>
            <div className="bg-white px-6 py-2 rounded-lg shadow-sm inline-block">
              <p className="text-[#1C1917] text-sm font-medium">
                {stats?.total_participants || 0} participants and counting
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <button
              data-testid="batch-tab"
              onClick={() => setActiveTab('batch')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'batch'
                  ? 'bg-[#E11D48] text-white'
                  : 'bg-[#F5F5F4] text-[#57534E] hover:bg-[#E5E7EB]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Batch
            </button>
            <button
              data-testid="hostel-tab"
              onClick={() => setActiveTab('hostel')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'hostel'
                  ? 'bg-[#E11D48] text-white'
                  : 'bg-[#F5F5F4] text-[#57534E] hover:bg-[#E5E7EB]'
              }`}
            >
              <Building className="w-4 h-4" />
              Hostel
            </button>
            <button
              data-testid="department-tab"
              onClick={() => setActiveTab('department')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'department'
                  ? 'bg-[#E11D48] text-white'
                  : 'bg-[#F5F5F4] text-[#57534E] hover:bg-[#E5E7EB]'
              }`}
            >
              <Heart className="w-4 h-4" />
              Department
            </button>
          </div>

          {/* Leaderboard Content */}
          <div className="space-y-3">
            {activeTab === 'batch' && stats?.batch_stats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {stats.batch_stats.length > 0 ? (
                  stats.batch_stats.map((item, index) => (
                    <div
                      key={item._id}
                      data-testid={`batch-item-${index}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-[#E5E7EB] hover:border-[#E11D48] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-[#F59E0B] text-white' :
                          index === 1 ? 'bg-[#A8A29E] text-white' :
                          index === 2 ? 'bg-[#D97706] text-white' :
                          'bg-[#F5F5F4] text-[#57534E]'
                        }`}>
                          {index === 0 ? <Trophy className="w-5 h-5" /> : index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-[#1C1917]">{item._id || 'Unknown'}</div>
                          <div className="text-xs text-[#A8A29E]">{item.count} participants</div>
                        </div>
                      </div>
                      {item.avg_score !== undefined && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#E11D48]">
                            {Math.round(item.avg_score)}%
                          </div>
                          <div className="text-xs text-[#A8A29E]">avg score</div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#A8A29E] py-8">No data yet</p>
                )}
              </motion.div>
            )}

            {activeTab === 'hostel' && stats?.hostel_stats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {stats.hostel_stats.length > 0 ? (
                  stats.hostel_stats.map((item, index) => (
                    <div
                      key={item._id}
                      data-testid={`hostel-item-${index}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-[#E5E7EB] hover:border-[#E11D48] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-[#F59E0B] text-white' :
                          index === 1 ? 'bg-[#A8A29E] text-white' :
                          index === 2 ? 'bg-[#D97706] text-white' :
                          'bg-[#F5F5F4] text-[#57534E]'
                        }`}>
                          {index === 0 ? <Trophy className="w-5 h-5" /> : index + 1}
                        </div>
                        <div className="font-medium text-[#1C1917]">{item._id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#E11D48]">{item.count}</div>
                        <div className="text-xs text-[#A8A29E]">participants</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#A8A29E] py-8">No data yet</p>
                )}
              </motion.div>
            )}

            {activeTab === 'department' && stats?.department_stats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {stats.department_stats.length > 0 ? (
                  stats.department_stats.map((item, index) => (
                    <div
                      key={item._id}
                      data-testid={`department-item-${index}`}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-[#E5E7EB] hover:border-[#E11D48] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-[#F59E0B] text-white' :
                          index === 1 ? 'bg-[#A8A29E] text-white' :
                          index === 2 ? 'bg-[#D97706] text-white' :
                          'bg-[#F5F5F4] text-[#57534E]'
                        }`}>
                          {index === 0 ? <Trophy className="w-5 h-5" /> : index + 1}
                        </div>
                        <div className="font-medium text-[#1C1917]">{getDepartmentShortName(item._id)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#E11D48]">{item.count}</div>
                        <div className="text-xs text-[#A8A29E]">participants</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-[#A8A29E] py-8">No data yet</p>
                )}
              </motion.div>
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

export default Leaderboards;