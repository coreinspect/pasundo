"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./howitworks.css"; // Changed import from module to regular CSS

type Tab = "driver" | "passenger";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<Tab>("driver");

  const content = {
    driver: {
      title: "Drive with Pasundo",
      steps: [
        "Register as a driver",
        "Complete verification process",
        "Start accepting rides",
        "Earn money on your schedule",
      ],
    },
    passenger: {
      title: "Ride with Pasundo",
      steps: [
        "Download the app",
        "Book your ride",
        "Track your driver",
        "Arrive safely at destination",
      ],
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const numberVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <section className="howItWorks">
      <div className="howitworks-container">
        <div className="leftContent">
          <h2>How Pasundo Works</h2>
          <p>
            Discover the simplicity of Pasundo! Click the appropriate button to
            learn about our seamless process, designed to meet your needs
            efficiently.
          </p>
          <div className="buttonsWorks">
            <button
              className={`btnWorks ${activeTab === "driver" ? "active" : ""}`}
              onClick={() => setActiveTab("driver")}
            >
              Driver
            </button>
            <button
              className={`btnWorks ${
                activeTab === "passenger" ? "active" : ""
              }`}
              onClick={() => setActiveTab("passenger")}
            >
              Passenger
            </button>
          </div>
        </div>
        <div className="rightContent">
          <h3>{content[activeTab].title}</h3>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="steps"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {content[activeTab].steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="step"
                  variants={stepVariants}
                >
                  <motion.span className="stepNumber" variants={numberVariants}>
                    {index + 1}
                  </motion.span>
                  <p>{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
