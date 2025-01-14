"use client";

import Image from "next/image";
import "./header.css";
import { GiSteeringWheel } from "react-icons/gi";
import { BsPhoneFlip } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <video
        className="header-video"
        src="/videos/header.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="header-overlay"></div>
      <div className=" header-content">
        <div className="container header-top">
          {/* Logo Container */}
          <div className="header-top__logo">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="logo"
            />
          </div>

          {/* Header Info  */}
          <div className="header-top__info">
            <p className="drive-us">
              <span>
                <GiSteeringWheel className="icon" />
              </span>
              Drive with us
            </p>
            <p className="get-ride">
              <span>
                <BsPhoneFlip className="icon" />
              </span>
              Get a ride in minutes
            </p>

            {/* Hamburger Button */}
            <button
              className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className={`container nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/">Home </Link>
            </li>
            <li className="nav-item">
              <Link href="/">About </Link>
            </li>
            <li className="nav-item">
              <Link href="/">Services </Link>
            </li>
            <li className="nav-item">
              <Link href="/">Contact </Link>
            </li>
          </ul>

          {/* Responsive Header Info*/}
          <div className="header-top__responsive">
            <p className="drive">
              <span>
                <GiSteeringWheel className="icon" />
              </span>
              Drive with us
            </p>
            <p className="get-rides">
              <span>
                <BsPhoneFlip className="icon" />
              </span>
              Get a ride in minutes
            </p>
          </div>
        </nav>
      </div>
      {/* Text Content */}
      <div className="container header-items">
        <div className="header-item">
          {/* Left Content */}
          <div className="left-content">
            <h1>Apply. Earn.</h1>
            <p>
              Apply now with Pasundo and start earning! Join our team of riders,
              gain experience, and boost your income. Don’t miss the chance to
              be part of a growing community.
              <span>Start your journey with Pasundo today!</span>
            </p>
            <div className="cta-container">
              <div className="cta-image">
                <Link href="/">
                  <Image
                    src="/images/appleappstore.png"
                    alt="Download on App Store"
                    width={180}
                    height={60}
                  />
                </Link>
              </div>
              <div className="cta-image">
                <Link href="/">
                  <Image
                    src="/images/googleappstore.png"
                    alt="Get it on Google Play"
                    width={180}
                    height={60}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="right-content">
            <h2>Have something in mind?</h2>
            <form className="contact-form">
              <div className="form-header">
                <p>
                  Have questions or ideas? Our team at Pasundo is here to help
                  and guide you through the next steps. Reach out now and
                  let&apos;s get started!
                </p>
              </div>
              <div className="name-row">
                <div className="form-group">
                  <input type="text" placeholder="First Name" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Last Name" required />
                </div>
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Current Location" required />
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
