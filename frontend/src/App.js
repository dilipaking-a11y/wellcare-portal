import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SpecialistPanel from './pages/SpecialistPanel';
import CarePlan from './pages/CarePlan';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/specialist" element={<SpecialistPanel />} />
          <Route path="/care-plan" element={<CarePlan />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;