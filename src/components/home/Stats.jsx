import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: "Learners", value: "30,000+", suffix: "" },
    { label: "Programs", value: "50+", suffix: "" },
    { label: "Hiring Partners", value: "100+", suffix: "" },
    { label: "Satisfaction", value: "4.9", suffix: "/5" },
];

const Stats = () => {
    return (
        <section className="py-10 bg-primary text-white -mt-10 relative z-20 mx-4 lg:mx-20 rounded-2xl shadow-xl">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div key={index} className="px-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-3xl lg:text-4xl font-bold font-heading text-secondary mb-1">
                                    {stat.value}<span className="text-lg">{stat.suffix}</span>
                                </h3>
                                <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
