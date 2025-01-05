import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/style/LoginPage.css'
import  package_img from './components/undraw_deliveries_2m9t.svg'
import package_img2 from './components/undraw_on-the-way_ahi2.svg'
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
      sessionStorage.setItem('studentName', name);
  
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
    <h1 className='packageLoingHeader'>Package Management  System </h1>
    <img  id='image1' className='package-img' src={package_img} alt="Description of image" />
    <img  id='image2' className='package-img' src={package_img2} alt="Description of image" />
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
