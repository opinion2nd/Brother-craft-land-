import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, User as UserIcon, Menu, X, LogOut, Shield } from "lucide-react";

export const Navbar = () => {
  const { currentUser, isAdmin, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0f0a1c]/80 backdrop-blur-md border-b border-neon-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink glow-text">
              Brother Craft Land
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-neon-pink glow-text"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-neon-pink transition flex items-center gap-2">
                  <UserIcon size={18} /> Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-300 hover:text-red-500 transition flex items-center gap-2">
                    <Shield size={18} /> Admin
                  </Link>
                )}
                <button onClick={signOut} className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 rounded-full font-bold bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition glow-border"
              >
                Login
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0f0a1c] border-b border-neon-purple/20 pb-4">
          <div className="px-2 pt-2 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-neon-purple/20"
              >
                {link.name}
              </Link>
            ))}
            {currentUser ? (
               <>
                 <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300">Dashboard</Link>
                 {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-red-400">Admin Panel</Link>}
                 <button onClick={() => { signOut(); setIsOpen(false); }} className="block px-3 py-2 text-base font-medium text-gray-400">Sign Out</button>
               </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-neon-pink">Login / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
