import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary font-heading">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join Arambha today</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+91" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="••••••••" />
                    </div>

                    <div className="pt-2">
                        <Link to="/dashboard">
                            <Button className="w-full" size="lg">Sign Up</Button>
                        </Link>
                    </div>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
