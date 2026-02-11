import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProgramDetails from './pages/ProgramDetails';
import CertificateVerify from './pages/CertificateVerify';
import CourseVideos from './pages/CourseVideos';
import AdminLogin from './pages/AdminLogin';
import AdminUpload from './pages/AdminUpload';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/programs/:id" element={<ProgramDetails />} />
            <Route path="/verify" element={<CertificateVerify />} />
            <Route path="/courses/:courseCode/videos" element={<CourseVideos />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/upload" element={<AdminUpload />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
