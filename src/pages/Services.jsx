import React from 'react';
import { Award, Users, Rocket, Laptop, HelpCircle } from 'lucide-react';
import Card from '../components/ui/Card';

const services = [
    {
        icon: <Laptop size={32} />,
        title: "Expert-Led Learning",
        description: "Learn from industry veterans with real-world experience. Our curriculum is constantly updated to match market needs."
    },
    {
        icon: <Award size={32} />,
        title: "Industry Certifications",
        description: "Earn globally recognized certificates upon completion that validate your skills to employers."
    },
    {
        icon: <Rocket size={32} />,
        title: "Career Enablement",
        description: "Dedicated placement cell, resume building workshops, and mock interviews to get you job-ready."
    },
    {
        icon: <Users size={32} />,
        title: "Flexible Learning",
        description: "Choose from online, offline, or hybrid models that fit your schedule and learning style."
    },
    {
        icon: <HelpCircle size={32} />,
        title: "Hackathons & Events",
        description: "Participate in coding challenges and networking events to boost your confidence and visibility."
    },
];

const Services = () => {
    return (
        <div className="pt-24 pb-20 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-secondary-dark font-bold tracking-wider uppercase">Our Value</span>
                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mt-2 mb-4">Why Choose Arambha?</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We don't just teach course material; we build careers. Here is what makes us different.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:border-primary/30 group">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
