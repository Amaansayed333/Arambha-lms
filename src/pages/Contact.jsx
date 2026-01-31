import React from 'react';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-primary mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Reach out to our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-primary mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Visit Us</p>
                                        <p className="text-gray-600">123 Skill Street, Tech Park, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Email Us</p>
                                        <p className="text-gray-600">admissions@arambha.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Call Us</p>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary p-8 rounded-2xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                            <h3 className="text-xl font-bold mb-4 relative z-10">Join Our Community</h3>
                            <p className="text-gray-300 mb-6 relative z-10">Follow us on social media for updates and career tips.</p>
                            <div className="flex gap-4 relative z-10">
                                {/* Social Icons would go here */}
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">FB</div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">IN</div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">LI</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <Button className="w-full gap-2" size="lg">
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
