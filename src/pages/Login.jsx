import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
//import logo from '../assets/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCred = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const token = await userCred.user.getIdToken();
            localStorage.setItem('firebaseToken', token);

            const returnTo = location.state?.from || '/dashboard';
            navigate(returnTo);

        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

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
        backgroundImage: "url('/login_image.png')",
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
    <div className="relative z-20 min-h-screen flex items-center justify-center px-4">

      <div className="relative flex items-center justify-center">

        {/* BACK BIG CARD (Logo Card) */}
        <div
          className="
            relative
            w-[420px]
            h-[500px]
            bg-white
            rounded-3xl
            shadow-2xl
            border-2
            border-blue-950
            flex
            items-center
            justify-center
            z-0
            left-[-220px]
          "
        >
          <img
            src="/logo.png"
            alt="Arambha Logo"
            className="w-72 object-contain"
          />
        </div>

        {/* FRONT LOGIN CARD */}
        <div
          className="
            absolute
            right-[-60px]
            w-[380px]
            bg-white
            rounded-2xl
            shadow-2xl
            p-8
            border-2
            border-blue-950
            z-30
          "
        >
          <h2 className="text-2xl font-bold text-blue-950 text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-blue-800 text-sm text-center mb-6">
            Sign in to your student dashboard
          </p>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-950 text-white font-semibold text-sm hover:bg-blue-800 transition"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-blue-800">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-950 font-semibold underline"
            >
              Register now
            </Link>
          </div>
        </div>

      </div>
    </div>
  </div>
);



};

export default Login;
