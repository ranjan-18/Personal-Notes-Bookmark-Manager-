import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // ✅ State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }); // calls backend API
      loginUser(data); // save user in context + localStorage
      toast.success('Logged in successfully!');
      navigate('/notes'); // redirect to dashboard
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
