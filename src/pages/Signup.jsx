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
            // 🔐 Create Firebase Auth user
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCred.user;

            // 🔑 Firebase ID Token (used later for backend auth)
            const token = await user.getIdToken();
            localStorage.setItem('firebaseToken', token);

            // 📦 Save user profile in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                firstName,
                lastName,
                phone,
                role: 'student',
                enrolledCourses: [], // 🔥 later used for access control
                createdAt: new Date(),
            });

            // ✅ Redirect after successful signup — return to intended path if present
            const returnTo = location.state?.from || '/programs';
            navigate(returnTo);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary font-heading">
                        Create Account
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Join Arambha today
                    </p>
                </div>

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
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            required
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        required
                    />

                    <input
                        type="tel"
                        placeholder="+91"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    />

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        required
                    />

                    <Button className="w-full" size="lg" disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
