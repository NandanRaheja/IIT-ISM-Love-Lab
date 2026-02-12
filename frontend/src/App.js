import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ModeSelection from './pages/ModeSelection';
import CampusIdentity from './pages/CampusIdentity';
import CoupleQuestionnaire from './pages/CoupleQuestionnaire';
import SingleQuestionnaire from './pages/SingleQuestionnaire';
import Results from './pages/Results';
import Leaderboards from './pages/Leaderboards';
import Confessions from './pages/Confessions';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mode" element={<ModeSelection />} />
          <Route path="/identity" element={<CampusIdentity />} />
          <Route path="/couple" element={<CoupleQuestionnaire />} />
          <Route path="/single" element={<SingleQuestionnaire />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/confessions" element={<Confessions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;