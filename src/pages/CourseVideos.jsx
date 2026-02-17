import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const CourseVideos = () => {
  const { courseCode } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const run = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const enrolled = userSnap.exists() ? userSnap.data().enrolledCourses || [] : [];

        // If not enrolled, redirect to programs
        if (!enrolled.includes(courseCode)) {
          navigate('/programs');
          return;
        }

        const res = await fetch(`http://127.0.0.1:8000/api/videos/courses/${courseCode}/`);
        const data = await res.json();
        console.log("API RESPONSE:", data);
        setVideos(data.videos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [courseCode, authLoading, user, navigate, location.pathname]);

  if (loading) {
    return <div className="pt-28 text-center">Loading...</div>;
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold text-primary mb-6">
          Course Videos
        </h1>

        {videos.length === 0 ? (
          <p className="text-gray-500">No videos available for this course.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-4"
              >
                <h3 className="font-semibold mb-3">{video.title}</h3>

                <iframe
                  className="w-full rounded-lg"
                  height="200"
                  src={`https://drive.google.com/file/d/${video.drive_id}/preview`}
                  allow="autoplay"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseVideos;
