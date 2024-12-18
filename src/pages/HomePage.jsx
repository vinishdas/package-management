import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '../components/StudentDashboard';
import ReceptionistDashboard from '../components/ReceptionistDashboard';

function HomePage() {
    const navigate = useNavigate();

    // Get the user's role from localStorage
    const role = localStorage.getItem('role');

    // If no role is found, redirect to Login
    if (!role) {
        navigate('/');
        return null;
    }

    return (
        <div className="container mt-5">
            <h1>Welcome to the Home Page</h1>
            {/* Conditional rendering based on the user's role */}
            {role === 'student' && <StudentDashboard />}
            {role === 'receptionist' && <ReceptionistDashboard />}
        </div>
    );
}

export default HomePage;
