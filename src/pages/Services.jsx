import React from 'react';
import { Award, Users, Laptop, Briefcase, Lock, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCarousel from '../components/ServiceCarousel.jsx';

const techStack = [
  { name: 'React', color: 'bg-blue-600' },
  { name: 'Tailwind CSS', color: 'bg-cyan-500' },
  { name: 'Django', color: 'bg-green-600' },
  { name: 'Google Drive API', color: 'bg-yellow-500' },
];

const Services = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/services.png')" }}
        />

        {/* Smooth Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-blue-50" />

        {/* Decorative Orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-4 border border-white/30">
              Our Services
            </span>

            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Providing Technology Driven <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">
                Digital Learning Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Empowering institutions with scalable, secure, and user-friendly tools to deliver world-class education online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Services Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 pt-20 pb-24 -mt-20 z-20">

  {/* Section Heading */}
  <div className="text-center mb-16 relative z-10">
    <h2 className="
      inline-block
      text-3xl md:text-5xl
      font-heading
      font-bold
      text-white
      px-8 py-3
      border-4
      border-blue-900
      rounded-xl
      bg-blue-900
      shadow-lg
    ">
      Our Services
    </h2>
  </div>

  <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
  <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

  <div className="container mx-auto px-4 relative z-10">
    <ServiceCarousel />
  </div>

</section>


      {/* 3. Why Choose Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 pt-24 pb-24">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
              Why Choose Arambha LMS
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with educational expertise to deliver platforms that truly work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Award size={32} />, title: "Industry-Relevant Curriculum", desc: "Courses designed to meet current market demands and standards." },
              { icon: <Lock size={32} />, title: "Secure & Scalable Platform", desc: "Enterprise-grade security that grows with your institution." },
              { icon: <Briefcase size={32} />, title: "Cloud-Based Video Delivery", desc: "Seamless streaming integrated with robust cloud infrastructure." },
              { icon: <Users size={32} />, title: "Admin-Controlled Content", desc: "Full control over course materials, user access, and management." },
              { icon: <Laptop size={32} />, title: "Easy Access from Anywhere", desc: "Responsive design ensures learning continues on any device." },
              { icon: <BarChart size={32} />, title: "Performance Tracking", desc: "Real-time analytics to monitor student progress and engagement." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">
            Powered by Modern Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-medium flex items-center gap-3 hover:bg-white hover:shadow-lg hover:text-blue-600 transition-all border border-transparent hover:border-slate-100"
              >
                <span className={`w-3 h-3 rounded-full ${tech.color}`} />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Need a scalable LMS solution?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Get in touch with us to discuss how Arambha can transform your educational delivery.
          </p>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Contact Us Today
          </button>
        </div>
      </section>

    </div>
  );
};

export default Services;
