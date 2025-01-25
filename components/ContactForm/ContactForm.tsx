"use client";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./contactform.css";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  // Add effect to auto-hide status message
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitStatus.message) {
      timer = setTimeout(() => {
        setSubmitStatus({ message: "", type: null });
      }, 2000); // Will hide after 2 seconds
    }
    return () => clearTimeout(timer);
  }, [submitStatus.message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ message: "", type: null });

    try {
      const result = await emailjs.sendForm(
        "service_fvxrrhd", // Replace with your EmailJS service ID
        "template_jyan8ia", // Replace with your EmailJS template ID
        form.current,
        "kY0Epym9H50UV1-P4" // Replace with your EmailJS public key
      );

      if (result.text === "OK") {
        setSubmitStatus({
          message: "Message sent successfully!",
          type: "success",
        });
        form.current.reset();
      }
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={handleSubmit}>
        {submitStatus.message && (
          <div className={`alert ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="contact-group">
          <select id="issueType" name="issueType" required defaultValue="">
            <option value="" disabled>
              Select an issue type
            </option>
            <option value="Pasundo App">
              Report an issue with Pasundo app
            </option>
            <option value="Pasundo Driver">
              Report an issue with Pasundo Driver
            </option>
            <option value="Pasundo Passenger">
              Report an issue with Pasundo passenger
            </option>
          </select>
          <label htmlFor="issueType">Issue Type</label>
        </div>

        <div className="contact-group">
          <input type="text" id="name" name="name" placeholder=" " required />
          <label htmlFor="name">Full Name</label>
        </div>

        <div className="contact-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
          />
          <label htmlFor="email">Email Address</label>
        </div>

        <div className="contact-group">
          <input type="tel" id="phone" name="phone" placeholder=" " required />
          <label htmlFor="phone">Phone Number</label>
        </div>

        <div className="contact-group">
          <textarea
            id="message"
            name="message"
            placeholder=" "
            required
          ></textarea>
          <label htmlFor="message">Message</label>
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
