import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary font-heading">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to your student dashboard</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="you@example.com" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <a href="#" className="text-sm text-secondary-dark hover:underline">Forgot password?</a>
                        </div>
                        <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="••••••••" />
                    </div>

                    <Link to="/dashboard">
                        <Button className="w-full mt-2" size="lg">Sign In</Button>
                    </Link>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Register now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
