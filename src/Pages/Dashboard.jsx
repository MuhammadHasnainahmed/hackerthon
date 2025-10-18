import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home, User, Settings, LogOut, Menu, X } from "lucide-react";
import { supabase } from "../../supabase";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function getuser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getuser();
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      navigate("/");
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <div>
          <h1 className="text-2xl font-bold text-center py-4 border-b border-blue-500">
            Dashboard
          </h1>

          <nav className="mt-4 space-y-2 px-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Home size={20} /> Home
            </Link>

            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <User size={20} /> Profile
            </Link>

            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Settings size={20} /> Settings
            </Link>
          </nav>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Hamburger Menu Button (mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-700 text-white p-2 rounded-md shadow"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay (when sidebar open on mobile) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 mt-11 md:mt-0 md:ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
