"use client";

import React, { useState } from "react";
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
          <div className="steps">
            {content[activeTab].steps.map((step, index) => (
              <div key={index} className="step">
                <span className="stepNumber">{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
