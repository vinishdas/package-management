import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/receptionist" element={<ReceptionistDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
