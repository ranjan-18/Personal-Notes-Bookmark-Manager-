import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login, register } from '../services/authService'; // Assuming you have both
import { toast } from 'react-toastify';


const App = () => {
  const [state, setState] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        const data = await login({ email, password });
        loginUser(data);
        toast.success("Logged in successfully!");
        navigate("/notes");
      } else {
        const data = await register({ name, email, password });
        loginUser(data);
        toast.success("Registered successfully!");
        navigate("/notes");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || `${state === "login" ? "Login" : "Register"} failed`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white mt-12"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
      </p>

      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          required
        />
      </div>

      {state === "register" ? (
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">
            Login here
          </span>
        </p>
      ) : (
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">
            Sign up here
          </span>
        </p>
      )}

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default App;
