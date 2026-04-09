import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

// ✅ TRACKING: Import progress tracking function
import { getCurrentVideoProgress } from '../utils/firestoreQueries';

// ✅ COURSES: Import course data to get course names
import { programs } from '../utils/programsData';

import dashboardBack from '/dashboard_back2.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, signOut } = useAuth();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // ✅ TRACKING: State to hold resume progress for each course
    const [courseProgress, setCourseProgress] = useState({});

    // ✅ COURSES: Function to get course name from course code (c1, c2, etc.)
    const getCourseTitle = (courseCode) => {
        // Map course codes to program IDs (c1 = id 1, c2 = id 2, etc.)
        const codeNumber = courseCode.replace('c', ''); // Remove 'c' prefix
        const courseId = parseInt(codeNumber);
        
        // Find program with matching ID
        const program = programs.find(p => p.id === courseId);
        return program ? program.title : courseCode; // Fallback to course code if not found
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (authLoading) return;

                if (!user) {
                    navigate('/login');
                    return;
                }

                const userDocRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userDocRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                } else {
                    setError('User data not found.');
                }

            } catch (err) {
                console.error(err);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, user, authLoading]);

    // ✅ TRACKING: Fetch progress for all enrolled courses
    useEffect(() => {
        const loadCourseProgress = async () => {
            if (!userData?.enrolledCourses || !user) return;

            const progressMap = {};
            
            // Fetch progress for each enrolled course
            for (const courseCode of userData.enrolledCourses) {
                try {
                    const progress = await getCurrentVideoProgress(user.uid, courseCode);
                    if (progress && progress.videoIndex !== null) {
                        progressMap[courseCode] = progress;
                        console.log(`✅ Loaded progress for ${courseCode}:`, progress);
                    }
                } catch (err) {
                    console.warn(`Could not load progress for ${courseCode}:`, err);
                }
            }
            
            setCourseProgress(progressMap);
        };

        loadCourseProgress();
    }, [userData?.enrolledCourses, user]);

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('firebaseToken');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-100">
                <p className="text-blue-900 font-semibold">Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-100">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* 🔵 Full Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/services.png')" }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* 🔵 Diagonal Image Background (LEFT SIDE) */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/dashboard_back2.png')",
                    clipPath: "polygon(0 0, 60% 0, 40% 100%, 0% 100%)"
                }}
            ></div>

            {/* Diagonal Overlay */}
            <div
                className="absolute inset-0 bg-[#191970]/50 z-0"
                style={{
                    clipPath: "polygon(0 0, 60% 0, 40% 100%, 0% 100%)"
                }}
            ></div>

            {/* CONTENT */}
            <div className="relative z-20 min-h-screen py-16 px-4 flex items-center justify-center">

                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border-2 border-blue-950 p-8">

                    <h1 className="text-3xl font-bold text-blue-950 mb-6">
                        Student Dashboard
                    </h1>

                    {/* USER DETAILS */}
                    <div className="space-y-4 text-blue-900">

                        <div>
                            <span className="font-semibold">Full Name: </span>
                            {userData?.firstName} {userData?.lastName}
                        </div>

                        <div>
                            <span className="font-semibold">Email: </span>
                            {userData?.email}
                        </div>

                        <div>
                            <span className="font-semibold">Phone: </span>
                            {userData?.phone || 'Not Provided'}
                        </div>

                        <div>
                            <span className="font-semibold">Role: </span>
                            {userData?.role}
                        </div>

                        <div>
                            <span className="font-semibold">Enrolled Courses: </span>
                            {userData?.enrolledCourses?.length > 0 ? (
                                <div className="space-y-3 mt-3">
                                    {userData.enrolledCourses.map((course, index) => {
                                        const progress = courseProgress[course];
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200"
                                            >
                                                <div>
                                                    {/* ✅ COURSES: Show course name and code */}
                                                    <p className="font-medium text-blue-900">{getCourseTitle(course)}</p>
                                                    <p className="text-xs text-blue-500 mt-1">Course Code: {course.toUpperCase()}</p>
                                                    {/* ✅ TRACKING: Show resume info if progress exists */}
                                                    {progress && (
                                                        <p className="text-sm text-blue-600 mt-1">
                                                            Last watched: Video {progress.videoIndex + 1}
                                                        </p>
                                                    )}
                                                </div>
                                                {/* ✅ TRACKING: Show Resume button if progress exists, otherwise Browse button */}
                                                {progress ? (
                                                    <button
                                                        onClick={() => navigate(`/courses/${course}/videos`)}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                                    >
                                                        Resume
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => navigate(`/courses/${course}/videos`)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                                    >
                                                        View
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-blue-700 mt-1">
                                    No courses enrolled yet.
                                </p>
                            )}
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="mt-8 flex gap-4">

                        <button
                            onClick={() => navigate('/programs')}
                            className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition"
                        >
                            Browse Courses
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;
