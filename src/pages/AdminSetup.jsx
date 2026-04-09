import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';

const AdminSetup = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [videosCreated, setVideosCreated] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!user) {
          setCheckingAdmin(false);
          return;
        }

        // Get ID token result which contains custom claims
        const idTokenResult = await user.getIdTokenResult();
        const adminStatus = !!idTokenResult.claims.admin;
        
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          console.warn('⚠️ User is not admin. Redirecting...');
          setTimeout(() => navigate('/dashboard'), 1000);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError('Error verifying admin status');
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (!authLoading) {
      checkAdmin();
    }
  }, [user, authLoading, navigate]);

  // Sample videos for all courses
  const sampleVideos = [
    // Foundation 60 (c1)
    {
      title: 'Module 1: Introduction to Foundation 60',
      courseCode: 'c1',
      description: 'Get started with the fundamentals',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Module 2: Core Concepts',
      courseCode: 'c1',
      description: 'Learn the core concepts',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Module 3: Practical Application',
      courseCode: 'c1',
      description: 'Apply what you learned',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Module 4: Final Project',
      courseCode: 'c1',
      description: 'Complete your capstone project',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // Full Stack Java Developer (c2)
    {
      title: 'Java Basics and Setup',
      courseCode: 'c2',
      description: 'Start your Java journey',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Object Oriented Programming',
      courseCode: 'c2',
      description: 'Master OOP concepts',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Database Design and SQL',
      courseCode: 'c2',
      description: 'Work with databases',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Spring Framework Masterclass',
      courseCode: 'c2',
      description: 'Build enterprise applications',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // Data Science & AI (c3)
    {
      title: 'Python for Data Science',
      courseCode: 'c3',
      description: 'Setup and essentials',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Machine Learning Fundamentals',
      courseCode: 'c3',
      description: 'Understanding ML algorithms',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Deep Learning and Neural Networks',
      courseCode: 'c3',
      description: 'Advanced AI techniques',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // Banking & Finance (c4)
    {
      title: 'Financial Markets Overview',
      courseCode: 'c4',
      description: 'Introduction to finance',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Investment Analysis',
      courseCode: 'c4',
      description: 'Portfolio management',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // AutoCAD Design (c5)
    {
      title: 'AutoCAD Basics',
      courseCode: 'c5',
      description: 'Getting started with CAD',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Advanced Design Techniques',
      courseCode: 'c5',
      description: 'Professional CAD workflows',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // Digital Marketing Expert (c6)
    {
      title: 'Social Media Strategy',
      courseCode: 'c6',
      description: 'Master social platforms',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'SEO and Content Marketing',
      courseCode: 'c6',
      description: 'Drive organic traffic',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // Human Resource Management (c7)
    {
      title: 'HR Fundamentals',
      courseCode: 'c7',
      description: 'Core HR principles',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Recruitment and Talent Management',
      courseCode: 'c7',
      description: 'Build strong teams',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },

    // Job Ready Bootcamp (c8)
    {
      title: 'Interview Preparation',
      courseCode: 'c8',
      description: 'Land your dream job',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
    {
      title: 'Real-world Projects',
      courseCode: 'c8',
      description: 'Build your portfolio',
      driveFileId: '1u5H9-yKaBB27LK-VzG5yRx6EhZhEn5KJ'
    },
  ];

  const handleCreateTestData = async () => {
    try {
      setLoading(true);
      setStatus('Starting to create test videos...');
      setError('');
      setVideosCreated(0);

      const videosRef = collection(db, 'videos');

      for (let i = 0; i < sampleVideos.length; i++) {
        const video = sampleVideos[i];
        
        try {
          await addDoc(videosRef, {
            title: video.title,
            courseCode: video.courseCode.toLowerCase(),
            description: video.description,
            driveFileId: video.driveFileId,
            uploadedAt: serverTimestamp(),
            createdBy: user.uid,
            createdByEmail: user.email
          });

          setVideosCreated(i + 1);
          setStatus(`Creating videos... ${i + 1}/${sampleVideos.length}`);

          // Add small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          console.error(`Error creating video ${i}:`, err);
          throw err;
        }
      }

      setStatus(`✅ Successfully created ${sampleVideos.length} test videos!`);
      setCompleted(true);

    } catch (err) {
      console.error('❌ Error creating test data:', err);
      setError(`Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || checkingAdmin) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="inline-block animate-spin text-blue-600 mb-4" size={40} />
          <p className="text-gray-600 font-semibold">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="inline-block text-red-600 mb-4" size={40} />
          <p className="text-red-600 font-semibold">Please login first</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="inline-block text-red-600 mb-4" size={40} />
          <p className="text-red-600 font-semibold">❌ Access Denied: Admin only</p>
          <p className="text-gray-600 text-sm mt-2">You do not have admin privileges</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-950 mb-2">
            🔧 Admin Setup Panel
          </h1>
          <p className="text-gray-600">Create test videos for all courses</p>
        </div>

        {/* INFO BOX */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-blue-950 mb-3">What This Does:</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>Creates sample videos for all 8 courses</li>
            <li>2-4 videos per course (18 total videos)</li>
            <li>Ready to test enrollment and progress tracking</li>
            <li>Uses temporary Google Drive file ID</li>
            <li>This page can be deleted after setup</li>
          </ul>
        </div>

        {/* STATUS */}
        {status && (
          <div className={`rounded-lg p-4 mb-6 ${completed ? 'bg-green-50 border-l-4 border-green-600' : 'bg-blue-50 border-l-4 border-blue-600'}`}>
            <p className={completed ? 'text-green-700 font-semibold' : 'text-blue-700 font-semibold'}>
              {status}
            </p>
            {videosCreated > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Progress: {videosCreated} videos created
              </p>
            )}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleCreateTestData}
          disabled={loading || completed}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 mb-6 ${
            completed
              ? 'bg-green-100 text-green-700 cursor-default'
              : loading
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          {loading && <Loader size={24} className="animate-spin" />}
          {completed && <CheckCircle size={24} />}
          {completed ? 'Setup Complete ✅' : loading ? 'Creating Videos...' : 'Create Test Videos'}
        </button>

        {/* INFO */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-600">
          <h3 className="font-bold text-gray-900 mb-3">📋 Test Plans After Setup:</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Sign up with test account</li>
            <li>Enroll in "Foundation 60" (c1)</li>
            <li>See 4 videos displayed ✅</li>
            <li>Mark videos as complete ✅</li>
            <li>Watch progress bar update ✅</li>
            <li>Download certificate when done ✅</li>
          </ol>
        </div>

        {/* COURSES BREAKDOWN */}
        {completed && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">📚 Videos Created by Course:</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c1: Foundation 60</p>
                <p className="text-gray-600">4 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c2: Full Stack Java</p>
                <p className="text-gray-600">4 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c3: Data Science</p>
                <p className="text-gray-600">3 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c4: Banking/Finance</p>
                <p className="text-gray-600">2 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c5: AutoCAD</p>
                <p className="text-gray-600">2 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c6: Digital Marketing</p>
                <p className="text-gray-600">2 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c7: HR Management</p>
                <p className="text-gray-600">2 videos</p>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-semibold text-blue-950">c8: Job Ready</p>
                <p className="text-gray-600">2 videos</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminSetup;
