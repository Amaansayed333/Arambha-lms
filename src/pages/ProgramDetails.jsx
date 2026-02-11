import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { programs } from '../utils/programsData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ProgramDetails = () => {
    const { id } = useParams();
    const program = programs.find(p => p.id === parseInt(id));


    const programToCourseMap = {
    "Foundation 60": "c1",
    "Full Stack Java Developer": "c2",
    "Data Science & AI": "c3",
    "Banking & Finance": "c4",
    };


    if (!program) {
        return (
            <div className="min-h-screen pt-24 pb-20 text-center container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4">Program not found</h1>
                <Link to="/programs" className="text-primary hover:underline">Back to Programs</Link>
            </div>
        );
    }

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleEnroll = async (courseCode) => {
        const target = `/courses/${courseCode}/videos`;
        if (!user) {
            navigate('/signup', { state: { from: target } });
            return;
        }

        try {
            // Add courseCode to user's enrolledCourses using arrayUnion
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                enrolledCourses: arrayUnion(courseCode),
            });
        } catch (err) {
            console.error('Failed to update enrolledCourses:', err);
        }

        navigate(target);
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">
                <Link to="/programs" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Programs
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-primary text-white p-8 md:p-12">
                        <span className="inline-block py-1 px-3 rounded-md bg-white/20 text-sm font-semibold mb-4 backdrop-blur-sm">
                            {program.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">{program.title}</h1>
                        <p className="text-lg text-gray-200 max-w-3xl">{program.description}</p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-bold text-primary mb-6">What You Will Learn</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {program.tags.map((tag, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className="text-secondary shrink-0" />
                                            <span className="text-gray-700 font-medium">{tag}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-bold text-primary mb-4">Course Description</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    This intensive program is designed to take you from basics to advanced concepts in {program.title}.
                                    Gain hands-on experience through projects, assignments, and mentorship from industry experts.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 h-fit">
                                <h4 className="font-bold text-lg mb-4">Program Details</h4>
                                <ul className="space-y-4 mb-6 text-sm">
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="font-semibold text-gray-900">{program.duration}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">Level</span>
                                        <span className="font-semibold text-gray-900">{program.level}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500">Mode</span>
                                        <span className="font-semibold text-gray-900">Online / Offline</span>
                                    </li>
                                </ul>
                                                                <Button
                                                                        className="w-full mb-3"
                                                                        size="lg"
                                                                        onClick={() => handleEnroll(programToCourseMap[program.title])}
                                                                >
                                                                        Enroll Now
                                                                </Button>
                                <Button variant="outline" className="w-full">Download Syllabus</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetails;
