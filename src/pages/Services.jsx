import React,{useRef}from "react";

/* ================= SECTION 1 DATA ================= */
const features = [
  {
    icon: "/icons/expert.png",
    title: "Learn from Industry Experts",
    desc: "Get trained by professionals with real-world experience.",
  },
  {
    icon: "/icons/certification.png",
    title: "Certified Programs",
    desc: "Earn certifications that actually matter in the job market.",
  },
  {
    icon: "/icons/career2.png",
    title: "Career Support",
    desc: "Resume building, interview prep, and placement guidance.",
  },
  {
    icon: "/icons/flexible.png",
    title: "Flexible Learning",
    desc: "Learn at your pace with online & hybrid options.",
  },
  {
    icon: "/icons/projects.jpeg",
    title: "Live Projects",
    desc: "Work on real-world projects to build your portfolio.",
  },
  {
    icon: "/icons/community2.png",
    title: "Growing Community",
    desc: "Join thousands of learners building their careers.",
  },
];

const bulletPoints = [
  "Industry-relevant courses designed for real-world skills",
  "ISO & MSME-recognized certifications trusted by employers",
  "Hands-on training with live projects and case studies",
  "Personalized mentorship from industry experts",
  "End-to-end placement assistance and career guidance",
  "Resume building and LinkedIn profile optimization",
  "Mock interviews and soft skill development sessions",
  "Flexible learning formats – online, offline, hybrid",
  "Regular assessments with actionable feedback",
  "Admission support for choosing the right career path",
];

/* ================= SECTION 2 DATA ================= */
const servicesList = [
  {
    img: "/icons/service1.png",
    title: "Courses & Upskilling with Certification",
    desc: "We offer industry-relevant courses and upskilling programs designed to enhance knowledge and employability. Learners receive recognized certifications upon successful completion.",
  },
  {
    img: "/icons/service2.png",
    title: "Manpower Solutions for Companies",
    desc: "We provide skilled and job-ready candidates to meet the manpower requirements of various organizations across industries, ensuring the right talent for the right role.",
  },
  {
    img: "/icons/service3.png",
    title: "Admission Support for Colleges & Learners",
    desc: "We assist students and institutions with seamless admission processes, helping learners choose the right courses and colleges for their career growth.",
  },
  {
    img: "/icons/service4.png",
    title: "Training for Skilled & Unskilled Workforce",
    desc: "We deliver practical training programs for both skilled and unskilled individuals, focusing on job readiness, productivity, and career development.",
  },
  {
    img: "/icons/service5.png",
    title: "Placement Assistance & Career Support",
    desc: "We support learners with placement opportunities, interview preparation, and career guidance to help them secure suitable jobs.",
  },
  {
    img: "/icons/service6.png",
    title: "Live Projects & Industry-Driven Learning",
    desc: "Get hands-on experience by working on real-time projects under the guidance of industry experts. Build practical skills, understand real business challenges, and become job-ready with confidence.",
  },
];


/* ================= SECTION 3 DATA ================= */
const testimonials = [
  {
    name: "Rohan Sharma",
    college: "Delhi University",
    text: "The training at Arambha helped me gain real-world skills. The mentors were super supportive and guided me throughout my learning journey.",
  },
  {
    name: "Priya Verma",
    college: "Mumbai University",
    text: "I loved the structured learning approach. The live projects gave me confidence and helped me crack my first interview.",
  },
  {
    name: "Amit Patel",
    college: "NIT Surat",
    text: "The placement support is amazing. Resume building and mock interviews really made a difference for me.",
  },
  {
    name: "Sneha Reddy",
    college: "Osmania University",
    text: "The flexible learning options helped me balance my college and skill development.",
  },
  {
    name: "Arjun Mehta",
    college: "BITS Pilani",
    text: "Hands-on projects and mentorship made learning super engaging.",
  },
  {
    name: "Neha Gupta",
    college: "Amity University",
    text: "The certification added real value to my profile.",
  },
  {
    name: "Karan Singh",
    college: "Chandigarh University",
    text: "Great experience overall! Mentors were very helpful.",
  },
  {
    name: "Anjali Nair",
    college: "Kerala University",
    text: "Practical assignments helped me understand concepts deeply.",
  },
];




const Services = () => {
  const sliderRef = useRef(null);

  const handleMouseEnter = () => {
    sliderRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    sliderRef.current.style.animationPlayState = "running";
  };
  return (
    <>
      {/* ================= SECTION 1 ================= */}
      <section className="w-full px-6 md:px-16 py-16 bg-blue-100">
        
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-blue-600">Arambha Skills Solutions</span>?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            We don’t just teach — we help you build a career. From learning to placement, 
            we guide you at every step with practical skills and real opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4 
                hover:shadow-md transition border border-blue-600"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-blue-600">
            <ul className="space-y-4">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">•</span>
                  <p className="text-gray-700">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="w-full px-6 md:px-16 py-16 bg-white">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the range of solutions we offer to help you grow, learn, and succeed in your career journey.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-10">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 bg-blue-200 rounded-2xl p-8 shadow-sm border border-blue-400`}
            >
              
              {/* TEXT */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* IMAGE */}
              <div className="flex-1 flex justify-center rounded-[25px]">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-66 h-64 object-contain"
                />
              </div>

            </div>
          ))}
        </div>

      </section>

     
      {/* ================= SECTION 3 ================= */}
<section className="w-full py-16 bg-blue-100 overflow-hidden">
  
  {/* Heading */}
  <div className="text-center mb-12 px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
      What Our <span className="text-blue-600">Learners Say</span>
    </h2>
    <p className="mt-4 text-gray-600 text-lg">
      Real experiences from students who transformed their careers with us.
    </p>
  </div>

  {/* Slider */}
  <div
    className="relative w-full overflow-hidden"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div
      ref={sliderRef}
      className="flex gap-6 animate-scroll px-6"
    >
      {[...testimonials, ...testimonials].map((item, index) => (
        <div
          key={index}
          className="min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-md p-6 border border-blue-200"
        >
          <p className="text-gray-600 text-sm leading-relaxed">
            “{item.text}”
          </p>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-900">
              {item.name}
            </h4>
            <p className="text-sm text-gray-500">
              {item.college}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Animation */}
  <style>
    {`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .animate-scroll {
        animation: scroll 13s linear infinite;
      }
    `}
  </style>

</section>
    </>
  );
};

export default Services;