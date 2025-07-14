import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      loginUser(data);
      navigate('/notes'); // ✅ Redirect on success
    } catch (err) {
      alert('Login failed');
    }
  };

  // return form ...
};
export default Login;