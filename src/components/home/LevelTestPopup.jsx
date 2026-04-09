import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const LevelTestPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  useEffect(() => {
    let firstTimer;
    let repeatTimer;

    if (!hasOpenedOnce) {
      firstTimer = setTimeout(() => {
        setIsOpen(true);
        setHasOpenedOnce(true);
      }, 8000);
    }

    if (hasOpenedOnce) {
      repeatTimer = setInterval(() => {
        setIsOpen(true);
      }, 28000);
    }

    return () => {
      clearTimeout(firstTimer);
      clearInterval(repeatTimer);
    };
  }, [hasOpenedOnce]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-[95%] md:w-[55%] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <div className="flex flex-col md:flex-row">

              {/* LEFT CONTENT */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Referral Offer 🎁
                </h2>

                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">New here?</span> Sign up now and
                  enjoy <span className="font-bold text-blue-600">33% off</span>{" "}
                  on your first enrollment.
                </p>

                <p className="text-gray-700 mb-6">
                  Refer 3 friends and get{" "}
                  <span className="font-bold text-green-600">₹500 cashback</span>{" "}
                  after signup. Your friends will also get one complimentary
                  program 
                </p>

                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  className="
                    w-full
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    font-semibold
                    py-3
                    rounded-lg
                    transition-all
                    duration-300
                  "
                >
                  Get My 33% Off
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="md:w-1/2 bg-gray-100">
                <img
                  src="/pop_up.jpeg"
                  alt="Referral Offer"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelTestPopup;