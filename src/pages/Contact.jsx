import React from 'react';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-20 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 min-h-screen">

            <div className="container mx-auto px-4">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-blue-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-blue-800 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Reach out to our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* CONTACT INFO */}
                    <div className="space-y-8">

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-950">
                            <h3 className="text-xl font-bold text-blue-900 mb-6">
                                Get in Touch
                            </h3>

                            <div className="space-y-6">

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-blue-900">
                                            Visit Us
                                        </p>
                                        <p className="text-blue-800">
                                            123 Skill Street, Tech Park, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-blue-900">
                                            Email Us
                                        </p>
                                        <p className="text-blue-800">
                                            arambhaskilldesignsolutions@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-blue-900">
                                            Call Us
                                        </p>
                                        <p className="text-blue-800">
                                            +91 9108032103
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* COMMUNITY CARD */}
                        <div className="bg-blue-950 p-8 rounded-2xl text-white relative overflow-hidden shadow-lg">

                            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />

                            <h3 className="text-xl font-bold mb-4 text-amber-400 relative z-10">
                                Join Our Community
                            </h3>

                            <p className="text-blue-100 mb-6 relative z-10">
                                Follow us for updates, speaking tips & career guidance.
                            </p>

                            <div className="flex gap-4 relative z-10">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition cursor-pointer">
                                    FB
                                </div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition cursor-pointer">
                                    IN
                                </div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition cursor-pointer">
                                    LI
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* CONTACT FORM */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-950">

                        <form className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm font-medium text-blue-900 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-900 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-900 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-900 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-900 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <Button
                                size="lg"
                                className="w-full gap-2 bg-green-400 hover:bg-green-500 text-black font-semibold"
                            >
                                Send Message <Send size={18} />
                            </Button>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
