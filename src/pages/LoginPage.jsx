import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:5000/login', {
    //             username,
    //             password,
    //         });

    //         const { token, role } = response.data;

    //         // Store the token and role in localStorage
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('role', role);

    //         // Redirect to the Home Page
    //         navigate('/home');
    //     } catch (err) {
    //         setError('Invalid username or password');
    //     }
    // };

    const handleLogin = (e) => {
        e.preventDefault();
    
        // Hardcoded credentials for testing
        const hardcodedCredentials = [
            { username: "student", password: "1234", role: "student" },
            { username: "receptionist", password: "5678", role: "receptionist" },
        ];
    
        const user = hardcodedCredentials.find(
            (cred) => cred.username === username && cred.password === password
        );
    
        if (user) {
            // Mock token and role
            localStorage.setItem("token", "mockToken123");
            localStorage.setItem("role", user.role);
    
            navigate("/home");
        } else {
            setError("Invalid username or password");
        }
    };
    

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
