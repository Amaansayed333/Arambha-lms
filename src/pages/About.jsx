import React from 'react';
import { CheckCircle, Flag, Target } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary py-16 text-white mb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About Arambha</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">Embracing the Beginning of Your Professional Journey.</p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-6">
                            <Target size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To bridge the gap between academic education and industry requirements by providing top-tier, outcome-based skill development programs that empower students to build successful careers.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-secondary mb-6">
                            <Flag size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To be India's most trusted skill development partner, known for creating a workforce that is not just knowledgeable, but job-ready and future-proof.
                        </p>
                    </div>
                </div>

                {/* Story / Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Our Journey</h2>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                        {/* Item 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Inception</div>
                                    <time className="font-caveat font-medium text-secondary-dark">2020</time>
                                </div>
                                <div className="text-slate-500">Founded with a vision to transform skill education in tier-2 cities.</div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Expansion</div>
                                    <time className="font-caveat font-medium text-secondary-dark">2022</time>
                                </div>
                                <div className="text-slate-500">Partnered with 20+ colleges and launched our flagship "Foundation 60" program.</div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-secondary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Going Digital</div>
                                    <time className="font-caveat font-medium text-secondary-dark">2024</time>
                                </div>
                                <div className="text-slate-500">Launched our online LMS platform to reach students across the nation.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
