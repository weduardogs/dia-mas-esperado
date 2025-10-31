import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import CyePage from './pages/CyePage';
import MisXvPage from './pages/MisXvPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/cye" element={<CyePage />} />
        <Route path="/misxv" element={<MisXvPage />} />
      </Routes>
    </Router>
  );
}

export default App;