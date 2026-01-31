import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, BookOpen, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-slate-50">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-semibold mb-6">
                                🚀 Future-Ready Learning
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                                Launch Your Career with <br />
                                <span className="text-gradient">Industry-Aligned</span> Skills
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Arambha Skill Solutions bridges the gap between education and employment.
                                Master in-demand skills, earn recognized certifications, and get job-ready with our expert-led programs.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/programs">
                                    <Button size="lg" className="w-full sm:w-auto gap-2">
                                        Explore Programs <ArrowRight size={20} />
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap justify-center lg:justify-start gap-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Placeholders for Trust Badges/Logos - using text for now or simple icons */}
                                <div className="flex items-center gap-2">
                                    <Award className="text-secondary" /> <span className="font-semibold text-sm">ISO Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="text-secondary" /> <span className="font-semibold text-sm">MSME Registered</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image/Visual Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Abstract Shapes & Image Placeholder */}
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Students learning"
                                    className="w-full h-auto object-cover"
                                />
                                {/* Floating Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.6 }}
                                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 max-w-xs"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Job Ready</p>
                                            <p className="text-xs text-gray-500">100% Placement Assistance</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-dots-pattern opacity-50 space-x-2 space-y-2 grid grid-cols-5 gap-1">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 bg-primary rounded-full"></div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
