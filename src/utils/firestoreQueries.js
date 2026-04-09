/**
 * Firestore Query Helpers
 * All database operations for the LMS
 * Replaces Django backend API calls
 */

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  updateDoc,
  setDoc,
  doc,
  arrayUnion,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

// ═══════════════════════════════════════════════════════════════
// VIDEOS - List and Retrieve
// ═══════════════════════════════════════════════════════════════

/**
 * Get all videos for a specific course
 * @param {string} courseCode - e.g., "c1", "c2"
 * @returns {Promise<Array>} Array of video objects
 */
export const getVideosByCourseCode = async (courseCode) => {
  try {
    const videosRef = collection(db, 'videos');
    const q = query(videosRef, where('courseCode', '==', courseCode.toLowerCase()));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error('❌ Error fetching videos:', error);
    return [];
  }
};

/**
 * Get a single video by ID
 * @param {string} videoId - Firestore document ID
 * @returns {Promise<Object>} Video object
 */
export const getVideoById = async (videoId) => {
  try {
    const videoRef = doc(db, 'videos', videoId);
    const docSnap = await getDoc(videoRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('❌ Error fetching video:', error);
    return null;
  }
};

// ═══════════════════════════════════════════════════════════════
// VIDEO PROGRESS - Mark Complete and Track
// ═══════════════════════════════════════════════════════════════

/**
 * Mark a video as completed by a user
 * @param {string} userId - Firebase UID
 * @param {string} videoId - Firestore video document ID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<void>}
 */
export const markVideoComplete = async (userId, videoId, courseCode) => {
  try {
    const progressRef = collection(db, `users/${userId}/videoProgress`);
    
    await addDoc(progressRef, {
      videoId,
      courseCode: courseCode.toLowerCase(),
      completed: true,
      watchedSeconds: 0,
      completedAt: serverTimestamp(),
      markedAt: new Date().toISOString()
    });
    
    console.log('✅ Video marked as complete:', videoId);
  } catch (error) {
    console.error('❌ Error marking video complete:', error);
    throw error;
  }
};

/**
 * Get total number of videos in a course
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<number>} Total video count
 */
export const getTotalVideosForCourse = async (courseCode) => {
  try {
    const videosRef = collection(db, 'videos');
    const q = query(videosRef, where('courseCode', '==', courseCode.toLowerCase()));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('❌ Error getting total videos:', error);
    return 0;
  }
};

/**
 * Get number of completed videos for a user in a course
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<number>} Completed video count
 */
export const getCompletedVideosForUser = async (userId, courseCode) => {
  try {
    const progressRef = collection(db, `users/${userId}/videoProgress`);
    const q = query(
      progressRef,
      where('courseCode', '==', courseCode.toLowerCase()),
      where('completed', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('❌ Error getting completed videos:', error);
    return 0;
  }
};

/**
 * Check if a specific video is completed by user
 * @param {string} userId - Firebase UID
 * @param {string} videoId - Firestore video document ID
 * @returns {Promise<boolean>}
 */
export const isVideoCompletedByUser = async (userId, videoId) => {
  try {
    const progressRef = collection(db, `users/${userId}/videoProgress`);
    const q = query(
      progressRef,
      where('videoId', '==', videoId),
      where('completed', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.size > 0;
  } catch (error) {
    console.error('❌ Error checking video completion:', error);
    return false;
  }
};

/**
 * Get all completed videos for a user in a course
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<Array>} Array of completed video IDs
 */
export const getCompletedVideoIds = async (userId, courseCode) => {
  try {
    const progressRef = collection(db, `users/${userId}/videoProgress`);
    const q = query(
      progressRef,
      where('courseCode', '==', courseCode.toLowerCase()),
      where('completed', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data().videoId);
  } catch (error) {
    console.error('❌ Error getting completed video IDs:', error);
    return [];
  }
};

// ═══════════════════════════════════════════════════════════════
// COURSE COMPLETION - Check and Update
// ═══════════════════════════════════════════════════════════════

/**
 * Check if user completed a course
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<Object>} { completed_videos, total_videos, course_completed }
 */
export const checkCourseCompletion = async (userId, courseCode) => {
  try {
    const total = await getTotalVideosForCourse(courseCode);
    const completed = await getCompletedVideosForUser(userId, courseCode);
    
    return {
      courseCode: courseCode.toLowerCase(),
      completed_videos: completed,
      total_videos: total,
      course_completed: total > 0 && completed === total
    };
  } catch (error) {
    console.error('❌ Error checking course completion:', error);
    return {
      completed_videos: 0,
      total_videos: 0,
      course_completed: false
    };
  }
};

/**
 * Mark course as completed in user's Firestore document
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<void>}
 */
export const markCourseCompleted = async (userId, courseCode) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      completedCourses: arrayUnion(courseCode.toLowerCase())
    });
    console.log('✅ Course marked as completed:', courseCode);
  } catch (error) {
    console.error('❌ Error marking course completed:', error);
    throw error;
  }
};

// ═══════════════════════════════════════════════════════════════
// USER DATA - Get and Update
// ═══════════════════════════════════════════════════════════════

/**
 * Get user's Firestore document with all data
 * @param {string} userId - Firebase UID
 * @returns {Promise<Object>} User data
 */
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('❌ Error fetching user data:', error);
    return null;
  }
};

/**
 * Get user's enrolled courses
 * @param {string} userId - Firebase UID
 * @returns {Promise<Array>} Array of course codes
 */
export const getUserEnrolledCourses = async (userId) => {
  try {
    const userData = await getUserData(userId);
    return userData?.enrolledCourses || [];
  } catch (error) {
    console.error('❌ Error fetching enrolled courses:', error);
    return [];
  }
};

/**
 * Get user's completed courses
 * @param {string} userId - Firebase UID
 * @returns {Promise<Array>} Array of course codes
 */
export const getUserCompletedCourses = async (userId) => {
  try {
    const userData = await getUserData(userId);
    return userData?.completedCourses || [];
  } catch (error) {
    console.error('❌ Error fetching completed courses:', error);
    return [];
  }
};

// ═══════════════════════════════════════════════════════════════
// ADMIN - Video Management
// ═══════════════════════════════════════════════════════════════

/**
 * Create a new video record (Admin only)
 * Should be protected by Firestore security rules
 * @param {string} adminId - Firebase UID of admin
 * @param {Object} videoData - { title, courseCode, driveFileId, description }
 * @returns {Promise<string>} New video document ID
 */
export const createVideo = async (adminId, videoData) => {
  try {
    const videosRef = collection(db, 'videos');
    const docRef = await addDoc(videosRef, {
      ...videoData,
      courseCode: videoData.courseCode.toLowerCase(),
      uploadedAt: serverTimestamp(),
      createdBy: adminId
    });
    console.log('✅ Video created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating video:', error);
    throw error;
  }
};

/**
 * Get admin configuration (course folder mappings)
 * @returns {Promise<Object>} Admin config data
 */
export const getAdminConfig = async () => {
  try {
    const configRef = doc(db, 'adminConfig', 'courseFolders');
    const docSnap = await getDoc(configRef);
    return docSnap.exists() ? docSnap.data() : {};
  } catch (error) {
    console.error('❌ Error fetching admin config:', error);
    return {};
  }
};

// ═══════════════════════════════════════════════════════════════
// COURSE TRACKING - Resume functionality
// ═══════════════════════════════════════════════════════════════

/**
 * Save current video progress (for resume functionality)
 * ✅ Uses existing videoProgress collection (compatible with Firestore rules)
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @param {string} videoId - Current video ID
 * @param {number} videoIndex - Index in videos array (0, 1, 2, etc.)
 * @param {number} timeWatched - Seconds watched in current video
 * @returns {Promise<void>}
 */
export const saveCurrentVideoProgress = async (userId, courseCode, videoId, videoIndex, timeWatched) => {
  try {
    // Use courseCode_current as document ID in videoProgress collection
    const progressRef = doc(db, `users/${userId}/videoProgress`, `${courseCode.toLowerCase()}_current`);
    
    await setDoc(progressRef, {
      videoId,
      videoIndex,
      timeWatched: Math.round(timeWatched),
      courseCode: courseCode.toLowerCase(),
      lastUpdated: serverTimestamp(),
      isCurrentProgress: true
    }, { merge: true });
    
    console.log('✅ Progress saved:', { courseCode, videoId, videoIndex, timeWatched });
  } catch (error) {
    // Silently handle errors to not disrupt user experience
    console.warn('⚠️ Error saving progress:', error);
  }
};

/**
 * Get current video progress for a course (for resume)
 * ✅ Uses existing videoProgress collection (compatible with Firestore rules)
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<Object|null>} Progress object or null if not found
 */
export const getCurrentVideoProgress = async (userId, courseCode) => {
  try {
    const progressRef = doc(db, `users/${userId}/videoProgress`, `${courseCode.toLowerCase()}_current`);
    const docSnap = await getDoc(progressRef);
    
    if (docSnap.exists()) {
      console.log('✅ Progress retrieved:', docSnap.data());
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.warn('⚠️ Error getting progress:', error);
    return null;
  }
};

/**
 * Clear progress when course is completed
 * ✅ Uses existing videoProgress collection (compatible with Firestore rules)
 * @param {string} userId - Firebase UID
 * @param {string} courseCode - e.g., "c1"
 * @returns {Promise<void>}
 */
export const clearCurrentVideoProgress = async (userId, courseCode) => {
  try {
    const progressRef = doc(db, `users/${userId}/videoProgress`, `${courseCode.toLowerCase()}_current`);
    await setDoc(progressRef, {
      videoId: null,
      videoIndex: null,
      timeWatched: 0,
      courseCode: courseCode.toLowerCase(),
      lastUpdated: serverTimestamp(),
      isCurrentProgress: true
    }, { merge: true });
    console.log('✅ Progress cleared for course:', courseCode);
  } catch (error) {
    console.warn('⚠️ Error clearing progress:', error);
  }
};

export default {
  // Videos
  getVideosByCourseCode,
  getVideoById,
  
  // Progress
  markVideoComplete,
  getTotalVideosForCourse,
  getCompletedVideosForUser,
  isVideoCompletedByUser,
  getCompletedVideoIds,
  
  // Course Completion
  checkCourseCompletion,
  markCourseCompleted,
  
  // Course Tracking (Resume)
  saveCurrentVideoProgress,
  getCurrentVideoProgress,
  clearCurrentVideoProgress,
  
  // User Data
  getUserData,
  getUserEnrolledCourses,
  getUserCompletedCourses,
  
  // Admin
  createVideo,
  getAdminConfig
};
