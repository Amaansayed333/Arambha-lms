import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flag, CheckCircle, Shield, Cloud, Server, Users, ArrowRight, User, Mic, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const About = () => {
    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 py-24">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

                {/* Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] opacity-50 animate-pulse"></div>

                    {/* Logo Image */}
                    <img src={logo} alt="" className="w-[800px] h-auto object-contain opacity-35 relative z-10" />
                </div>

                <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-200">
                            About Arambha LMS
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
                            12 Years of Building Confidence. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Now Empowering Learners Online.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                            Trusted offline training institute since 2012, now delivering structured live learning experiences through Arambha LMS.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            {["Established 2012", "12+ Years Experience", "Karnataka Trusted Institute"].map((badge, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100 text-blue-600 font-semibold text-sm">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 1.5 Our Journey & Foundation */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                        {/* Left: Text Content */}
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                                Since 2012
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                                Our Journey & Foundation
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                Established in 2012, Arambha Skill Solutions has been a trusted offline training institute for over 12 years.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                For more than a decade, we have trained students, job seekers, and working professionals in communication skills and career development.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Practical training",
                                    "Personalized attention",
                                    "Confidence building",
                                    "Real-world application"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                        <CheckCircle className="text-blue-600 shrink-0" size={18} />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Decorative Card */}
                        <motion.div
                            className="md:w-1/2 w-full"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative">
                                {/* Abstract Background shapes */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -z-10" />

                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Shield size={120} />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                                        <div>
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                                <Target className="text-white" size={32} />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">Built on Trust</h3>
                                            <p className="text-blue-100 leading-relaxed">
                                                A legacy built on student success and consistent quality delivery.
                                            </p>
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-white/20">
                                            <p className="text-4xl font-bold mb-1">12+</p>
                                            <p className="text-blue-200 text-sm uppercase tracking-wider">Years of Trust</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-blue-50 flex items-center gap-3 animate-bounce shadow-blue-900/5 hidden md:flex">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <CheckCircle className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Status</p>
                                        <p className="text-slate-900 font-bold">Karnataka Trusted</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Why We Started Online */}
            <section className="relative py-24 overflow-hidden bg-slate-50">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -top-20 -left-20"></div>
                    <div className="absolute w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl bottom-0 right-0"></div>
                </div>

                <div className="container mx-auto max-w-6xl px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">

                        {/* Left: Text Content */}
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                                Why We Started Online
                            </h2>

                            <div className="space-y-4 text-slate-600 text-lg leading-relaxed mb-8">
                                <p>Not every student can attend offline classes.</p>
                                <ul className="space-y-3 mt-4">
                                    {[
                                        "Some are working professionals.",
                                        "Some live far from training centers.",
                                        "Some require flexible schedules."
                                    ].map((reason, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <span>{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-semibold text-slate-800 pt-4 text-xl border-l-4 border-blue-500 pl-4">
                                    To address this need, we expanded to structured live online sessions.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Modern Card */}
                        <motion.div
                            className="md:w-1/2 w-full"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-blue-100 group transition-all duration-300"
                            >
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-50 rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                                        Same Trusted Training <br />
                                        <span className="text-blue-600">– Now Online</span>
                                    </h3>
                                </div>

                                <ul className="space-y-4">
                                    {[
                                        "Same experienced trainers",
                                        "Same practical hands-on approach",
                                        "Same confidence-building system",
                                        "Same skill-based methodology",
                                        "Accessible from anywhere"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                                            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* 2.5 The Problem We Solve */}
            <section className="py-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">
                            The Problem We Solve
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
                            {[
                                "Many understand English but hesitate to speak confidently.",
                                "They struggle during interviews.",
                                "They avoid participating in meetings.",
                                "They miss valuable growth opportunities."
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 text-red-300 font-bold">
                                        !
                                    </div>
                                    <p className="text-blue-50 font-medium text-lg">{item}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-md">
                            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 mb-6">
                                "The challenge is not knowledge. It is confidence."
                            </h3>

                            <p className="text-blue-100 text-lg md:text-xl leading-relaxed">
                                At Arambha, we bridge this gap through structured practice, real-time communication training, and industry-relevant skill development — transforming hesitation into confidence.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Mission & Vision */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
                        >

                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
                                <Target size={28} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To empower learners with confident English communication through structured practical training and consistent speaking practice, alongside comprehensive IT and non-IT skill development programs.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
                        >

                            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                                <Flag size={28} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To be recognized as one of the most trusted skill training institutes in Karnataka — delivering excellence in both offline and online learning.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Our Core Values (Horizontal Scroll) */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">What Drives Us</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                                Our Core Values
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 gap-6 md:gap-8 px-4 md:px-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Spacer for left padding alignment */}
                        <div className="shrink-0 w-4 md:w-1/12 snap-center"></div>

                        {[
                            { icon: <User size={48} />, title: "Student-First Approach", desc: "Every learner’s progress matters.", color: "blue" },
                            { icon: <Mic size={48} />, title: "Practical Training", desc: "Speaking > Memorizing.", color: "indigo" },
                            { icon: <ShieldCheck size={48} />, title: "Integrity", desc: "We deliver what we promise.", color: "cyan" },
                            { icon: <Target size={48} />, title: "Outcome-Focused", desc: "Confidence and clarity are our goals.", color: "purple" },
                            { icon: <Globe size={48} />, title: "Accessibility", desc: "Quality training, now available online for all.", color: "teal" }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, threshold: 0.5 }}
                                transition={{ duration: 0.5 }}
                                className="shrink-0 w-[85vw] md:w-[600px] snap-center cursor-grab active:cursor-grabbing"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className={`
                                        relative 
                                        h-full 
                                        p-8 md:p-12 
                                        rounded-[2.5rem] 
                                        bg-gradient-to-br from-${value.color}-50 to-white 
                                        border border-${value.color}-100 
                                        shadow-lg 
                                        hover:shadow-2xl 
                                        transition-all 
                                        duration-300
                                        overflow-hidden
                                    `}
                                >
                                    {/* Decorative Glow */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 bg-${value.color}-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>

                                    <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                                        <div className={`
                                            w-24 h-24 
                                            bg-white 
                                            rounded-full 
                                            flex items-center justify-center 
                                            text-${value.color}-600 
                                            mb-6 
                                            shadow-md
                                        `}>
                                            {value.icon}
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                                            {value.title}
                                        </h3>

                                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-md">
                                            {value.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Spacer for right padding alignment */}
                        <div className="shrink-0 w-4 md:w-1/12 snap-center"></div>
                    </div>
                </div>
            </section>

            {/* 5. Call to Action */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                        Start Your Confidence Journey Today
                    </h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Join structured live training sessions from anywhere in Karnataka.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/programs"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                        >
                            View Programs <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all transform hover:-translate-y-1"
                        >
                            Book Free Demo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;