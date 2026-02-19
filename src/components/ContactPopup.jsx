import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, MapPin, Mail, Phone, Send } from 'lucide-react';
import Button from './ui/Button';

const ContactPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="mb-2 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap"
                        >
                            Contact Us
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Action Button */}
                <motion.button
                    onClick={toggleOpen}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.2 }}
                    animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            "0px 0px 0px rgba(37, 99, 235, 0)",
                            "0px 0px 20px rgba(37, 99, 235, 0.5)",
                            "0px 0px 0px rgba(37, 99, 235, 0)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                    }}
                >
                    <MessageCircle size={28} />
                </motion.button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleOpen}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={toggleOpen}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100 z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8">
                                <h2 className="text-2xl font-heading font-bold text-blue-900 mb-6 text-center">
                                    Get in Touch
                                </h2>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                                        <MapPin className="text-blue-600 mb-2" size={20} />
                                        <p className="text-xs text-blue-900 font-medium">123 Skill Street, Tech Park</p>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                                        <Mail className="text-blue-600 mb-2" size={20} />
                                        <p className="text-xs text-blue-900 font-medium">admissions@arambha.com</p>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                                        <Phone className="text-blue-600 mb-2" size={20} />
                                        <p className="text-xs text-blue-900 font-medium">+91 98765 43210</p>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-blue-900 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-blue-900 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-blue-900 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="w-full justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
                                    >
                                        Send Message <Send size={18} />
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactPopup;