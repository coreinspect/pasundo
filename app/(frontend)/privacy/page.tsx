import { Metadata } from "next";
import "./privacy.css";
import Nav from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Pasundo",
  description:
    "Learn about how Pasundo collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  keywords: "privacy policy, pasundo privacy, data protection, user privacy",
  robots: "index, follow",
  metadataBase: new URL("https://pasundo.com"),
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Pasundo",
    description:
      "Learn about how Pasundo collects, uses, and protects your personal information.",
    type: "website",
    url: "https://pasundo.com/privacy",
    siteName: "Pasundo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Pasundo",
    description:
      "Learn about how Pasundo collects, uses, and protects your personal information.",
  },
};

export default function Privacy() {
  return (
    <>
      <Nav />
      <section className="container privacy-container">
        <div className="privacy-content">
          <h1 className="privacy-title animate-fade-in">Privacy Policy</h1>
          <p className="effective-date">Effective October 1st, 2024.</p>

          <div className="privacy-intro animate-slide-up">
            <p>
              Pasundo is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our ride-hailing mobile application
              Pasundo. Please read this Privacy Policy carefully. By using
              Pasundo, you agree to the terms of this Privacy Policy. If you do
              not agree, please do not use Pasundo.
            </p>
          </div>

          <div className="privacy-sections">
            <section className="privacy-section animate-slide-up">
              <h2>Information We Collect</h2>

              <h3>1. Personal Information</h3>
              <p>We may collect the following personal information from you:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Profile picture (optional)</li>
                <li>
                  Payment information (e.g., credit card details, transaction
                  history)
                </li>
                <li>Driver&apos;s license information (for drivers)</li>
              </ul>

              <h3>2. Location Data</h3>
              <p>
                We collect precise or approximate location data from your mobile
                device when you use Pasundo. This is essential for:
              </p>
              <ul>
                <li>Connecting riders with drivers</li>
                <li>Real-time navigation</li>
                <li>Fare calculation</li>
              </ul>

              <h3>3. Device Information</h3>
              <p>We may collect information about your device, including:</p>
              <ul>
                <li>Device model</li>
                <li>Operating system version</li>
                <li>Unique device identifiers</li>
                <li>Mobile network information</li>
              </ul>

              <h3>4. Usage Data</h3>
              <p>
                We collect information about your use of Pasundo, including:
              </p>
              <ul>
                <li>Ride history</li>
                <li>App interactions (e.g., buttons clicked, pages viewed)</li>
                <li>Errors or crashes</li>
              </ul>

              <h3>5. Cookies and Tracking Technologies</h3>
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Improve App functionality</li>
                <li>Analyze usage patterns</li>
                <li>Provide personalized content</li>
              </ul>
            </section>

            <section className="privacy-section animate-slide-up">
              <h2>How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Provide, operate, and improve Pasundo</li>
                <li>Facilitate ride requests and match riders with drivers</li>
                <li>Process payments and refunds</li>
                <li>Ensure the safety and security of all users</li>
                <li>
                  Communicate with you about your account, transactions, and
                  promotions
                </li>
                <li>
                  Comply with legal obligations and enforce our terms of service
                </li>
              </ul>
            </section>

            <section className="privacy-section animate-slide-up">
              <h2>How We Share Your Information</h2>
              <p>We may share your information with:</p>
              <h3>1. Drivers and Riders</h3>
              <ul>
                <li>
                  Riders&apos; location and contact information are shared with
                  drivers to complete rides
                </li>
                <li>
                  Drivers&apos; contact details and vehicle information are
                  shared with riders for identification
                </li>
              </ul>

              <h3>2. Service Providers</h3>
              <p>
                We may share information with third-party vendors and service
                providers who perform services on our behalf, such as:
              </p>
              <ul>
                <li>Payment processors</li>
                <li>Cloud storage providers</li>
                <li>Analytics and marketing partners</li>
              </ul>

              <h3>3. Legal Obligations</h3>
              <p>
                We may disclose your information if required by law or if we
                believe it is necessary to:
              </p>
              <ul>
                <li>Comply with legal processes</li>
                <li>
                  Protect the rights, property, or safety of our users or the
                  public
                </li>
              </ul>

              <h3>4. Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred to the new entity.
              </p>
            </section>

            <section className="privacy-section animate-slide-up">
              <h2>Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to
                provide our services and comply with legal obligations. You may
                request deletion of your data as outlined in the &quot;Your
                Rights&quot; section below.
              </p>
            </section>

            <section className="privacy-section animate-slide-up">
              <h2>Your Rights</h2>
              <p>You have the following rights regarding your information:</p>

              <h3>1. Access and Update</h3>
              <p>
                You can access and update your personal information through your
                account settings.
              </p>

              <h3>2. Deletion</h3>
              <p>
                You can request the deletion of your personal information by
                contacting us at Support@ShraderTechnologies.com.
              </p>

              <h3>3. Opt-Out</h3>
              <p>
                You can opt out of receiving promotional emails by clicking the
                &quot;Unsubscribe&quot; link in those emails.
              </p>

              <h3>4. Data Portability</h3>
              <p>
                You may request a copy of your data in a portable format by
                contacting us at Support@ShraderTechnologies.com.
              </p>
            </section>

            <section className="privacy-section animate-slide-up">
              <h2>Additional Information</h2>

              <h3>Security</h3>
              <p>
                We use industry-standard security measures to protect your
                information. However, no method of transmission over the
                internet or electronic storage is completely secure, and we
                cannot guarantee absolute security.
              </p>

              <h3>Children&apos;s Privacy</h3>
              <p>
                Our App is not intended for use by children under the age of 13.
                We do not knowingly collect personal information from children.
                If we become aware of such data, we will delete it promptly.
              </p>

              <h3>Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted in Pasundo, and the &quot;Effective Date&quot;
                will be updated. Your continued use of Pasundo after any changes
                indicates your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="privacy-section animate-slide-up">
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us by email at:
                <a href="mailto:Support@ShraderTechnologies.com">
                  Support@ShraderTechnologies.com
                </a>
              </p>
            </section>

            <div className="privacy-section animate-slide-up">
              <p className="agreement-text">
                By using Pasundo, you acknowledge that you have read and
                understood this Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
