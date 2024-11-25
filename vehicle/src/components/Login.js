import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ setIsAuthenticated, setShowHamburgerMenu }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/ht/login', formData);
            const { userRole, token } = response.data;
            
            localStorage.setItem('token', token);  // Save token in localStorage
            localStorage.setItem('userRole', userRole);  // Save userRole in localStorage
            
            setIsAuthenticated(true);  // Update the auth status
            toast.success("Login successful!");
            
            if (userRole === 'Admin') {
                navigate('/admin-dashboard');
                setShowHamburgerMenu(true);  // Show hamburger for Admin
            } else {
                navigate('/user-dashboard');
                setShowHamburgerMenu(false);  // Hide hamburger for User
            }
        } catch (error) {
            toast.error("Invalid email or password");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
