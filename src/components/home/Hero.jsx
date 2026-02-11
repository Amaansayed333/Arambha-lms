import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, BookOpen, Award, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const topFeatures = [
    {
        title: 'Learn with Real Projects',
        desc: 'Hands-on learning with industry-style projects, real-world use cases, and guided assignments that build strong fundamentals and confidence.',
        icon: <BookOpen size={24} />,
        image: '/src/assets/project.png'
    },
    {
        title: 'Get Career-Ready',
        desc: 'Earn verified certifications, work on resume-ready projects, and receive placement-focused training designed for real hiring needs.',
        icon: <Award size={24} />,
        image: '/src/assets/improvement.png'
    }
];

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 pt-24 pb-28">

            {/* Background accents */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">

                {/* ===== HEADER ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-slate-900">
                        Tired of Just Learning? <br />
                        <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 bg-clip-text text-transparent">
                            Build & Get Career-Ready
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                        Learn technical skills, real-world applications, and spoken English —
                        everything you need to succeed in interviews and at work.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/programs">
                            <Button size="lg" className="gap-2">
                                Join Now <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <Link to="/demo">
                            <Button size="lg" variant="outline" className="gap-2">
                                <Play size={18} /> Watch Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* ===== TOP 2 FEATURE CARDS ===== */}
                {/* ===== TOP 2 FEATURE BLOCKS (POSITIONED LEFT & RIGHT) ===== */}
<div className="relative mt-20">

    {/* LEFT FEATURE */}
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="
        absolute 
        left-[-30px] 
        top-[-350px] 
        max-w-[210px]
        bg-blue-950
        rounded-xl
        px-4 py-7
        shadow-lg
    "
>
    <div className="flex flex-col items-start gap-4">
        <img
            src={topFeatures[0].image}
            alt={topFeatures[0].title}
            className="
                w-12 h-12 object-contain
                filter brightness-0 invert
            "
        />

        <h3 className="text-sm font-bold text-white">
            {topFeatures[0].title}
        </h3>

        <p className="text-xs font-medium text-white/90 leading-relaxed">
            {topFeatures[0].desc}
        </p>
    </div>
</motion.div>





    {/* RIGHT FEATURE */}
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="
        absolute 
        right-[-60px] 
        top-[-350px]
        max-w-[210px]
        bg-blue-950
        rounded-xl
        px-4 py-7
        shadow-lg
        text-left
    "
>
    <div className="flex flex-col items-start gap-4">
        <img
            src={topFeatures[1].image}
            alt={topFeatures[1].title}
            className="
                w-12 h-12 object-contain
                filter brightness-0 invert
            "
        />

        <h3 className="text-sm font-bold text-white">
            {topFeatures[1].title}
        </h3>

        <p className="text-xs font-medium text-white/90 leading-relaxed">
            {topFeatures[1].desc}
        </p>
    </div>
</motion.div>





</div>


                {/* ===== SPOKEN ENGLISH SECTION ===== */}
                {/* ===== SPOKEN ENGLISH SECTION (CARD STYLE) ===== */}
{/* ===== SPOKEN ENGLISH SECTION (40–60 CARD STYLE) ===== */}
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="
        mt-28 
        max-w-5xl 
        mx-auto 
        bg-white
        border-2 border-blue-950
        rounded-2xl
        shadow-sm
        relative
        top-[-80px]
        overflow-hidden
    "
>
    <div className="flex flex-col md:flex-row">

        {/* ===== LEFT 40% : IMAGE ===== */}
        <div
    className="
        md:w-[40%]
        h-64 md:h-auto
        bg-no-repeat
        bg-center
    "
    style={{
        backgroundImage: "url('/src/assets/spoken-english-bg.png')",
        backgroundSize: "125%",   // 👈 zooms image slightly
        backgroundPosition: "center"
    }}
/>


        {/* ===== RIGHT 60% : CONTENT ===== */}
        <div className="md:w-[60%] px-8 py-12 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4 text-blue-700">
                <Mic size={36} />
            </div>

            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
                Spoken English for Real-World Confidence
            </h2>

            <p className="text-slate-600 leading-relaxed mb-8">
                Improve fluency, pronunciation, vocabulary, and workplace communication.
                Our spoken English program focuses on real conversations, interviews,
                presentations, and professional confidence — not textbook grammar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/spoken-english">
                    <Button size="lg" className="gap-2">
                        Explore Spoken English <ArrowRight size={18} />
                    </Button>
                </Link>
            </div>
        </div>

    </div>
</motion.div>



            </div>
        </section>
    );
};

export default Hero;
