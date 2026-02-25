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
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mb-3 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg"
                        >
                            Contact Us
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleOpen}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                >
                    <MessageCircle size={28} />
                </motion.button>
            </div>

            {/* Modal */}
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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={toggleOpen}
                                className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-10">
                                <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
                                    Get in Touch
                                </h2>

                                {/* Contact Info Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    
    {/* Address Card */}
    <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border-2 border-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <MapPin className="text-blue-700 mb-3" size={24} />
        <p className="text-sm font-semibold text-blue-900">
            123 Skill Street
        </p>
        <p className="text-sm text-blue-800">
            Tech Park
        </p>
    </div>

    {/* Email Card */}
    <div className="flex flex-col items-center text-[12px] text-center p-5 bg-blue-50 rounded-xl border-2 border-blue-800 min-w-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <Mail className="text-blue-700 mb-3" size={24} />
        <p className="text-[13px] font-semibold text-blue-900 break-all leading-relaxed">
            arambhaskilldesignsolutions@gmail.com
        </p>
    </div>

    {/* Phone Card */}
    <div className="flex flex-col items-center text-center p-5 bg-blue-50 rounded-xl border-2 border-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <Phone className="text-blue-700 mb-3" size={24} />
        <p className="text-sm font-semibold text-blue-900">
            +91 9108032103
        </p>
    </div>

</div>

                                {/* Form */}
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-semibold text-blue-900 mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-base"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-base font-semibold text-blue-900 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-base"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-base font-semibold text-blue-900 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-base resize-none"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="w-full justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg"
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
