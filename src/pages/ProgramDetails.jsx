import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { programs } from '../utils/programsData';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ProgramDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const program = programs.find(p => p.id === parseInt(id));

    const programToCourseMap = {
        "Foundation 60": "c1",
        "Full Stack Java Developer": "c2",
        "Data Science & AI": "c3",
        "Banking & Finance Masterclass": "c4",
        "AutoCAD Design": "c5",
        "Digital Marketing Expert": "c6",
        "Human Resource Management": "c7",
        "Job Ready Bootcamp": "c8",
    };

    if (!program) {
        return (
            <div className="min-h-screen pt-24 pb-20 text-center container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4">Program not found</h1>
                <Link to="/programs" className="text-primary hover:underline">
                    Back to Programs
                </Link>
            </div>
        );
    }

    const handleEnroll = async () => {
        const courseCode = programToCourseMap[program.title];
        const targetVideos = `/courses/${courseCode}/videos`;
        const currentPage = `/programs/${id}`;

        // If not logged in, redirect to login and pass return location
        if (!user) {
            navigate('/login', { state: { from: currentPage } });
            return;
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const existingCourses = userSnap.data().enrolledCourses || [];

                // Prevent duplicate enrollment (use course code)
                if (!existingCourses.includes(courseCode)) {
                    await updateDoc(userRef, {
                        enrolledCourses: arrayUnion(courseCode),
                    });
                }
            } else {
                // If user doc doesn't exist, create minimal record
                await setDoc(userRef, { enrolledCourses: [courseCode] }, { merge: true });
            }

            // After enrollment go to course videos
            navigate(targetVideos);

        } catch (err) {
            console.error('Enrollment failed:', err);
        }
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">

                <Link
                    to="/programs"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Programs
                </Link>

                <div className="bg-blue-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                    {/* HEADER */}
<div className="bg-blue-950 p-8 md:p-12">
    <span className="inline-block py-1 px-3 rounded-md bg-white/20 text-sm font-semibold mb-4 backdrop-blur-sm text-blue-200">
        {program.category}
    </span>

    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-200">
        {program.title}
    </h1>

    <p className="text-lg text-blue-200 max-w-3xl">
        {program.description}
    </p>
</div>


                    <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2">

                            <h3 className="text-2xl font-bold text-blue-900 mb-6">
                                What You Will Learn
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {program.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="text-blue-900 shrink-0" />
                                        <span className="text-gray-700 font-medium">
                                            {tag}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {program.modules && (
                                <>
                                    <h3 className="text-2xl font-bold text-blue-900 mt-10 mb-6">
                                        Program Modules
                                    </h3>

                                    <div className="space-y-5">
                                        {program.modules.map((module, index) => (
                                            <div
                                                key={index}
                                                className="p-5 bg-white rounded-xl border-2 border-blue-950 shadow-sm"
                                            >
                                                <h4 className="font-semibold text-lg mb-1">
                                                    Module {index + 1}: {module.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {module.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="bg-white p-6 rounded-xl border border-blue-200 h-fit shadow-sm">

                            <h4 className="font-bold text-lg mb-4 text-blue-900">
                                Program Details
                            </h4>

                            <ul className="space-y-4 mb-6 text-sm">
                                <li className="flex justify-between border-b pb-2">
                                    <span>Duration</span>
                                    <span className="font-semibold">
                                        {program.duration}
                                    </span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Level</span>
                                    <span className="font-semibold">
                                        {program.level}
                                    </span>
                                </li>
                            </ul>

                            <Button
                                className="w-full mb-3 bg-blue-950 text-white hover:bg-blue-800"
                                size="lg"
                                onClick={handleEnroll}
                            >
                                Enroll Now
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetails;
