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
        <section className="relative overflow-hidden pt-24 pb-14">

            {/* ===== TOP HALF BACKGROUND IMAGE ===== */}
            <div
                className="absolute top-0 left-0 w-full h-[55%] bg-cover bg-center opacity-90"
                style={{
                    backgroundImage: "url('/discuss_room1.jpeg')"
                }}
            />

            {/* Optional Dark Overlay (for readability) */}
            <div className="absolute top-0 left-0 w-full h-[55%] bg-black/50" />

            {/* ===== LOWER GRADIENT BACKGROUND ===== */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100 to-blue-200" />

{/* Bottom Diagonal Strip */}
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-sky-200 drop-shadow-lg">
    Tired of Just Learning? <br />
    <span className="bg-gradient-to-r from-sky-300 via-sky-200 to-blue-100 bg-clip-text text-transparent drop-shadow-md">
        Start Speaking English Confidently
    </span>
</h1>


                    <p className="mt-6 text-lg text-blue-900 max-w-2xl mx-auto">
                        Learn Spoken English for work, interviews, and everyday life —
with daily speaking practice in a Kannada-friendly environment.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
    
    {/* WhatsApp Button */}
    <a
  href="https://wa.me/9108032103?text=Hi%20I%20am%20interested%20in%20Spoken%20English%20Course"
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

    {/* Book Speaking Assessment Button */}
    <Link to="/assessment">
        <Button
            size="lg"
            className="
                gap-2
                bg-white
                hover:bg-gray-100
                text-black
                border border-black/20
                font-semibold
            "
        >
            Book Speaking Assessment
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
        flex items-start gap-6
        max-w-md
    "
>

    {/* IMAGE */}
<div className="relative flex-shrink-0">

    {/* Dark Blue Glow */}
    <div className="
        absolute
        inset-0
        bg-blue-900/50
        rounded-full
        blur-3xl
        scale-125
        -z-10
    "></div>

    <img
        src="/src/assets/mic_speak.png"
        alt="Spoken English"
        className="w-[180px] h-[180px] object-contain relative left-[20px]"
    />
</div>


    {/* POINTS */}
    <div className="w-[260px] relative left-[-100px] top-[70px]">
        

        
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
        flex items-start gap-6
        max-w-md
    "
>

    {/* IMAGE WITH GLOW */}
    <div className="relative flex-shrink-0">

        {/* Dark Blue Glow */}
        <div
            className="
                absolute
                top-[-130px]
                left-[210px]
                w-[180px]
                h-[180px]
                bg-blue-900/50
                rounded-full
                blur-3xl
                scale-125
            "
        ></div>

        <img
            src="/src/assets/job.png"
            alt="Career Readiness"
            className="w-[180px] h-[180px] object-contain relative top-[-130px] left-[210px]"
        />
    </div>

    {/* BULLET POINTS */}
    <div className="w-[260px] relative top-[40px]">

  <h3 className="text-base font-bold text-yellow-400 mb-3 drop-shadow-md">
  Career Readiness Highlights
</h3>

<ul className="text-sm text-yellow-300 space-y-2 font-medium">
  <li className="flex items-start gap-3">
    <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
    Job & Interview Ready
  </li>

  <li className="flex items-start gap-3">
    <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
    Job Assistance & Interview Confidence
  </li>

  <li className="flex items-start gap-3">
    <span className="mt-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
    Resume Building & LinkedIn Enhancement
  </li>
</ul>



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
        backgroundImage: "url('/discuss_room2.jpeg')",
        backgroundSize: "137%",   // 👈 zooms image slightly
        backgroundPosition: "center"
    }}
/>


        {/* ===== RIGHT 60% : CONTENT ===== */}
        <div className="md:w-[60%] px-8 py-12 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4 text-blue-700">
                <Mic size={36} />
            </div>

            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
                Spoken English Through Kannada
            </h2>

            <p className="text-slate-600 leading-relaxed mb-8">
                Improve fluency, pronunciation, vocabulary,
and workplace communication through daily speaking practice.
Our Spoken English program focuses on
real conversations, interviews, and confidence —
No textbook grammar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/spoken-english">
                    <Button size="lg" className="gap-2 bg-green-400
                hover:bg-green-500
                text-black
                font-semibold">
                        Know Your English Level <ArrowRight size={18} />
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
