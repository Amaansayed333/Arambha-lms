import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

const CourseVideos = () => {
  const { courseCode } = useParams();

  const [videos, setVideos] = useState([]);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading: authLoading } = useAuth();

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

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [courseCode, authLoading, user, navigate, location.pathname]);

  // Mark video completed
  const markComplete = async (driveId) => {

  try {

    await fetch("http://127.0.0.1:8000/api/videos/video-complete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        user_uid: user?.uid,
        drive_id: driveId
      })
    });

    setCompletedVideos(prev => [...prev, driveId]);

    // Open a placeholder window immediately to avoid popup blocking
    let certWin = null;
    try {
      certWin = window.open("", "_blank");
    } catch (e) {
      certWin = null;
    }

    const completionData = await checkCourseCompletion(); // important

    if (completionData && completionData.course_completed) {
      setCourseCompleted(true);
      // finalize download in the placeholder window if available
      const url = `http://127.0.0.1:8000/api/videos/generate-certificate/${user?.uid}/${courseCode}/`;
      if (certWin) {
        certWin.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    } else {
      if (certWin) certWin.close();
    }

  } catch (err) {
    console.error(err);
  }

};

  // Check course completion
  const checkCourseCompletion = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/videos/course-complete/${user?.uid}/${courseCode}/`
      );

      const data = await res.json();

      if (data.course_completed) {
        setCourseCompleted(true);
        try {
          if (user && user.uid) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
              completedCourses: arrayUnion(courseCode),
            });
          }
        } catch (e) {
          console.error("Failed to update Firestore completedCourses:", e);
        }
      }

      return data;

    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Generate certificate
  const generateCertificate = () => {

    if (!user || !user.uid) return;

    window.open(
      `http://127.0.0.1:8000/api/videos/generate-certificate/${user.uid}/${courseCode}/`,
      "_blank"
    );

};

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
          <p className="text-gray-500">
            No videos available for this course.
          </p>
        ) : (

          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {videos.map((video, idx) => (

                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl shadow-md p-4"
                >
                  <h3 className="font-semibold mb-3">
                    {video.title}
                  </h3>

                  <iframe
                    className="w-full rounded-lg"
                    height="200"
                    src={`https://drive.google.com/file/d/${video.drive_id}/preview`}
                    allow="autoplay"
                  />

                  <button
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    disabled={completedVideos.includes(video.drive_id)}
                    onClick={() => markComplete(video.drive_id)}
                  >
                    {completedVideos.includes(video.drive_id)
                      ? "Completed ✓"
                      : "Mark as Completed"}
                  </button>

                </div>

              ))}

            </div>

            {courseCompleted && (

              <div className="mt-12 text-center">

                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  🎉 Course Completed
                </h2>

                <button
                  onClick={generateCertificate}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Generate Certificate
                </button>

              </div>

            )}

          </>

        )}

      </div>
    </div>
  );
};

export default CourseVideos;