import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Lottie from 'lottie-react';
import contactL from "../Animation/contactlogo.json";
import './contact.css';

const contactInfo = [
  {
    icon: 'https://img.icons8.com/ios-filled/50/ffffff/phone.png',
    text: '16111',
  },
  {
    icon: 'https://img.icons8.com/ios-filled/50/ffffff/marker.png',
    text: '26th of July Corridor, 6th of October, Egypt',
  },
  {
    icon: 'https://img.icons8.com/ios-filled/50/ffffff/email.png',
    text: 'info@saudihospital.com',
  },
];

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post("https://your-backend-api.com/contact", data);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="contact-header">
        <div className="nav-logo">
          <img src="logo.png" alt="Hospital Logo" className="hospital-logo" />
        </div>
        <nav className="navbar1">
          <ul className="nav-links1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <div className="nav-right">
                <Link to="/LogIn">Log In</Link>
                <Link to="/SignUpSelection">Sign Up</Link>
                </div>
        </nav>
      </header>
      
      <main className="contact-main">
        <div className="contact-section">
          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-card">
                <img src={info.icon} alt="icon" className="contact-icon" />
                <p className="contact-text">{info.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-container">
          <section className="contact-location-section">
            <div className="contact-map-wrapper">
              <iframe
                title="Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.3741310239116!2d30.963398675342987!3d29.99741187494722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458573fca14f8dd%3A0x5b4426c019012200!2sThe%20Memorial%20Souad%20Kafafi%20University%20Hospital!5e0!3m2!1sen!2seg!4v1745408205018!5m2!1sen!2seg"
                style={{ border: 0, width: '100%', height: '450px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </div>

        <div className="contact-us-container">
  <div className="contact-content-wrapper">
    {/* Combined Form and Animation Section */}
    <div className="contact-main-section">
      {/* Form Section */}
      <div className="contact-form-section">
        <h1 className="contact-title">Let's Get In Touch</h1>
        {isSubmitted ? (
          <div className="contact-success">
            <p>✅ Your message has been sent successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                className="form-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="form-error">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                rows="5"
                className="form-textarea"
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
              />
              {errors.message && (
                <span className="form-error">{errors.message.message}</span>
              )}
            </div>

            {error && (
              <div className="form-server-error">{error}</div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      {/* Animation Section */}
      <div className="contact-animation-section">
        <div className="lottie-container">
          <Lottie animationData={contactL} />
        </div>
      </div>
    </div>
  </div>
</div>
      </main>

      <footer className="footer">
  <div className="footer__content">
    <img
      src="Hosptal1.png"
      alt="Hospital Building"
      className="footer__image"
    />

    <div className="footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/OurDoctors">Our Doctors</Link></li>
      </ul>
    </div>

    {/* Contact Section with your original image icons */}
    <div className="footer-contact">
      <h3>Get in Touch</h3>
      <div className="footer-contact-item">
        <a href="tel:16111" className="footer-contact-link">Call Us: 16111</a>
      </div>
      
      <div className="footer-contact-item">
        <a 
          href="https://maps.google.com?q=26th+of+July+Corridor,+6th+of+October,+Egypt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-contact-link"
        >
          26th of July Corridor<br/>6th of October, Egypt
        </a>
      </div>
      
      <div className="footer-contact-item">
        <a href="mailto:info@souadkafafihospital.com" className="footer-contact-link">
          info@souadkafafihospital.com
        </a>
      </div>
      <div className="footer__social-icons">
        <a
          href="https://www.instagram.com/souad_kafafi_hospital"
          aria-label="Instagram"
          className="footer__social-icon"
        >
          <img src="instagram.png" alt="Instagram" />
        </a>
        <a
          href="https://x.com/themskuh"
          aria-label="Twitter"
          className="footer__social-icon"
        >
          <img src="twitter.png" alt="Twitter" />
        </a>
        <a href="#" aria-label="Facebook" className="footer__social-icon">
          <img src="facebook.png" alt="Facebook" />
        </a>
      </div>
    </div>
  </div>

  <div className="footer__copyright">
    <p>© 2025 Souad Kafafi Hospital. All Rights Reserved.</p>
  </div>
</footer>
    </>
  );
}

export default Contact;