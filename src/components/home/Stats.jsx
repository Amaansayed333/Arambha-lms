import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: "Offline Students", value: "30,000+", suffix: "" },
    { label: "Benefits", value: "50+", suffix: "" },
    { label: "Hiring Partners", value: "100+", suffix: "" },
    { label: "Satisfaction", value: "4.9", suffix: "/5" },
];

const Stats = () => {
    return (
        <section className="py-10 bg-blue-100/80 backdrop-blur-sm text-blue-900 -mt-16 relative z-20 mx-4 lg:mx-20 rounded-2xl shadow-lg border-2 border-blue-950 top-[40px]">


    <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-300">
            {stats.map((stat, index) => (
                <div key={index} className="px-2">
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}

        whileHover={{
            y: -8,
            scale: 1.05
        }}

        className="
            py-4
            rounded-xl
            transition-all
            duration-300
            hover:bg-white/60
            hover:shadow-[0_10px_25px_rgba(30,58,138,0.25)]
        "
    >
        <h3 className="text-3xl lg:text-4xl font-bold font-heading text-blue-900 mb-1">
            {stat.value}
            <span className="text-lg">{stat.suffix}</span>
        </h3>

        <p className="text-sm font-medium text-blue-800 uppercase tracking-wider">
            {stat.label}
        </p>
    </motion.div>
</div>

            ))}
        </div>
    </div>
</section>

    );
};

export default Stats;
