import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Services from './pages/Services';
import Careers from './pages/Careers';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProgramDetails from './pages/ProgramDetails';
import CertificateVerify from './pages/CertificateVerify';
import CourseVideos from './pages/CourseVideos';
import AdminLogin from './pages/AdminLogin';
import AdminUpload from './pages/AdminUpload';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import ContactPopup from './components/ContactPopup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />


        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/careers" element={<Careers />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/programs/:id" element={<ProgramDetails />} />
              <Route path="/verify" element={<CertificateVerify />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/upload" element={<AdminUpload />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/courses/:courseCode/videos"
                element={
                  <ProtectedRoute>
                    <CourseVideos />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </main>

          <ContactPopup />
          <Footer />
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;