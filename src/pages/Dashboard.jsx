import React from 'react';
import { PlayCircle, Clock, Award, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const myCourses = [
        {
            title: "Foundation 60: Soft Skills",
            progress: 75,
            lastPlayed: "Module 4: Public Speaking",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            title: "Full Stack Java",
            progress: 30,
            lastPlayed: "Module 2: Java Basics",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-primary">Hello, Student! 👋</h1>
                        <p className="text-gray-500">Welcome back to your learning dashboard.</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium">📅 Today, Oct 24</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-xl text-primary"><BookOpen size={24} /></div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">2</p>
                            <p className="text-sm text-gray-500">Active Courses</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-amber-50 p-3 rounded-xl text-secondary"><Clock size={24} /></div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">12h</p>
                            <p className="text-sm text-gray-500">Hours Learned</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="bg-green-50 p-3 rounded-xl text-green-600"><Award size={24} /></div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-sm text-gray-500">Certificates</p>
                        </div>
                    </div>
                </div>

                {/* My Courses */}
                <h2 className="text-xl font-bold text-primary mb-6">Continue Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {myCourses.map((course, index) => (
                        <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
                            <img src={course.image} alt={course.title} className="w-24 h-24 rounded-xl object-cover" />
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="font-bold text-primary mb-1">{course.title}</h3>
                                <p className="text-xs text-gray-500 mb-3">Last played: {course.lastPlayed}</p>
                                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                    <div className="bg-secondary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-gray-600">{course.progress}% Complete</span>
                                    <button className="text-primary hover:text-primary-light flex items-center gap-1 text-sm font-medium">
                                        <PlayCircle size={16} /> Resume
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
