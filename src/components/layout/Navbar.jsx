import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },

  ];

  return (
    <nav
      className="fixed w-full z-50 glass transition-all duration-300
                 border-b-4 relative bg-white"
      style={{ borderBottomColor: '#D4AF37' }}
    >
      {/* ✨ GOLD + INDIGO MOVING GLOW */}
      <motion.div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          bottom: '-24px',
          height: '24px',
          background: `
            linear-gradient(
              90deg,
              transparent,
              rgba(212,175,55,0.55),
              rgba(32, 36, 122, 0.65),
              rgba(212,175,55,0.35),
              transparent
            )
          `,
          backgroundSize: '220% 100%',
        }}
        animate={{ backgroundPositionX: ['0%', '220%'] }}
        transition={{
          duration: 4,
          ease: 'linear',
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Arambha Skill Solutions"
              className="h-16 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold text-primary leading-tight">
                Arambha
              </span>
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                Skill Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-gray-700 font-medium transition-colors hover:text-primary group"
              >
                {link.name}

                {/* Animated Underline */}
                <span
                  className="
        absolute
        left-0
        -bottom-1
        w-0
        h-[2px]
        bg-blue-800
        transition-all
        duration-300
        group-hover:w-full
      "
                ></span>
              </Link>
            ))}

            {/* <Link to="/admin">
              <button className="text-gray-700 hover:text-primary font-medium transition-colors mr-4">
                Admin
              </button>
            </Link> */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((s) => !s)}
                  className="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center font-semibold"
                  title={user.email}
                >
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <button
                      onClick={async () => {
                        try {
                          await signOut();
                          navigate('/login');
                        } catch (err) {
                          console.error('Logout failed', err);
                        }
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-light shadow-md">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={async () => { setIsOpen(false); try { await signOut(); navigate('/login'); } catch (err) { console.error(err); } }}
                  className="w-full mt-4 bg-red-500 text-white px-5 py-3 rounded-md font-medium shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full mt-4 bg-primary text-white px-5 py-3 rounded-md font-medium shadow-sm">
                    Login / Signup
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;