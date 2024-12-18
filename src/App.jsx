import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import StudentDashboard from './components/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Router>
         <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route
        path="/receptionist"
        element={
            <ProtectedRoute role="receptionist">
                <ReceptionistDashboard />
            </ProtectedRoute>
        }
    />
    <Route
        path="/student"
        element={
            <ProtectedRoute role="student">
                <StudentDashboard />
            </ProtectedRoute>
        }
    />
</Routes>;
        </Router>
    );
}

export default App;
