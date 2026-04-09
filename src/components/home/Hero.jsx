import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, BookOpen, Award, Mic, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-24 pb-14">

            {/* ===== TOP HALF BACKGROUND IMAGE ===== */}
            <div
                className="absolute top-0 left-0 w-full h-[55%] bg-cover bg-center opacity-90"
                style={{
                    backgroundImage: "url('/discuss_room1.jpeg')"
                }}
            />

            <div className="absolute top-0 left-0 w-full h-[55%] bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100 to-blue-200" />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="
                    absolute 
                    bottom-[-80px] 
                    right-[-10%] 
                    w-[140%] 
                    h-[200px]
                    bg-blue-300
                    rotate-[6deg]
                    blur-xl
                "></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* ===== HEADER ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h1 className="text-xl md:text-5xl lg:text-7xl font-crimson font-semibold leading-tight text-sky-300 drop-shadow-lg tracking-wide">
                        Tired of Just Learning? <br />
                        <span className="bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 bg-clip-text text-transparent drop-shadow-md">
                            Start Speaking English Confidently
                        </span>
                    </h1>

                    <p className="mt-6 text-lg lg:text-2xl text-white max-w-2xl mx-auto font-crimson font-semibold tracking-wide bg-gray-200/20 backdrop-blur-sm px-6 py-4 rounded-xl">
    Enhance your English communication skills for work, interviews, and everyday interactions through structured daily speaking practice in a mother tongue-friendly environment—designed to build your confidence progressively and help you achieve fluency with ease.
</p>



                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://wa.me/9108032103"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="lg"
                                className="gap-2 bg-green-400 hover:bg-green-500 text-black font-semibold"
                            >
                                WhatsApp Now <ArrowRight size={18} />
                            </Button>
                        </a>

                        <Link to="/assessment">
                            <Button
                                size="lg"
                                className="gap-2 bg-white hover:bg-gray-100 text-black border border-black/20 font-semibold"
                            >
                                Book Speaking Assessment
                            </Button>
                        </Link>
                    </div>
                </motion.div>

            {/* ===== FLOATING MIC FEATURE (LEFT SIDE) ===== */}
<div className="absolute top-[220px] left-[60px] z-20 hidden lg:block">

    <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
    >

        {/* Glow */}
        <div className="absolute inset-0 bg-blue-900/40 rounded-full blur-3xl scale-125 -z-10"></div>

        {/* MIC IMAGE */}
        <img
            src="/mic_speak.png"
            alt="Speak English"
            className="w-44 object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* DIALOGUE BOX (Appears to RIGHT of mic) */}
        <div
            className="
                absolute
                left-full
                ml-6
                top-1/2
                -translate-y-1/2
                bg-white
                text-blue-900
                px-6
                py-4
                rounded-2xl
                shadow-2xl
                w-72
                opacity-0
                group-hover:opacity-100
                translate-x-[-10px]
                group-hover:translate-x-0
                transition-all
                duration-300
            "
        >
            <p className="text-sm font-semibold">
                🎤 Practice speaking daily and build real confidence through live interactive sessions.
            </p>

            {/* Speech Arrow */}
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45"></div>
        </div>

    </motion.div>
</div>



                {/* ===== NEW CARD SECTION ADDED HERE ===== */}
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
>

    {/* Card 1 */}
    <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
        <BookOpen className="mx-auto text-blue-700 mb-4" size={30} />
        <h3 className="font-crimson font-semibold text-lg mb-2 text-blue-900">
            Real-World Skill Training
        </h3>
        <p className="text-sm text-blue-800">
            Practical English for interviews & workplace.
        </p>
    </div>

    {/* Card 2 */}
    <div className="bg-blue-400 border border-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 text-white">
        <Users className="mx-auto mb-4" size={30} />
        <h3 className="font-crimson font-semibold text-lg mb-2">
            5000+ Students
        </h3>
        <p className="text-sm text-blue-100">
            Students already improving fluency.
        </p>
    </div>

    {/* Card 3 */}
    <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
        <Award className="mx-auto text-blue-700 mb-4" size={30} />
        <h3 className="font-crimson font-semibold text-lg mb-2 text-blue-900">
            Certification
        </h3>
        <p className="text-sm text-blue-800">
            Verified completion certificates.
        </p>
    </div>

    {/* Card 4 */}
    <div className="bg-blue-400 border border-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 text-white">
        <Briefcase className="mx-auto mb-4" size={30} />
        <h3 className="font-crimson font-semibold text-lg mb-2">
            Career Ready
        </h3>
        <p className="text-sm text-blue-100">
            Resume & interview confidence building.
        </p>
    </div>

    {/* Card 5 */}
    <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
        <Mic className="mx-auto text-blue-700 mb-4" size={30} />
        <h3 className="font-crimson font-semibold text-lg mb-2 text-blue-900">
            Daily Speaking Practice
        </h3>
        <p className="text-sm text-blue-800">
            Live Kannada-supported sessions.
        </p>
    </div>

</motion.div>


                {/* ===== SPOKEN ENGLISH SECTION (UNCHANGED) ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-28 max-w-5xl mx-auto bg-white border-2 border-blue-950 rounded-2xl shadow-sm overflow-hidden"

                >
                    <div className="flex flex-col md:flex-row">
                        <div
                            className="md:w-[40%] h-64 md:h-auto bg-no-repeat bg-center"
                            style={{
                                backgroundImage: "url('/discuss_room2.jpeg')",
                                backgroundSize: "137%",
                                backgroundPosition: "center"
                            }}
                        />

                        <div className="md:w-[60%] px-8 py-12 text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-4 text-blue-700">
                                <Mic size={36} />
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-crimson font-semibold text-slate-900 mb-4">
                                Spoken English Through Kannada
                            </h2>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                Improve fluency, pronunciation, vocabulary,
                                and workplace communication through daily speaking practice.
                                Our Spoken English program focuses on real conversations,
                                interviews, and confidence — No textbook grammar.
                            </p>

                            <Link to="/spoken-english">
                                <Button size="lg" className="gap-2 bg-green-400 hover:bg-green-500 text-black font-semibold">
                                    Know Your English Level <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* ===== CREDENTIAL PLATFORM PARTNER SECTION ===== */}
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mt-28 max-w-7xl mx-auto px-6"
>
    <div
        className="border-2 border-blue-400 rounded-3xl shadow-xl px-12 py-10"
        style={{
            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 60%, #bfdbfe 85%, #dbeafe 100%)",
        }}
    >
        <div className="flex flex-col md:flex-row items-center">
            {/* ===== LEFT SIDE (28%) ===== */}
            <div className="md:w-[28%] text-center md:text-left pr-4">
                <h3 className="text-2xl md:text-3xl font-crimson font-semibold text-blue-900 leading-snug">
                    Credential Platform Partner
                </h3>
            </div>

            {/* ===== DIVIDER ===== */}
            <div
                className="hidden md:block w-[2px] h-24 mx-10 rounded-full"
                style={{
                    background: "linear-gradient(to bottom, transparent, #2563eb, transparent)",
                }}
            ></div>

            {/* ===== RIGHT SIDE (72%) ===== */}
            <div className="md:w-[72%] flex justify-around items-center mt-10 md:mt-0 gap-6">
                <img
                    src="/VTU.png"
                    alt="VTU"
                    className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
                />
                <img
                    src="/STARTUP.png"
                    alt="Startup India"
                    className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
                />
                <img
                    src="/ISO2.png"
                    alt="ISO"
                    className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
                />
                <img
                    src="/MSME.png"
                    alt="MSME"
                    className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
                />
            </div>
        </div>
    </div>
</motion.div>


{/* ===== TOP COMPANIES SECTION ===== */}
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mt-24 max-w-7xl mx-auto px-6 text-center"
>
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-crimson font-bold text-blue-900">
        Top Companies Where Our Learners Currently Work
    </h2>
    <p className="mt-3 text-blue-600 text-base md:text-lg">
        Making an impact in their fields, our learners work at top companies all around the world.
    </p>

    {/* Marquee Card */}
    <div
        className="mt-12 rounded-3xl border-2 border-blue-400 shadow-xl overflow-hidden py-8 px-0 relative"
        style={{
            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 60%, #bfdbfe 85%, #dbeafe 100%)",
        }}
    >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
            style={{ background: "linear-gradient(to right, #dbeafe, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
            style={{ background: "linear-gradient(to left, #dbeafe, transparent)" }} />

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee-ltr gap-16 items-center px-8">
            {/* Logos — duplicated for seamless loop */}
            {[
                { src: "/AMAZON.png", alt: "LG" },
                { src: "/CAPGEMINI.png", alt: "Tech Mahindra" },
                { src: "/CISCO.png", alt: "IBM" },
                { src: "/Infosys.png", alt: "Infosys" },
                { src: "/COGNIZANT.png", alt: "Axis Bank" },
                { src: "/EY.png", alt: "Philips" },
                { src: "/FK.png", alt: "Toyota" },
                { src: "/NETFLIX.png", alt: "Wipro" },
                { src: "/TCS.png", alt: "TCS" },
                { src: "/TECH-MAHINDRA.png", alt: "Amazon" },
                // Duplicate set for seamless loop
                { src: "/AMAZON.png", alt: "LG" },
                { src: "/CAPGEMINI.png", alt: "Tech Mahindra" },
                { src: "/CISCO.png", alt: "IBM" },
                { src: "/Infosys.png", alt: "Infosys" },
                { src: "/COGNIZANT.png", alt: "Axis Bank" },
                { src: "/EY.png", alt: "Philips" },
                { src: "/FK.png", alt: "Toyota" },
                { src: "/AMAZON.png", alt: "Wipro" },
                { src: "/CAPGEMINI.png", alt: "TCS" },
                { src: "/CISCON.png", alt: "Amazon" },
            ].map((logo, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-md hover:shadow-blue-300 hover:scale-105 transition-all duration-300"
                >
                    <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </div>
            ))}
        </div>
    </div>
</motion.div>


            </div>
        </section>
    );
};

export default Hero;
