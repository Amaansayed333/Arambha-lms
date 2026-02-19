import React from 'react';
import Button from '../ui/Button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
    return (
        <section className="py-40 bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 my-[-120px]">
    <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* IMAGE SIDE */}
            <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl mt-[20px]">
                    <img
    src="/course_track.png"
    alt="Team meeting"
    className="w-full h-full object-cover scale-110 top-[20px] relative"
 />

                </div>

                {/* Blue Glow Instead of Secondary */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-200/60 rounded-full blur-3xl -z-10" />
            </div>

            {/* CONTENT SIDE */}
            <div className="w-full lg:w-1/2">

                <h4 className="text-blue-700 font-bold tracking-wider uppercase mb-2">
                    Who We Are
                </h4>

                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-blue-900 mb-6">
                    Building the Future of Education, <br />
                    One Student at a Time.
                </h2>

                <p className="text-blue-800/80 mb-6 leading-relaxed">
                    At Arambha Skill Solutions, we believe that education should lead to outcomes.
                    Our mission is to empower students, freshers, and professionals with the
                    technical and soft skills needed to thrive in the modern workforce.
                </p>

                <ul className="space-y-4 mb-8">
                    {[
                        "Industry-Recognized Certifications",
                        "Practical, Hands-on Learning",
                        "Expert Mentorship from MNC Professionals",
                        "Dedicated Placement Support"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <CheckCircle
                                className="text-blue-600 shrink-0"
                                size={20}
                            />
                            <span className="text-blue-900 font-medium">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>

                <Link to="/about">
                    <Button
                        className="bg-blue-900 hover:bg-blue-800 text-white"
                    >
                        Learn More About Us
                    </Button>
                </Link>

            </div>
        </div>
    </div>
</section>

    );
};

export default AboutPreview;
