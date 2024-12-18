import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        name,
        password,
      });

      const { role } = response.data; // Assuming the response contains a `role` property

      if (role === 'student'||role ==='teacher') {
        // Redirect to student dashboard
        navigate('/student-dashboard');
      } else if (role === 'receptionist') {
        // Redirect to receptionist dashboard
        navigate('/receptionist-dashboard');
      } else {
        // Invalid user role
        setError('Invalid user role.');
      }
    } catch (err) {
      // Handle login failure
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
