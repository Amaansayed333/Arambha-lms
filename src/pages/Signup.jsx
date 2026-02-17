import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCred.user;

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                firstName,
                lastName,
                phone,
                role: 'student',
                enrolledCourses: [],
                createdAt: new Date(),
            });

            // After signup redirect to dashboard (production-ready flow)
            navigate('/dashboard');

        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-blue-300 flex items-center justify-center p-4">

            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-950">

                <h2 className="text-2xl font-bold text-blue-950 text-center mb-2">
                    Create Account
                </h2>

                <p className="text-blue-800 text-sm text-center mb-6">
                    Join Arambha today
                </p>

                {error && (
                    <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSignup}>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />

                    <input
                        type="tel"
                        placeholder="+91"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />

                    <Button className="w-full bg-blue-950 text-white hover:bg-blue-800" size="lg" disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-blue-800">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-950 font-semibold underline">
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Signup;
