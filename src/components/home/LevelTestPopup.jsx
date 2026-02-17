import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const LevelTestPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  useEffect(() => {
    let firstTimer;
    let repeatTimer;

    // First popup after 10 seconds
    if (!hasOpenedOnce) {
      firstTimer = setTimeout(() => {
        setIsOpen(true);
        setHasOpenedOnce(true);
      }, 8000);
    }

    // After first time → repeat every 30 sec
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-[90%] md:w-[50%] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">

              {/* LEFT IMAGE */}
              <div className="md:w-1/2 bg-blue-50">
                <img
                  src="/src/assets/popup.png"
                  alt="Level Test"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Take a Level Test
                </h2>

                <p className="text-gray-600 mb-6">
                  Understand your current English level and let our experts guide
                  you to the right curriculum.
                </p>

                <Link to="/whatsapp">
                  <button
                    className="
                      w-full
                      bg-green-500
                      hover:bg-green-600
                      text-black
                      font-semibold
                      py-3
                      rounded-lg
                      transition-all
                      duration-300
                    "
                  >
                    WhatsApp Now
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelTestPopup;
