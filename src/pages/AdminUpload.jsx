import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Button from '../components/ui/Button';

const AdminUpload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [driveId, setDriveId] = useState(null);

    const [accessGranted, setAccessGranted] = useState(false);

    // Form State
    const [courseCode, setCourseCode] = useState('C1');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token === 'arambha-admin-secret-123') {
            setAccessGranted(true);
        } else {
            navigate('/admin');
        }
    }, [navigate]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a video file.');
            return;
        }

        setLoading(true);
        setMessage(null);
        setError(null);
        setDriveId(null);

        const formData = new FormData();
        formData.append('video', file);
        formData.append('course_code', courseCode);
        formData.append('title', title);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://127.0.0.1:8000/api/videos/upload/', {
                method: 'POST',
                headers: {
                    'X-Admin-Token': token
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setDriveId(data.drive_file_id);
                // Reset form slightly
                setTitle('');
                setFile(null);
                // Clear file input
                document.getElementById('video-upload').value = '';
            } else {
                setError(data.error || 'Upload failed');
            }
        } catch (err) {
            console.error(err);
            setError('Network error occurred. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    if (!accessGranted) return null;

    return (
        <div className="min-h-screen bg-slate-50 py-24 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-primary p-6 text-white text-center">
                    <h1 className="text-2xl font-bold font-heading">Admin Video Upload</h1>
                    <p className="text-blue-100 text-sm mt-1">Upload course materials directly to Drive</p>
                </div>

                <div className="p-8">
                    {message && (
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                            <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="font-bold text-green-800">Upload Successful!</h3>
                                <p className="text-green-700 text-sm">{message}</p>
                                {driveId && (
                                    <div className="mt-2 bg-white px-3 py-2 rounded border border-green-200 text-xs font-mono text-gray-600 break-all">
                                        Drive ID: {driveId}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="text-red-600 shrink-0" size={20} />
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Course Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Select Course</label>
                            <select
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                            >
                                <option value="C1">C1 - Foundation</option>
                                <option value="C2">C2 - Java Full Stack</option>
                                <option value="C3">C3 - Data Science</option>
                                <option value="C4">C4 - Cloud Computing</option>
                                <option value="C5">C5 - Cyber Security</option>
                            </select>
                        </div>

                        {/* Video Title */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Video Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Introduction to Variables"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                            <input
                                type="file"
                                id="video-upload"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                <div className="bg-blue-50 p-4 rounded-full text-primary mb-2">
                                    <Upload size={32} />
                                </div>
                                <span className="font-bold text-gray-700">Click to browse</span>
                                <span className="text-sm text-gray-500">
                                    {file ? file.name : "or drag and drop video file here"}
                                </span>
                            </label>
                        </div>

                        <Button
                            className="w-full py-4 text-lg shadow-lg flex justify-center items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin" size={20} /> Uploading...
                                </>
                            ) : (
                                "Upload Video"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminUpload;
