import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

// ✅ TRACKING: Import tracking functions
import {
  saveCurrentVideoProgress,
  getCurrentVideoProgress,
  clearCurrentVideoProgress,
  getCompletedVideoIds
} from "../utils/firestoreQueries";

const CourseVideos = () => {
  const { courseCode } = useParams();

  const [videos, setVideos] = useState([]);
  const [completedDriveIds, setCompletedDriveIds] = useState([]);
  const [completedVideos, setCompletedVideos] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ TRACKING: State for resume functionality
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [timeWatched, setTimeWatched] = useState(0);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // ✅ UI: State to show loading when marking video complete
  const [markingVideoId, setMarkingVideoId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading: authLoading } = useAuth();

  // -----------------------------
  // LOAD PAGE
  // -----------------------------

  useEffect(() => {
    const run = async () => {
      if (authLoading) return;

      if (!user) {
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      try {
        // Check enrollment
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        const enrolled = userSnap.exists()
          ? userSnap.data().enrolledCourses || []
          : [];

        if (!enrolled.includes(courseCode)) {
          navigate("/programs");
          return;
        }

        // Fetch videos
        const res = await fetch(
          `http://127.0.0.1:8000/api/videos/courses/${courseCode}/`
        );

        const data = await res.json();

        setVideos(data.videos || []);
        setTotalVideos((data.videos || []).length);

        // initial completion check
        const init = await checkCourseCompletion();
        if (init) {
          setCompletedVideos(init.completed_videos || 0);
          setTotalVideos(init.total_videos || 0);
          setCourseCompleted(init.course_completed || false);
          
          // ✅ NEW: Load list of completed drive IDs from Firestore
          console.log('📥 Fetching completed video IDs...');
          const completedIds = await getCompletedVideoIds(user.uid, courseCode);
          console.log('✅ Completed IDs loaded:', completedIds);
          setCompletedDriveIds(completedIds);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [courseCode, authLoading, user, navigate, location.pathname]);

  // ═══════════════════════════════════════════════════════════════
  // ✅ TRACKING: Load saved progress when videos load
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    if (videos.length === 0 || !user) return;

    const loadSavedProgress = async () => {
      try {
        const savedProgress = await getCurrentVideoProgress(user.uid, courseCode);
        
        if (savedProgress && savedProgress.videoIndex !== null) {
          console.log('✅ Loading saved progress:', savedProgress);
          setCurrentVideoIndex(savedProgress.videoIndex);
          setTimeWatched(savedProgress.timeWatched || 0);
          setCurrentVideoId(savedProgress.videoId);
          
          // Resume playback from saved time (will be handled in video element)
        }
      } catch (err) {
        console.warn('⚠️ Could not load saved progress:', err);
      }
    };

    loadSavedProgress();
  }, [videos, user, courseCode]);

  // ═══════════════════════════════════════════════════════════════
  // ✅ TRACKING: Auto-save progress every 5 seconds
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!user || videos.length === 0 || courseCompleted) return;

    const interval = setInterval(async () => {
      if (videos[currentVideoIndex]) {
        const video = videos[currentVideoIndex];
        await saveCurrentVideoProgress(
          user.uid,
          courseCode,
          video.drive_id || video.id,
          currentVideoIndex,
          timeWatched
        );
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [user, courseCode, videos, currentVideoIndex, timeWatched, courseCompleted]);

  // ═══════════════════════════════════════════════════════════════
  // ✅ TRACKING: Save progress on unmount (when leaving page)
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    return () => {
      if (user && videos[currentVideoIndex] && !courseCompleted) {
        const video = videos[currentVideoIndex];
        saveCurrentVideoProgress(
          user.uid,
          courseCode,
          video.drive_id || video.id,
          currentVideoIndex,
          timeWatched
        ).catch(err => console.warn('⚠️ Could not save final progress:', err));
      }
    };
  }, [user, videos, currentVideoIndex, timeWatched, courseCode, courseCompleted]);

  // ═══════════════════════════════════════════════════════════════
  // ✅ TRACKING: Handle video interaction
  // ═══════════════════════════════════════════════════════════════
  const handleVideoInteraction = (index, videoId) => {
    setCurrentVideoIndex(index);
    setCurrentVideoId(videoId);
    setTimeWatched(0); // Reset time when switching videos
  };

  const markComplete = async (driveId) => {

    try {
      console.log('📤 Marking complete for drive_id:', driveId);
      console.log('👤 User email:', user?.email);
      console.log('⚠️ User object:', user);
      
      if (!user?.email) {
        alert('❌ Error: User not logged in or email not found');
        setMarkingVideoId(null);
        return;
      }

      setMarkingVideoId(driveId);  // ✅ Show loading state

      const bodyParams = new URLSearchParams({
        user_email: user.email,
        drive_id: driveId
      });
      
      console.log('📨 Request body params:', bodyParams.toString());

      const res = await fetch(
        "http://127.0.0.1:8000/api/videos/video-complete/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: bodyParams
        }
      );

      console.log('📥 Response status:', res.status);

      const resJson = await res.json();
      console.log('📥 Response data:', resJson);

      if (!res.ok) {
        console.error('❌ Mark complete failed:', resJson);
        alert('Failed to mark complete: ' + (resJson.error || resJson.message || 'Unknown error'));
        setMarkingVideoId(null);  // ✅ Clear loading state
        return;
      }

      console.log('✅ Video marked complete successfully');
      setCompletedDriveIds(prev => [...prev, driveId]);

      let certWin = window.open("", "_blank");

      const completionData = await checkCourseCompletion();
      console.log('📊 Completion data:', completionData);

      if (completionData?.course_completed) {
        console.log('🎓 Course completed! Generating certificate...');
        const url =
          `http://127.0.0.1:8000/api/videos/generate-certificate/${user.email}/${courseCode}/`;

        certWin.location.href = url;
      } else {
        certWin.close();
        alert('Video marked complete! Complete all videos to get your certificate.');
        
        // ✅ REFRESH: Reload completed videos list from Firestore
        const updatedIds = await getCompletedVideoIds(user.uid, courseCode);
        console.log('🔄 Refreshed completed video IDs:', updatedIds);
        setCompletedDriveIds(updatedIds);
      }

      setMarkingVideoId(null);  // ✅ Clear loading state

    } catch (err) {
      console.error('❌ Error marking complete:', err);
      alert('Error: ' + err.message);
      setMarkingVideoId(null);  // ✅ Clear loading state on error
    }

  };



  // -----------------------------
  // CHECK COURSE COMPLETE
  // -----------------------------

  const checkCourseCompletion = async () => {

    try {

      const res = await fetch(
        `http://127.0.0.1:8000/api/videos/course-complete/${user.email}/${courseCode}/`
      );

      const data = await res.json();

      if (data.completed_videos !== undefined)
        setCompletedVideos(data.completed_videos);

      if (data.total_videos !== undefined)
        setTotalVideos(data.total_videos);

      if (data.course_completed) {

        setCourseCompleted(true);

        // update firestore
        const userRef = doc(db, "users", user.uid);

        await updateDoc(userRef, {
          completedCourses: arrayUnion(courseCode),
        });

      }

      return data;

    } catch (err) {
      console.error(err);
      return null;
    }

  };



  // -----------------------------
  // MANUAL CERTIFICATE
  // -----------------------------

  const generateCertificate = () => {

    window.open(
      `http://127.0.0.1:8000/api/videos/generate-certificate/${user.email}/${courseCode}/`,
      "_blank"
    );

  };



  // -----------------------------
  // UI
  // -----------------------------

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-6xl px-4">
          {/* Loading title */}
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          
          {/* Loading progress bar */}
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          
          {/* Loading video cards */}
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-40 bg-slate-200 rounded-lg"></div>
                <div className="h-10 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4">

        {/* Animated Title */}
        <h1 className="text-4xl font-bold mb-2 text-blue-950 animate-fade-in">
          Course Videos
        </h1>
        
        {/* Animated Progress Counter */}
        <div className="mb-8 animate-fade-in-delay-1">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="font-semibold text-lg">
              ✓ Completed: <span className="animate-pulse">{completedVideos}</span> / {totalVideos}
            </p>
          </div>
        </div>

        {/* Animated Video Grid with Stagger Effect */}
        <div className="grid grid-cols-3 gap-6 animate-fade-in-delay-2">

          {videos.map((video, i) => (

            <div 
              key={i} 
              className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-transparent hover:border-blue-400 animate-fade-in-stagger`}
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => handleVideoInteraction(i, video.drive_id || video.id)}
            >

              {/* Video Title */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
                <h3 className="font-semibold text-blue-950 line-clamp-2 hover:text-blue-600 transition-colors">{video.title}</h3>
              </div>

              {/* Video Iframe */}
              <div className="relative overflow-hidden bg-black h-200 group">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://drive.google.com/file/d/${video.drive_id}/preview`}
                  className="transition-transform duration-300 group-hover:scale-110"
                  onClick={() => handleVideoInteraction(i, video.drive_id || video.id)}
                />
              </div>

              {/* Animated Button */}
              <div className="p-4">
                <button
                  onClick={() => markComplete(video.drive_id)}
                  disabled={completedDriveIds.includes(video.drive_id) || markingVideoId === video.drive_id}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    completedDriveIds.includes(video.drive_id)
                      ? 'bg-green-600 text-white cursor-default shadow-lg'
                      : markingVideoId === video.drive_id
                      ? 'bg-yellow-500 text-white animate-pulse cursor-wait shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg cursor-pointer'
                  }`}
                >
                  {completedDriveIds.includes(video.drive_id)
                    ? '✅ Completed'
                    : markingVideoId === video.drive_id
                    ? '⏳ Marking...'
                    : 'Mark Complete'}
                </button>
              </div>

            </div>

          ))}

        </div>

        {/* Animated Certificate Button */}
        {courseCompleted && (

          <div className="mt-12 animate-fade-in-delay-3 flex justify-center">
            <button 
              onClick={generateCertificate}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
            >
              
              Download Certificate
            </button>
          </div>

        )}

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInStagger {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animate-fade-in-stagger {
          animation: fadeInStagger 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CourseVideos;