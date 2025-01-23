import Link from "next/link";
import "./footer.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>PASUNDO</h3>
          <p>
            Pasundo is a reliable rider-hailing service in Davao, Philippines,
            connecting you with trusted riders for quick and affordable
            transportation and deliveries.
          </p>
          <button className="rider-btn">
            <span>BE PART OF PASUNDO RIDERS</span>
          </button>
        </div>

        <div className="footer-section">
          <h3>Our Address</h3>
          <p>123 Main Street</p>
          <p>Davao City, Philippines</p>
          <p>Email: contact@pasundo.com</p>
          <p>Phone: +63 XXX XXX XXXX</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>Download App</h3>
          <div className="download-buttons">
            <button className="download-btn-footer">
              <FaApple className="btn-icon" /> App Store
            </button>
            <button className="download-btn-footer">
              <FaGooglePlay className="btn-icon" /> Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="copyright-content">
          <p>&copy; {new Date().getFullYear()} Pasundo. All rights reserved.</p>
          <p>Shrader Technologies</p>
        </div>
      </div>
    </footer>
  );
};
