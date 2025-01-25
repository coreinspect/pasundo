import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import "./contact.css";
import Nav from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import ContactForm from "@/components/ContactForm/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Pasundo",
  description:
    "Get in touch with Pasundo. We're here to help with your inquiries and provide the support you need.",
  keywords:
    "contact pasundo, pasundo support, pasundo help, contact us, customer service",
  robots: "index, follow",
  alternates: {
    canonical: "https://pasundo.com/contact",
  },
  openGraph: {
    title: "Contact Us | Pasundo",
    description:
      "Get in touch with Pasundo. We're here to help with your inquiries and provide the support you need.",
    type: "website",
    url: "https://pasundo.com/contact",
    siteName: "Pasundo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Pasundo",
    description:
      "Get in touch with Pasundo. We're here to help with your inquiries and provide the support you need.",
  },
};

export default function Contact() {
  return (
    <>
      <Script id="contact-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Pasundo Contact Page",
          description: "Get in touch with Pasundo support team",
          url: "https://pasundo.com/contact",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "",
            contactType: "customer service",
            email: "Support@ShraderTechnologies.com",
            availableLanguage: "English",
          },
        })}
      </Script>
      <Nav />
      <div className="container contact-container">
        <div className="contact-wrapper">
          {/* Left Side */}
          <div className="contact-left">
            <div className="contact-image-wrapper">
              <Image
                src="/images/pasundo-contact.jpg" // Add your image to public/images/
                alt="Pasundo Customer Support"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="contact-content">
              <h1>Contact Us</h1>
              <p>
                We&apos;re here to help! Please fill out the form and we&apos;ll
                get back to you as soon as possible. Our support team is
                dedicated to providing you with the best assistance for all your
                Pasundo-related inquiries.
              </p>
            </div>
          </div>

          {/* Updated Form */}
          <div className="contact-form-page">
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
