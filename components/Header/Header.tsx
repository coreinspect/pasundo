"use client";

import Image from "next/image";
import "./header.css";

import Link from "next/link";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Nav from "../Nav/Nav";

const Header = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  interface EmailEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
  }

  const sendEmail = (e: EmailEvent): void => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false });

    if (form.current) {
      emailjs
        .sendForm(
          "service_yhqsmze", // Replace with your Service ID
          "template_4c6zdf6", // Replace with your Template ID
          form.current,
          "CqOt_i2a7x9ig0tV6" // Replace with your Public Key
        )
        .then(() => {
          setFormStatus({ loading: false, success: true, error: false });
          e.target.reset();
          setTimeout(
            () =>
              setFormStatus({ loading: false, success: false, error: false }),
            3000
          );
        })
        .catch(() => {
          setFormStatus({ loading: false, success: false, error: true });
          setTimeout(
            () =>
              setFormStatus({ loading: false, success: false, error: false }),
            3000
          );
        });
    }
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
      <Nav />

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
              <div className="cta-image coming-soon-wrapper">
                <Link href="/">
                  <div className="coming-soon-overlay">Coming Soon</div>
                  <Image
                    src="/images/appleappstore.png"
                    alt="Download on App Store"
                    width={180}
                    height={60}
                    className="disabled-image"
                  />
                </Link>
              </div>
              {/* Keep Google Play store as is */}
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
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-header">
                <p>
                  Have questions or ideas? Our team at Pasundo is here to help
                  and guide you through the next steps. Reach out now and
                  let&apos;s get started!
                </p>
              </div>
              <div className="name-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="first_name"
                    placeholder=" "
                    required
                  />
                  <label>First Name</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="last_name"
                    placeholder=" "
                    required
                  />
                  <label>Last Name</label>
                </div>
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder=" " required />
                <label>Email Address</label>
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder=" " required />
                <label>Phone Number</label>
              </div>
              <div className="form-group">
                <input type="text" name="location" placeholder=" " required />
                <label>Current Location</label>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder=" "
                  required
                  rows={4}
                ></textarea>
                <label>Message</label>
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={formStatus.loading}
              >
                {formStatus.loading ? "Sending..." : "Send Message"}
              </button>
              {formStatus.success && (
                <div className="form-status success">
                  Message sent successfully!
                </div>
              )}
              {formStatus.error && (
                <div className="form-status error">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
