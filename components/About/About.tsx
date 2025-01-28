"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import "./about.css";

const downloadOptions = [
  {
    platform: "Google Play Store",
    url: "#",
    icon: <FaGooglePlay className="download-icon" />,
    disabled: false,
  },
  {
    platform: "Apple App Store",
    url: "#",
    icon: <FaApple className="download-icon" />,
    disabled: true,
    title: "Coming soon to App Store",
  },
];

const About = () => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  return (
    <section className="about-container" id="about">
      <div className="container">
        <div className="about-content">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ABOUT PASUNDO
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Pasundo is a dynamic and innovative platform designed to
              revolutionize the way people connect with riders for their
              transportation and delivery needs. Derived from the Filipino term
              &quot;sundo,&quot; meaning &quot;to fetch&quot; or &quot;to pick
              up,&quot; Pasundo captures the essence of reliable, on-demand
              service.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Whether you need a quick ride across town, a courier for urgent
              deliveries, or someone to help transport goods, Pasundo is your
              go-to solution. Our user-friendly app connects customers with a
              network of professional, well-trained riders, ensuring fast, safe,
              and efficient service every time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="download-btn"
                onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              >
                <span>DOWNLOAD THE APP NOW</span>
              </motion.button>
              <AnimatePresence>
                {showDownloadOptions && (
                  <motion.div
                    className="download-options"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {downloadOptions.map((option) => (
                      <a
                        key={option.platform}
                        href={option.disabled ? undefined : option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`download-option ${
                          option.disabled ? "disabled" : ""
                        }`}
                        onClick={(e) => option.disabled && e.preventDefault()}
                      >
                        {option.icon}
                        {option.platform}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="about-image"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            ></motion.div>
            <motion.div
              className="feature-list"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <div className="content-side">
                <h3>Advantage of Pasundo</h3>
                <ul>
                  <li>Quick & Easy Booking</li>
                  <li>Real-time Tracking</li>
                  <li>Secure Payments</li>
                  <li>Professional Riders</li>
                </ul>
              </div>
              <motion.img
                src="/images/PASUNDO.png"
                alt="Pasundo App"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  y: [0, -20, 0],
                }}
                transition={{
                  delay: 1.2,
                  duration: 2,
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                animate={{
                  y: [0, 20, 0],
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
