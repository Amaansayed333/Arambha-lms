import React from 'react';
import { CheckCircle, Flag, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section with Animation */}
            <div className="relative bg-primary overflow-hidden pt-32 pb-24 text-white">
                {/* Animated Background Elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
                />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-sm font-semibold mb-6 uppercase tracking-wider">
                            Who We Are
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
                            About <span className="text-gradient-gold">Arambha</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                            Embracing the <span className="text-white font-medium">Beginning</span> of Your Professional Journey.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Vision & Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-300">
                            <Target size={40} />
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            To bridge the gap between academic education and industry requirements by providing top-tier, outcome-based skill development programs that empower students to build successful careers.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform duration-300">
                            <Flag size={40} />
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            To be India's most trusted skill development partner, known for creating a workforce that is not just knowledgeable, but job-ready and future-proof.
                        </p>
                    </motion.div>
                </div>

                {/* Story / Timeline */}
                <div className="max-w-5xl mx-auto pb-24">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-wider uppercase mb-2 block">Our History</span>
                        <h2 className="text-4xl font-heading font-bold text-primary">The Arambha Journey</h2>
                    </div>

                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/5 before:via-primary/20 before:to-primary/5">
                        {/* Item 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-primary text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <span className="font-bold text-xs">2020</span>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)] bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                                <div className="font-heading font-bold text-xl text-primary mb-2">Inception</div>
                                <div className="text-gray-600 leading-relaxed">Founded with a vision to transform skill education in tier-2 cities, starting with a small batch of passionate learners.</div>
                            </div>
                        </motion.div>

                        {/* Item 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-secondary text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <span className="font-bold text-xs">2022</span>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)] bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                                <div className="font-heading font-bold text-xl text-primary mb-2">Expansion</div>
                                <div className="text-gray-600 leading-relaxed">Partnered with 20+ colleges and launched our flagship "Foundation 60" program, reaching over 5,000 students.</div>
                            </div>
                        </motion.div>

                        {/* Item 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-primary text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <span className="font-bold text-xs">2024</span>
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)] bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                                <div className="font-heading font-bold text-xl text-primary mb-2">Going Digital</div>
                                <div className="text-gray-600 leading-relaxed">Launched our online LMS platform to reach students across the nation, offering hybrid learning models.</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
