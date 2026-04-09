# Firestore Security Rules

This document contains the security rules that replace all Django backend authentication logic.

## ⚠️ IMPORTANT: How to Apply These Rules

1. Go to Firebase Console → Your Project → Firestore Database
2. Click "Rules" tab
3. Replace the existing rules with the code below
4. Click "Publish"

## 🔒 Complete Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ═══════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS (MUST BE FIRST)
    // ═══════════════════════════════════════════════════════════════
    
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && 
             request.auth.token.admin == true;
    }
    
    function isOwnUser(uid) {
      return request.auth.uid == uid;
    }
    
    // ═══════════════════════════════════════════════════════════════
    // USERS COLLECTION
    // Allow users to read/write only their own data
    // ═══════════════════════════════════════════════════════════════
    
    match /users/{uid} {
      
      // User can read and write their own document
      allow read, write: if isOwnUser(uid);
      
      // Admin can read any user document
      allow read: if isAdmin();
      
      // ─────────────────────────────────────────────────────────────
      // USER'S VIDEO PROGRESS SUBCOLLECTION
      // ─────────────────────────────────────────────────────────────
      
      match /videoProgress/{progressDoc} {
        
        // User can read their own progress
        allow read: if isOwnUser(uid);
        
        // User can create progress entry (mark video as completed)
        allow create: if isOwnUser(uid) &&
                         request.resource.data.completed == true &&
                         request.resource.data.videoId != "" &&
                         request.resource.data.courseCode != "";
        
        // User can update their own progress
        allow update: if isOwnUser(uid);
        
        // User can list their progress
        allow list: if isOwnUser(uid);
      }
    }
    
    // ═══════════════════════════════════════════════════════════════
    // VIDEOS COLLECTION
    // All authenticated users can read videos
    // Only admins can create/update videos
    // ═══════════════════════════════════════════════════════════════
    
    match /videos/{videoDoc} {
      
      // Authenticated users can list and read all videos
      allow read, list: if isSignedIn();
      
      // Only admins can create videos
      allow create: if isAdmin() &&
                       request.resource.data.courseCode != "" &&
                       request.resource.data.driveFileId != "" &&
                       request.resource.data.title != "";
      
      // Only admins can update videos
      allow update: if isAdmin();
      
      // Only admins can delete videos
      allow delete: if isAdmin();
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ADMIN CONFIG
    // Only admins can read/write admin configuration
    // ═══════════════════════════════════════════════════════════════
    
    match /adminConfig/{document=**} {
      
      // Only admins can read
      allow read: if isAdmin();
      
      // Only admins can write
      allow write: if isAdmin();
    }
    
    // ═══════════════════════════════════════════════════════════════
    // CERTIFICATES (Optional Collection for Audit Trail)
    // ═══════════════════════════════════════════════════════════════
    
    match /certificates/{certDoc} {
      
      // User can read their own certificates
      allow read: if isSignedIn() && 
                     resource.data.userId == request.auth.uid;
      
      // Frontend can create when certificate generated
      allow create: if isSignedIn() &&
                       request.resource.data.userId == request.auth.uid;
      
      // Admin can view/manage all certificates
      allow read, list: if isAdmin();
      allow update, delete: if isAdmin();
    }
    
    // ═══════════════════════════════════════════════════════════════
    // DEFAULT: DENY ALL (Security Best Practice)
    // ═══════════════════════════════════════════════════════════════
    
    match /{document=**} {
      allow read, write: false;
    }
  }
}
```

---

## 🔐 How It Works: Rule Breakdown

### 1. **User Documents** (`/users/{uid}`)
- User can **read only their own** document
- User can **create** their document during signup
- User can **update** their own document (enrolledCourses, completedCourses)
- Admin can **read any** user document

### 2. **Video Progress** (`/users/{uid}/videoProgress/{doc}`)
- User can **create** a progress entry (mark video complete)
- User can **read** their own progress
- User can **update** their progress (recount watched seconds, etc.)
- Only the document owner (by UID) can access

### 3. **Videos Collection** (`/videos/{doc}`)
- **All authenticated users** can read/list videos
- **Only admins** can create new videos
- **Only admins** can update/delete videos

### 4. **Admin Config** (`/adminConfig/{doc}`)
- **Only admins** can read/write
- Stores course-to-drive-folder mappings

---

## 👤 How to Make Users Admin

To make a user an admin (so they can upload videos):

### Option 1: Firebase Console (Easy)
1. Go to Firebase Console → Authentication → Users
2. Find the admin user
3. Click on their UID
4. Scroll to "Custom Claims"
5. Paste: `{ "admin": true }`
6. Save

### Option 2: Firebase Admin SDK (Programmatic)
```javascript
// In Node.js backend or Cloud Function
import admin from 'firebase-admin';

const uid = "user-123";
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

### Option 3: Simple Admin Setup Script
```javascript
// Run once in browser console (if you're admin in Firebase)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

// This requires a Cloud Function to execute safely
```

---

## 🧪 Testing the Rules

### Test Case 1: Regular User Marking Video Complete ✅
```javascript
// This should WORK (user is authenticated)
await addDoc(collection(db, `users/${currentUser.uid}/videoProgress`), {
  videoId: "video-123",
  courseCode: "c1",
  completed: true,
  completedAt: serverTimestamp()
});
```

### Test Case 2: User Trying to Modify Another User's Progress ❌
```javascript
// This should FAIL (different UID in path)
await addDoc(collection(db, `users/someone-else-uid/videoProgress`), {
  videoId: "video-123",
  completed: true
});
```

### Test Case 3: Non-Admin Trying to Create Video ❌
```javascript
// This should FAIL (no admin claim)
await addDoc(collection(db, 'videos'), {
  title: "Hacked Video",
  courseCode: "c1",
  driveFileId: "xyz"
});
```

### Test Case 4: Admin Creating Video ✅
```javascript
// This should WORK (admin user with custom claim)
await addDoc(collection(db, 'videos'), {
  title: "New Course Video",
  courseCode: "c1",
  driveFileId: "drive-file-id",
  uploadedAt: serverTimestamp(),
  createdBy: currentUser.uid
});
```

---

## 🚨 Common Issues & Solutions

### Issue: "Permission denied" when user tries to mark video complete

**Cause**: User might not be in `/users/{uid}` collection yet

**Solution**:
1. Make sure signup creates the user document (it does in your code)
2. Check Firestore has document at `users/{UID}` with `uid` field matching the document ID

### Issue: Admin can't create videos

**Cause**: Custom claim not set or not included in ID token

**Solution**:
1. Verify custom claim is set via Firebase Console
2. Force token refresh: `await currentUser.getIdToken(true);`
3. Wait 5-10 minutes for propagation

### Issue: Everyone can see all users' data

**Cause**: Rule allows reading if any authenticated user

**Solution**: 
This is intentional - all students should see the same videos. If you want to hide certain users' data, add additional restrictions to the rules.

---

## 📋 Required Firestore Setup Checklist

Before deploying these rules:

- [ ] Create collection `users` (auto-created when first user signs up)
- [ ] Create collection `videos` (manual: add at least one video for testing)
- [ ] Create collection `adminConfig` with document `courseFolders`
- [ ] Set at least one admin user via Firebase Console
- [ ] Test with test user account before going live

---

## ✅ Firestore Collections Structure

Create these collections manually or they'll auto-create:

```
Firestore Structure:
├── users/
│   └── {uid} (auto-creates at signup)
│       ├── uid: string
│       ├── email: string
│       ├── firstName: string
│       ├── lastName: string
│       ├── enrolledCourses: array
│       ├── completedCourses: array
│       └── videoProgress/
│           └── {docId} (auto-creates when marking complete)
│
├── videos/ (CREATE MANUALLY)
│   └── {docId}
│       ├── title: string
│       ├── courseCode: string
│       ├── driveFileId: string
│       ├── uploadedAt: timestamp
│       └── createdBy: string
│
└── adminConfig/ (CREATE MANUALLY)
    └── courseFolders
        ├── c1: "drive-folder-id-123"
        ├── c2: "drive-folder-id-456"
        └── ...
```

---

## 🔄 Migration from Django Auth

**What was in Django**: SQL checks for user, custom token validation

**What's in Firestore Rules**: Same logic, enforced by Firebase!

| Operation | Django | Firestore Rules |
|-----------|--------|-----------------|
| User reads own data | Django API call | Firestore read with `isOwnUser(uid)` |
| Mark video complete | Django check user exists | Firestore `isOwnUser(uid)` |
| Create video (admin) | Django token check | Firestore `isAdmin()` check |
| Deny unauthorized access | Django 403 error | Firestore 403 (silently denied) |

---

## 🎯 Summary

These rules **completely replace** the Django backend:
- ✅ No server-side user validation needed
- ✅ Firestore enforces permissions automatically
- ✅ Same security as before, but decentralized
- ✅ Works for all operations: read, write, delete

**Next Step**: Apply these rules to your Firebase Console under Firestore → Rules tab.
