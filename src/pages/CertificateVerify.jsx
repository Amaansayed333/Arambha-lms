import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Search, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificateVerify = () => {
    const [certId, setCertId] = useState('');
    const [result, setResult] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        // Mock verification
        if (certId.length > 5) {
            setResult({
                name: "John Doe",
                course: "Full Stack Java Developer",
                date: "Oct 15, 2025",
                id: certId
            });
        }
    };

    return (
        <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl text-center">
                <div className="mb-8 flex justify-center">
                    <div className="bg-primary/5 p-4 rounded-full">
                        <ShieldCheck size={48} className="text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl font-heading font-bold text-primary mb-4">Verify Certificate</h1>
                <p className="text-gray-500 mb-10">Enter the unique certificate ID found on the certificate to verify its authenticity.</p>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-10">
                    <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={certId}
                            onChange={(e) => setCertId(e.target.value)}
                            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none uppercase tracking-widest text-center md:text-left font-mono"
                            placeholder="ARAMB-2024-XXXX"
                        />
                        <Button type="submit" size="lg" className="gap-2">
                            Verify <Search size={20} />
                        </Button>
                    </form>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-left relative overflow-hidden"
                        >
                            <div className="flex items-start gap-4 relative z-10">
                                <CheckCircle className="text-emerald-600 mt-1" size={28} />
                                <div>
                                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Certificate Verified Successfully</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
                                        <div>
                                            <span className="text-emerald-700 block text-xs uppercase tracking-wide">Student Name</span>
                                            <span className="font-semibold text-emerald-950 text-lg">{result.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-emerald-700 block text-xs uppercase tracking-wide">Course</span>
                                            <span className="font-semibold text-emerald-950 text-lg">{result.course}</span>
                                        </div>
                                        <div>
                                            <span className="text-emerald-700 block text-xs uppercase tracking-wide">Issue Date</span>
                                            <span className="font-semibold text-emerald-950">{result.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-emerald-700 block text-xs uppercase tracking-wide">Certificate ID</span>
                                            <span className="font-semibold text-emerald-950">{result.id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CertificateVerify;
