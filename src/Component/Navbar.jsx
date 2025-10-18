import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";
function Navbar() {

  const navigate = useNavigate();


  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);  

  useEffect(() => {
    
  
    
      
     async function getuser() {
    
      const { data: { user } } = await supabase.auth.getUser()
     
      setUser(user)

      
  }

  
  
  getuser()
}, [])
console.log(user);


  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">PitchCraft</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
        
          
      
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-1 border border-white rounded-md hover:bg-white hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
              >
                Signup
              </Link>
            </div>
        
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        
        <div className="md:hidden bg-blue-500 px-6 pb-4 space-y-2">
          <Link to="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="block hover:text-gray-200">
            About
          </Link>
          <Link
            to="/login"
            className="block px-3 py-1 border border-white rounded-md hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-3 py-1 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
