import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // optional for alerts

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(form); // POST to /api/auth/register
      loginUser(data); // Save to context/localStorage
      toast.success('Registration successful!');
      navigate('/notes');
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          autoComplete="name"
          className="w-full border px-4 py-2 rounded outline-none focus:ring focus:border-blue-300"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full border px-4 py-2 rounded outline-none focus:ring focus:border-blue-300"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          className="w-full border px-4 py-2 rounded outline-none focus:ring focus:border-blue-300"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
