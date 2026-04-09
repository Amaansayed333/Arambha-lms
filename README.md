# Arambha LMS

A learning management system (LMS) combining a React frontend (Vite) with a Django backend API. The project uses Firebase Authentication + Firestore for user data and Google Drive + ReportLab for video storage and certificate generation.

---

## Quick summary

- Frontend: React (Vite), Firebase Auth & Firestore, pages for signup, programs, course videos, and certificate flow.
- Backend: Django REST-style endpoints (simple function views) under `/api/videos/` managing videos, progress and certificate generation.
- Integrations: Google Drive for storing video files, Firebase (Firestore) for user state, ReportLab for PDF certificate generation.

---

## Repo layout (key files)

- frontend / React
  - `src/` — React source
    - `pages/CourseVideos.jsx` — course player, mark-complete flow, Firestore update, triggers certificate download
    - `pages/ProgramDetails.jsx` — enrollment flow (updates Firestore `enrolledCourses`)
    - `pages/Signup.jsx` — Firebase signup and initial user doc creation in Firestore
    - `context/AuthContext.jsx` — Firebase auth provider
    - `firebase/firebase.js` — Firebase config, exports `auth` and `db`

- backend / Django
  - `backend/videos/models.py` — `Video` and `VideoProgress` models
  - `backend/videos/views.py` — main API endpoints (upload, list, mark complete, course-complete, generate-certificate)
  - `backend/videos/urls.py` — routes for the above endpoints
  - `backend/videos/utils_certificate.py` — PDF generation using ReportLab
  - `backend/config/settings.py` — Django settings (SQLite, MEDIA_ROOT, COURSE_FOLDER_MAP)

---

## Features — Frontend (summary)

- Firebase Authentication for user sign-up and sign-in.
- Firestore `users` collection to store user metadata. Document ID = `user.uid` (Firebase UID).
  - Typical fields written at signup: `uid`, `email`, `firstName`, `lastName`, `phone`, `role`, `enrolledCourses`, `createdAt`.
- Enrollment: `ProgramDetails.jsx` updates `users/<uid>.enrolledCourses` using `arrayUnion`.
- Video completion flow (in `CourseVideos.jsx`):
  1. User clicks `Mark as Completed` on a video.
  2. Frontend POSTs to backend `/api/videos/video-complete/` with `user_uid` and `drive_id`.
  3. Frontend then calls `/api/videos/course-complete/<user_uid>/<courseCode>/`.
  4. If response contains `course_completed: true` backend-side, frontend updates Firestore `users/<uid>.completedCourses` with `arrayUnion(courseCode)` and opens certificate download.

---

## Features — Backend (detailed)

The Django backend exposes a small set of endpoints that work together to provide course/video management, progress tracking, and certificate generation.

Important models
- `Video` (fields):
  - `title` (str)
  - `course` (str) — course code (e.g., `C2`)
  - `drive_file_id` (str) — Google Drive file id
  - `uploaded_at` (datetime)

- `VideoProgress` (fields):
  - `user` (ForeignKey to Django `User`)
  - `video` (ForeignKey to `Video`)
  - `completed` (bool)
  - `watched_seconds` (int)
  - Unique constraint: `(user, video)`

API endpoints (under `/api/videos/`)
- `upload/` (POST)
  - Admin-protected (checks `X-Admin-Token` header for a secret) — uploads a video file to a Google Drive folder mapped by `COURSE_FOLDER_MAP` (in settings), creates a `Video` record with `drive_file_id`.

- `courses/<course_code>/` (GET)
  - Returns JSON list of videos for the given course code. Course code is normalized to uppercase on server side.

- `video-complete/` (POST)
  - Marks an individual video as completed.
  - Accepts either numeric `user_id` (Django PK), or `user_uid` (string) or `user_email` (string) — the view attempts to resolve a Django `User` using the identifier.
  - Requires `drive_id` to resolve the `Video`.
  - Creates/updates `VideoProgress(user, video)` and sets `completed = True`.

- `course-complete/<user_identifier>/<course_code>/` (GET)
  - Resolves the user by `user_identifier` which can be numeric id, Django username (the app expects the `username` to be the Firebase UID in many cases), or email.
  - Counts total videos for the course and completed videos for the resolved user.
  - Returns JSON: `{ course, completed_videos, total_videos, course_completed, user_id }` where `course_completed` is boolean.

- `generate-certificate/<user_identifier>/<course_code>/` (GET)
  - Resolves user the same way as `course-complete`.
  - Verifies the course is fully completed (all videos marked completed).
  - Uses ReportLab to generate a simple PDF certificate (stored in `MEDIA_ROOT`) and returns it as a `FileResponse`.
  - The certificate generation function accepts a `name` (the code uses the user's first-name, falls back to full name or username), and creates a PDF named `<name>_<course>_certificate.pdf` in `MEDIA_ROOT`.

Integration details
- Google Drive: `upload_video` uses a Drive API client (helper in `google_drive_oauth.py`) to upload files to a course-specific folder defined by `COURSE_FOLDER_MAP` environment variables.
- ReportLab: produces PDF certificates saved under `MEDIA_ROOT`.
- Firestore: backend does not write to Firestore — the frontend writes to Firestore when the backend confirms course completion.

Important implementation notes & caveats
- User identity: the frontend uses Firebase Auth and Firestore; the Django backend uses Django `User` model for `VideoProgress`. The code resolves users by either numeric id, `username` (treated as Firebase UID), or `email`. For the system to work end-to-end, Django `User` objects must exist that correspond to the Firebase users (e.g., `username` stores the Firebase UID) or a sync endpoint must be used.
- Security: current endpoints accept client-provided identifiers and are not protected by token verification. For production you should verify Firebase ID tokens server-side (e.g., using google-auth or firebase-admin) and map the token to a Django user.
- File handling: `generate_certificate` writes PDF into `MEDIA_ROOT` and returns it; make sure `MEDIA_ROOT` exists and permissions are correct. Also consider cleaning old certificates.
- CORS: `CORS_ALLOW_ALL_ORIGINS = True` in settings (convenient for dev, not safe for production).

---

## Setup & run (development)

Prerequisites
- Node.js + npm (for frontend)
- Python 3.11+, virtualenv (backend)
- Google Cloud credentials for Drive API and required environment variables
- Firebase project configured (Firebase config is present in `src/firebase/firebase.js`)

Frontend

1. From project root:

```bash
cd src
npm install
npm run dev
```

2. Open the Vite dev URL (usually `http://localhost:5173`).

Backend

1. Create and activate virtualenv (example):

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate   # Windows
pip install -r requirements.txt  # if available, or install Django, reportlab, google-api-python-client, python-dotenv
```

2. Set environment variables (example `.env` keys used in `settings.py`):

- `COURSE1_FOLDER_ID`, `COURSE2_FOLDER_ID`, etc. — Google Drive folder IDs for courses.

3. Run Django dev server:

```bash
python manage.py migrate
python manage.py runserver
```

Notes: You may need to install `reportlab` (used for PDFs) and configure Google Drive credentials under `backend/oauth_client.json`.

---

## End-to-end flow (example)

1. User signs up via frontend (`/signup`) — Firebase Authentication creates a user and frontend writes a Firestore document at `users/<uid>` with basic info.
2. User enrolls (frontend writes `enrolledCourses` in Firestore) and navigates to course videos.
3. For each video the user clicks `Mark as Completed`:
   - Frontend POSTs to backend `/api/videos/video-complete/` with `user_uid` and `drive_id`.
   - Frontend requests `/api/videos/course-complete/<user_uid>/<courseCode>/`.
   - If `course_completed: true`, frontend calls Firestore `updateDoc(userRef, { completedCourses: arrayUnion(courseCode) })` and opens `/api/videos/generate-certificate/<user_uid>/<courseCode>/` to download certificate PDF.

---

## Troubleshooting & common fixes

- 404 / User not found: Ensure a matching Django `User` exists. Quick fix: create a Django user with `username` equal to Firebase UID or use a backend sync endpoint.
- Certificate not downloading: Some browsers block popups. The frontend opens a placeholder window on the button click then navigates it to the certificate URL after the backend confirms completion to avoid popup blocking.
- Permissions errors writing PDF: Ensure `MEDIA_ROOT` exists and Django process has write permission.
- Drive upload errors: verify `oauth_client.json` and the drive folder IDs in environment variables.

---

## Security & next improvements (recommended)

1. Implement Firebase ID token verification in Django. Validate tokens server-side and map to Django users instead of trusting client-provided identifiers.
2. Add a user-sync endpoint: when a user signs up in Firebase, call the backend to create/update the Django `User` record (store Firebase UID in `username`).
3. Add authentication for administrative endpoints (video upload) — do not rely on a static header token in production.
4. Sanitize and rotate certificate filenames and optionally stream PDFs directly without saving to disk.
5. Add tests for the full flow and CI checks.

---

If you'd like, I can add the backend user-sync endpoint now and update the frontend `Signup.jsx` to call it so Django `User` records are created automatically when users sign up.

---

© Arambha LMS — local development README
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



------------------------------------------
-----------------------------------------

I'll scan the repo for key frontend, backend, and integration files, then summarize architecture and notable behaviors.

Search complete: Repo-wide scan to gather files and code snippets for a high-level summary.

Searched for files matching `**/package.json`, 1 match

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/package.json)

Searched for files matching `**/requirements*.txt`, no matches

Searched for regex `firebase|CourseVideos|ProgramDetails|Signup|Course Videos|Program Details|signup|CourseVideos.jsx|ProgramDetails.jsx|Signup.jsx`, 100 results

Starting: *Test in browser (mark video completed -> Firestore updated)* (2/4)

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/backend/config/settings.py)

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/backend/videos/models.py)

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/backend/videos/utils_certificate.py)

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/src/firebase/firebase.js)

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/src/pages/ProgramDetails.jsx)

Read [](file:///c%3A/Users/amaan/Desktop/ARAMBHA_LMS_1/src/pages/Signup.jsx)

Completed: *Create repo summary* (4/4)

Quick repo summary — what I read and key findings:

- Frontend (React + Firebase)
  - CourseVideos.jsx — loads course videos, marks video complete, calls backend `/video-complete/` and `/course-complete/<user_uid>/<courseCode>/`, updates Firestore `users/<uid>.completedCourses` with `arrayUnion`, and opens certificate URL when course completes. CourseVideos.jsx
  - AuthContext.jsx — Firebase auth provider, exposes `user` and `loading`. AuthContext.jsx
  - firebase.js — Firebase config and exports `auth` and `db`. firebase.js
  - ProgramDetails.jsx — enrollment logic: updates Firestore `users/<uid>.enrolledCourses` with `arrayUnion`. ProgramDetails.jsx
  - Signup.jsx — creates Firebase auth user and writes a Firestore `users/<uid>` doc with `firstName`, `lastName`, `email`, `role`, `enrolledCourses`. Signup.jsx
  - Frontend uses hardcoded backend base URLs (`http://127.0.0.1:8000`) and opens certificate in new tab to trigger download.

- Backend (Django)
  - models.py — `Video` and `VideoProgress` models. `VideoProgress` links to Django `User`. models.py
  - views.py — APIs:
    - `upload_video`, `list_videos_by_course`, `mark_video_complete` (accepts `user_id`/`user_uid`/`user_email`), `check_course_completion` (accepts `user_identifier`), `generate_certificate_view` (accepts `user_identifier`). Certificate is generated via `reportlab` and returned as `FileResponse`. views.py
  - utils_certificate.py — builds a simple PDF certificate using the provided name and course; saved to `MEDIA_ROOT`. utils_certificate.py
  - settings.py — SQLite DB, `COURSE_FOLDER_MAP` from env, CORS allowed all origins, includes `corsheaders`. settings.py
  - URLs: urls.py exposes the API paths under `/api/videos/`.

- Integrations
  - Firebase Firestore: frontend stores user documents in `users` collection with `enrolledCourses` and (now) `completedCourses`.
  - Google Drive: backend uploads videos to Google Drive (Drive API) and stores `drive_file_id` in `Video`.
  - ReportLab: backend generates PDF certificates in `MEDIA_ROOT`.

- Recent changes I made
  - Frontend: Firestore update on course completion, send `user_uid` instead of hardcoded `1`, placeholder window to avoid popup-blocking during certificate download.
  - Backend: accept string `user_identifier` (uid/email/PK), resolve `User`, use first name for certificate, improved error handling and fixed syntax errors.

- Notable concerns & next actions (high priority)
  - User sync mismatch: frontend uses Firebase Auth users and writes Firestore docs, but Django `User` table is not automatically populated. Backend resolves users via `username==firebaseUid` or `email`. Unless you create Django `User` records (or set `username` to the Firebase UID), `mark_video_complete` and certificate generation will fail to find a `User`. Options:
    - Create a lightweight sync endpoint to create/update a Django `User` when a user signs up (call it from frontend Signup).
    - Or change backend to avoid requiring Django `User` for progress storage (store progress keyed by Firebase UID instead).
  - Authentication & security: APIs are currently unauthenticated and use client-sent identifiers. Consider verifying Firebase ID tokens in backend for secure operations.
  - File permissions & cleanup: `generate_certificate` writes to `MEDIA_ROOT` — ensure the directory exists and old PDFs are cleaned up periodically.
  - Hardcoded localhost URLs: replace with env-based base URL or proxy via Vite for consistency across environments.
  - Filename safety: certificate filename uses raw username; sanitize to avoid unsafe filesystem names.
  - Tests: run full flow (signup → enroll → watch/mark all videos → certificate). I left the `Test in browser` todo in progress.

If you want, I can:
- Add a backend endpoint to create/sync a Django `User` from Firebase UID + email (recommended), and call it from Signup.jsx.
- Implement Firebase ID token verification in Django before accepting `video-complete` and `generate-certificate`.
- Replace hardcoded API base URLs with a single configurable variable.

Which of the above next actions should I do first?

