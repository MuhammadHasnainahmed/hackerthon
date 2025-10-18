import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navitage = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
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

    if (!formData.firstName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
        },
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Registration successful! Please check your email for verification."
      );
      setFormData({
        firstName: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navitage("/login");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 fixed right-0 left-0">
      {/* Main Container */}
      <div className="w-11/12 md:w-10/12 lg:w-8/12 flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side Image Section */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/70 to-purple-800/60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-4xl font-bold mb-2">Welcome to Our Platform</h2>
            <p className="max-w-md text-gray-200">
              Join us today and start exploring amazing opportunities.
            </p>
          </div>
        </div>

        {/* Right Side Signup Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
          <div className="bg-white rounded-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Sign up and get started right away
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password" 
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-all duration-200"
              >
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
