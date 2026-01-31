import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white p-2 rounded-lg">
                                <img src={logo} alt="Arambha Skill Solutions" className="h-16 w-auto object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-heading font-bold text-white leading-tight">
                                    Arambha
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                                    Skill Solutions
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            Empowering the next generation with industry-aligned skills and career-ready programs. Your journey to success begins here.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Programs */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">Programs</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/programs" className="hover:text-white transition-colors">Foundation 60</Link></li>
                            <li><Link to="/programs" className="hover:text-white transition-colors">Full Stack Development</Link></li>
                            <li><Link to="/programs" className="hover:text-white transition-colors">Data Science & AI</Link></li>
                            <li><Link to="/programs" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                            <li><Link to="/programs" className="hover:text-white transition-colors">Banking & Finance</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
                            <li><Link to="/verify" className="hover:text-white transition-colors">Verify Certificate</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                                <span>123 Skill Street, Tech Park, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-secondary shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-secondary shrink-0" />
                                <span>admissions@arambha.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Arambha Skill Solutions. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
