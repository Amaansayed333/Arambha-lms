import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Programs', path: '/programs' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 glass transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                        <img src={logo} alt="Arambha Skill Solutions" className="h-16 w-auto object-contain" />
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
                                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/login">
                            <button className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-light transition-colors shadow-md">
                                Login
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary focus:outline-none"
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
                        className="md:hidden bg-white border-t border-gray-100/50 glass"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full mt-4">
                                <button className="w-full bg-primary text-white px-5 py-3 rounded-md font-medium hover:bg-primary-light transition-colors shadow-sm">
                                    Login / Signup
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
