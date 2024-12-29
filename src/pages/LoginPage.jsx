import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/style/LoginPage.css'

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
  
      // Destructure role from the response data
      const { role } = response.data;
  
      switch (role) {
        case 'student':
        case 'teacher':
          // Redirect to student dashboard
          navigate('/student-dashboard');
          break;
        case 'receptionist':
          // Redirect to receptionist dashboard
          navigate('/receptionist-dashboard');
          break;
        case 'admin':
          // Redirect to admin dashboard
          navigate('/admin-dashboard');
          break;
        default:
          // Handle unexpected roles
          setError('Invalid user role.');
          break;
      }
    } catch (err) {
      // Handle login failure
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };
  

  return (
    <>
    
    <div className='login-container'  >
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div  >
          <label  >Username</label>
          <input
            type="text"
             
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            />
        </div>
        <div  >
          <label >Password</label>
          <input
            type="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        {error && <p >{error}</p>}
        <button type="submit"  >Login</button>
      </form>
    </div>
            </>
  );
}

export default LoginPage;
