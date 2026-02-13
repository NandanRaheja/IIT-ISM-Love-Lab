import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import NotebookCard from '../components/NotebookCard';
import { Shield, Check, X } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0 });

  const ADMIN_PASSWORD = 'iitism2026'; // Simple password for demo

  useEffect(() => {
    if (authenticated) {
      fetchAllConfessions();
      fetchStats();
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const fetchAllConfessions = async () => {
    try {
      const response = await axios.get(`${API}/confessions?limit=100`);
      setConfessions(response.data.confessions);
    } catch (error) {
      console.error('Error fetching confessions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/leaderboards`);
      setStats({
        total: response.data.total_participants || 0,
        approved: confessions.filter(c => c.approved).length,
        pending: confessions.filter(c => !c.approved).length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const moderateConfession = async (confessionId, approved) => {
    try {
      await axios.patch(`${API}/confessions/${confessionId}`, { approved });
      fetchAllConfessions();
    } catch (error) {
      console.error('Error moderating:', error);
    }
  };

  if (!authenticated) {
    return (
      <Layout>
        <NotebookCard>
          <div className="flex-1 flex flex-col items-center justify-center">
            <Shield className="w-16 h-16 text-[#E11D48] mb-4" />
            <h2 className="handwritten text-3xl font-bold text-[#1C1917] mb-4">
              Admin Dashboard
            </h2>
            <p className="text-[#57534E] mb-6 text-center text-sm">
              Confession moderation and statistics
            </p>
            <input
              type="password"
              data-testid="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className="w-full max-w-xs bg-white border-2 border-[#E5E7EB] rounded-lg px-4 py-3 text-[#1C1917] focus:ring-2 focus:ring-[#E11D48] focus:border-transparent outline-none mb-4"
            />
            <button
              data-testid="login-button"
              onClick={handleLogin}
              className="bg-[#E11D48] text-white rounded-full px-8 py-3 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-[#57534E] text-sm"
            >
              ← Back to Home
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="handwritten text-3xl font-bold text-[#E11D48]">
              Admin Dashboard
            </h1>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-sm text-[#57534E] hover:text-[#E11D48]"
            >
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] text-center">
              <div className="text-2xl font-bold text-[#E11D48]">{stats.total}</div>
              <div className="text-xs text-[#A8A29E]">Total Participants</div>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] text-center">
              <div className="text-2xl font-bold text-[#10B981]">{confessions.length}</div>
              <div className="text-xs text-[#A8A29E]">Confessions</div>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-[#E5E7EB] text-center">
              <div className="text-2xl font-bold text-[#F59E0B]">{confessions.filter(c => !c.approved).length}</div>
              <div className="text-xs text-[#A8A29E]">Pending</div>
            </div>
          </div>

          {/* Confessions List */}
          <h3 className="font-bold text-[#1C1917] mb-3">All Confessions</h3>
          <div className="space-y-3">
            {confessions.length === 0 ? (
              <p className="text-center text-[#A8A29E] py-8">No confessions yet</p>
            ) : (
              confessions.map((confession) => (
                <div
                  key={confession.id}
                  className={`p-4 rounded-xl border-2 ${
                    confession.approved ? 'border-[#10B981] bg-[#ECFDF5]' : 'border-[#F59E0B] bg-[#FFFBEB]'
                  }`}
                >
                  <p className="text-[#1C1917] mb-2">{confession.text}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                      <span>{confession.campus_identity.batch}</span>
                      <span>•</span>
                      <span>Hostel {confession.campus_identity.hostel}</span>
                      <span>•</span>
                      <span>{confession.campus_identity.department}</span>
                    </div>
                    <div className="flex gap-2">
                      {!confession.approved && (
                        <button
                          onClick={() => moderateConfession(confession.id, true)}
                          className="p-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669]"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {confession.approved && (
                        <button
                          onClick={() => moderateConfession(confession.id, false)}
                          className="p-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626]"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-6 bg-transparent border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] rounded-full px-8 py-3 font-medium transition-all"
          >
            Back to Home
          </button>
        </div>
      </NotebookCard>
    </Layout>
  );
};

export default Admin;
