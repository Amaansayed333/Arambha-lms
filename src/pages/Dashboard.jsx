import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import dashboardBack from '/dashboard_back2.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, signOut } = useAuth();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        <div
    className="min-h-screen py-16 px-4 bg-cover bg-center bg-no-repeat relative"
    style={{
        backgroundImage: `url(${dashboardBack})`
    }}
>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-blue-950 p-8">

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
                            <ul className="list-disc ml-6 mt-2">
                                {userData.enrolledCourses.map((course, index) => (
                                    <li key={index}>{course}</li>
                                ))}
                            </ul>
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
    );
};

export default Dashboard;
