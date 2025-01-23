import React from "react";
import "./whypasundo.css";
import { FaUserCircle, FaMotorcycle } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHelmetSafety } from "react-icons/fa6";

const WhyPasundo = () => {
  return (
    <section className="whypasundo-container" id="whypasundo">
      <h2 className="whypasundo-title">Why Choose Pasundo</h2>
      <div className="whypasundo-grid">
        <div className="whypasundo-item">
          <FaUserCircle className="whypasundo-icon" />
          <h3>User-Friendly Experience</h3>
          <p>
            With a sleek and intuitive app, booking a rider is just a few taps
            away. You can track your ride or delivery, communicate with the
            rider, and manage payments effortlessly.
          </p>
        </div>
        <div className="whypasundo-item">
          <GiTakeMyMoney className="whypasundo-icon" />
          <h3>Affordable Rates</h3>
          <p>
            We offer competitive pricing with no hidden fees, making Pasundo an
            economical choice for both personal and business use.
          </p>
        </div>
        <div className="whypasundo-item">
          <FaHelmetSafety className="whypasundo-icon" />
          <h3>Safety First</h3>
          <p>
            Pasundo prioritizes your safety by thoroughly vetting all riders and
            equipping them with proper training.
          </p>
        </div>

        <div className="whypasundo-item">
          <FaMotorcycle className="whypasundo-icon" />
          <h3>Versatile Solutions</h3>
          <p>
            Whether you&apos;re commuting, sending packages, or moving goods,
            we’ve got you covered.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyPasundo;
