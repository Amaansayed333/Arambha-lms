import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

const AdminDebug = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkVideos = async () => {
      try {
        setLoading(true);
        const videosRef = collection(db, 'videos');
        const snapshot = await getDocs(videosRef);
        
        console.log('Total videos in Firestore:', snapshot.size);
        console.log('Documents:', snapshot.docs);
        
        const videosList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setVideos(videosList);
        
        if (videosList.length === 0) {
          setError('❌ No videos found in Firestore!');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    checkVideos();
  }, []);

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">🔍 Debug: Firestore Videos</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        )}

        {videos.length > 0 && (
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-bold">✅ Found {videos.length} videos</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📋 All Videos in Database:</h2>
          
          {videos.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="inline-block text-red-600 mb-2" size={40} />
              <p className="text-red-600 font-semibold">No videos found</p>
              <p className="text-gray-600 text-sm mt-2">Videos collection is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((video, idx) => (
                <div key={idx} className="border-l-4 border-blue-600 p-4 bg-blue-50 rounded">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-bold">Title:</p>
                      <p className="text-gray-900">{video.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-bold">Course Code:</p>
                      <p className="text-gray-900 font-mono text-lg">{video.courseCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-bold">Drive File ID:</p>
                      <p className="text-gray-900 font-mono break-all">{video.driveFileId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-bold">Created By:</p>
                      <p className="text-gray-900">{video.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-bold">Upload Time:</p>
                      <p className="text-gray-900">{video.uploadedAt?.toDate?.()?.toString() || video.uploadedAt}</p>
                    </div>
                  </div>

                  {/* Status Check */}
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    {video.courseCode?.toLowerCase() === 'c1' ? (
                      <p className="text-green-700 text-sm font-bold">✅ Will show for c1 course</p>
                    ) : (
                      <p className="text-red-700 text-sm font-bold">❌ Course code mismatch!</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Problem Guide */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6">
          <h3 className="font-bold text-yellow-900 mb-3">🔧 Common Issues:</h3>
          <ul className="text-yellow-800 space-y-2 list-disc list-inside">
            <li><span className="font-bold">DriveFileId is a FOLDER</span> - Must be a FILE ID for iframe embedding</li>
            <li><span className="font-bold">uploadedAt has wrong format</span> - Should be Firestore timestamp</li>
            <li><span className="font-bold">courseCode case mismatch</span> - Must be lowercase (c1, not C1)</li>
            <li><span className="font-bold">Security rules blocking reads</span> - Check Firestore rules</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminDebug;
