import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Globe, Coffee, Smile, Target, Briefcase, ChevronRight } from 'lucide-react';

const Careers = () => {
    const benefits = [
        { icon: <Heart size={28} />, title: "Health & Wellness", desc: "Comprehensive health coverage for you and your family." },
        { icon: <Zap size={28} />, title: "Learning Budget", desc: "Annual stipend for courses, conferences, and books." },
        { icon: <Globe size={28} />, title: "Remote First", desc: "Work from anywhere in the world. We focus on output, not hours." },
        { icon: <Coffee size={28} />, title: "Team Retreats", desc: "Annual all-expenses-paid trips to connect and recharge." },
        { icon: <Smile size={28} />, title: "Work-Life Balance", desc: "Flexible hours and unlimited PTO policy." },
        { icon: <Target size={28} />, title: "Growth Path", desc: "Clear career progression and mentorship programs." },
    ];

    const positions = [
        {
            title: "Business Development Associate – Inside Sales",
            location: "Bangalore / Remote",
            department: "Sales",
            experience: "0-2 Years",
            ctc: "₹18L - ₹24L (OTE)",
            description: "Drive revenue growth by identifying and qualifying potential leads. You will be responsible for handling inbound inquiries and making outbound calls to prospective clients."
        },
        {
            title: "Digital Marketing Associate",
            location: "Bangalore",
            department: "Marketing",
            experience: "1-3 Years",
            ctc: "₹4L - ₹7L",
            description: "Manage and optimize our social media presence and paid ad campaigns. You should be proficient in SEO, SEM, and content marketing strategies."
        },
        {
            title: "Brand Growth Executive",
            location: "Bangalore",
            department: "Marketing",
            experience: "2-4 Years",
            ctc: "₹5L - ₹9L",
            description: "Develop and execute brand strategies to increase market share. Work closely with the design and content teams to ensure brand consistency."
        },
        {
            title: "Sales Lead/Manager",
            location: "Bangalore",
            department: "Sales",
            experience: "4-8 Years",
            ctc: "₹10L - ₹18L",
            description: "Lead and mentor a team of high-performing sales executives. Responsible for setting targets, monitoring performance, and driving overall sales strategy."
        },
        {
            title: "Marketing Strategy Manager",
            location: "Remote / Hybrid",
            department: "Marketing",
            experience: "5+ Years",
            ctc: "₹15L - ₹25L",
            description: "Oversee all marketing operations and develop long-term growth strategies. Analyze market trends and competitor activities to identify opportunities."
        },
        {
            title: "Campus Growth Partner",
            location: "Pan India",
            department: "Operations",
            experience: "1-3 Years",
            ctc: "₹4L - ₹6L + Incentives",
            description: "Build and maintain relationships with educational institutions. Organize campus events and workshops to promote our courses."
        },
        {
            title: "Corporate Sales Executive (B2B)",
            location: "Bangalore / Mumbai",
            department: "Sales",
            experience: "2-5 Years",
            ctc: "₹6L - ₹12L",
            description: "Focus on acquiring corporate clients for our training and upskilling programs. Prepare proposals and negotiate contracts with key stakeholders."
        },
        {
            title: "Human Resource Manager",
            location: "Bangalore",
            department: "HR",
            experience: "4-7 Years",
            ctc: "₹8L - ₹14L",
            description: "Manage the full recruitment lifecycle and employee relations. Foster a positive work culture and implement effective HR policies."
        },
        {
            title: "Lead Generation Specialist",
            location: "Remote",
            department: "Marketing",
            experience: "1-3 Years",
            ctc: "₹4L - ₹7L",
            description: "Research and identify potential leads through various channels. Maintain a clean database and nurture leads through email marketing."
        },
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">

            {/* 1. Hero Section */}
<section className="relative overflow-hidden py-24">

    {/* Background Image */}
    <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/discuss_room2.jpeg')" }}
    ></div>

    {/* Dark Overlay for readability */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Abstract Background Shapes */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[80px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10 text-white">

        {/* SKY BLUE GLASS OVERLAY PANEL */}
        <div className="
            max-w-5xl 
            mx-auto 
            text-center
            bg-sky-300/15
            backdrop-blur-md
            rounded-3xl
            px-8
            py-14
            border
            border-sky-200/30
            shadow-2xl
        ">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight text-blue-400">
                    Build Your Career With Arambha
                </h1>

                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-blue-100 max-w-4xl mx-auto">
                    At Arambha Skill & Design Solutions Pvt. Ltd., we don’t just offer jobs — we build careers.
                </h2>

                <p className="text-lg md:text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed mb-10">
                    We believe in empowering passionate individuals with real responsibility, growth opportunities, and a performance-driven culture.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#positions"
                        className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:bg-blue-50 hover:-translate-y-1"
                    >
                        View Open Roles
                    </a>

                    <a
                        href="#culture"
                        className="px-8 py-3 bg-blue-800/30 hover:bg-blue-800/50 text-white font-bold rounded-full backdrop-blur-sm transition-all border border-blue-400/30 hover:border-blue-400/50"
                    >
                        Our Culture
                    </a>
                </div>
            </motion.div>

        </div>
    </div>
</section>





            {/* Content Wrapper with Background */}
            <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/careers_background.jpeg")' }}>

                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

                {/* 2. Why Join Arambha */}
                <section id="culture" className="relative z-10 py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Why Join Arambha?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">We're building a company where you can do your best work, grow your career, and have a life outside of the office.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <Briefcase size={28} />, title: "Real Responsibility", desc: "Own your projects from day one and make a tangible impact." },
                                { icon: <Zap size={28} />, title: "Fast Career Growth", desc: " merit-based progression with clear paths to leveling up." },
                                { icon: <Target size={28} />, title: "Performance-Driven", desc: "We reward results, not just hours logged at a desk." },
                                { icon: <Globe size={28} />, title: "Leadership Ops", desc: "Step up and lead initiatives that shape the company's future." },
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group"
                                >
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Open Positions */}
                <section id="positions" className="relative z-10 py-24">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Current Openings</h2>
                            <p className="text-slate-600">Come join us in our mission to democratize education.</p>
                        </div>

                        <div className="space-y-6">
                            {positions.map((job, index) => (
                                <JobCard key={index} job={job} index={index} />
                            ))}
                        </div>

                        <div className="mt-12 text-center bg-blue-50 p-8 rounded-2xl border border-blue-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Don't see the right role?</h3>
                            <p className="text-slate-600 mb-6">We are always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future openings.</p>
                            <button className="bg-white text-blue-700 border border-blue-200 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                                Email General Application
                            </button>
                        </div>

                    </div>
                </section>

                {/* 4. Final CTA */}
                <section className="relative z-10 py-20 bg-slate-900 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                            Ready to Grow Faster and Achieve More?
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join a team that values dedication, leadership, and success.
                        </p>
                        <a
                            href="mailto:hr@arambha.in"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-10 py-4 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                        >
                            Apply Now
                        </a>
                    </div>
                </section>
            </div>

        </div >
    );
};

const JobCard = ({ job, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-blue-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
                <div className="flex-1 w-full">
                    <motion.h3 layout="position" className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {job.title}
                    </motion.h3>

                    <motion.div layout="position" className="flex flex-wrap gap-3 md:gap-4 text-sm font-medium text-slate-500 mb-4">
                        <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            <Briefcase size={14} className="text-blue-500" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            <Globe size={14} className="text-blue-500" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            <Target size={14} className="text-blue-500" /> {job.experience}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 text-slate-700">
                            💰 {job.ctc}
                        </span>
                    </motion.div>

                    <motion.div layout className="relative">
                        <p className={`text-slate-600 leading-relaxed max-w-2xl ${!isOpen ? 'line-clamp-2' : ''}`}>
                            {job.description}
                        </p>

                        <motion.button
                            layout="position"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-blue-600 font-semibold mt-3 text-sm hover:underline flex items-center focus:outline-none"
                        >
                            {isOpen ? "Show Less" : "View Details"}
                            <ChevronRight size={16} className={`ml-1 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </motion.button>
                    </motion.div>
                </div>

                <motion.div layout="position" className="flex-shrink-0 mt-4 md:mt-0 w-full md:w-auto">
                    <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-blue-200">
                        Apply Now
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Careers;