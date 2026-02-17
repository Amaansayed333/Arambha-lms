import React, { useState } from 'react';
import ProgramCard from '../components/programs/ProgramCard';
import { programs, categories } from '../utils/programsData';
import { motion, AnimatePresence } from 'framer-motion';

const Programs = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPrograms = activeCategory === "All"
        ? programs
        : programs.filter(p => p.category === activeCategory);

    return (
        <div
            className="min-h-screen pt-20 pb-20 bg-fixed bg-center bg-cover relative"
            style={{ backgroundImage: "url('/discuss_room1.jpeg')" }}
        >
            {/* Dark Overlay for better readability */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="bg-primary/50 py-12 mb-12 backdrop-blur-sm">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                            Our Programs
                        </h1>
                        <p className="text-gray-200 max-w-2xl mx-auto">
                            Explore our industry-aligned courses designed to launch your career.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeCategory === cat
                                        ? 'bg-primary text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {filteredPrograms.map((program) => (
                                <motion.div
                                    layout
                                    key={program.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProgramCard program={program} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPrograms.length === 0 && (
                        <div className="text-center py-20 text-gray-200">
                            No programs found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Programs;
