import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful!');
      setFormData({
        email: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 fixed right-0 left-0">
     
      <div className="w-11/12 md:w-10/12 lg:w-8/12 flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">

        
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/70 to-purple-800/60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
            <p className="max-w-md text-gray-200">
              Log in to continue your journey and explore new opportunities.
            </p>
          </div>
        </div>

   
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <div className="bg-white rounded-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please log in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autocomplete="current-password"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

             
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-all duration-200"
              >
                Login
              </button>

             
              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
