import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Assuming LoginPage is the login component
import ReceptionistDashboard from './pages/components/ReceptionistDashboard';
import StudentDashboard from './pages/components/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* LoginPage renders at root path */}
        <Route path="/" element={<LoginPage />} />

        {/* These routes will be navigated after login */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
