import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Interview from './pages/Interview'
import Results from './pages/Results'
import Analytics from './pages/Analytics'
import Resume from './pages/Resume'
import CodingRound from './pages/CodingRound'
import History from './pages/History'
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/results" element={<Results />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/coding" element={<CodingRound />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

export default App