import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    image: "/lms.jpeg",
    title: "LMS Platform",
    description: "Comprehensive LMS for seamless course delivery."
  },
  {
    image: "/videos.png",
    title: "Video Courses",
    description: "High-quality streaming with cloud infrastructure."
  },
  {
    image: "/admin.jpeg",
    title: "Admin Dashboard",
    description: "Powerful content & user management tools."
  },
  {
    image: "/analytics.png",
    title: "Analytics & Reports",
    description: "Real-time insights into student progress."
  },
  {
    image: "/secure.jpeg",
    title: "Secure Authentication",
    description: "Enterprise-level security & user protection."
  }
];

const Card = ({ service, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="
  w-[320px]
  h-[420px]
  bg-white
  rounded-3xl
  shadow-xl
  border-2
  border-blue-300
  hover:border-blue-400
  hover:shadow-[0_15px_40px_rgba(59,130,246,0.25)]
  overflow-hidden
  hover:-translate-y-2
  transition
  duration-300
"

  >
    {/* Top 40% Image */}
    <div className="h-[46%] bg-blue-50 flex items-center justify-center">
  <img
    src={service.image}
    alt={service.title}
    className="w-42 h-42 object-contain"
  />
</div>


    {/* Bottom 60% Content */}
    <div className="h-[60%] p-6 flex flex-col justify-center text-center">
      <h3 className="text-xl font-bold text-blue-900 mb-3">
        {service.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  </motion.div>
);

const ServiceCarousel = () => {
  return (
    <div className="relative py-40 max-w-7xl mx-auto flex flex-col items-center">

      {/* TOP ROW */}
      <div className="flex justify-between w-full max-w-6xl">
        <Card service={services[0]} delay={0} />
        <Card service={services[2]} delay={0.1} />
        <Card service={services[4]} delay={0.2} />
      </div>

      {/* MIDDLE STAGGERED ROW */}
      <div className="flex justify-center gap-40 -mt-20">
        <Card service={services[1]} delay={0.3} />
        <Card service={services[3]} delay={0.4} />
      </div>

    </div>
  );
};

export default ServiceCarousel;
