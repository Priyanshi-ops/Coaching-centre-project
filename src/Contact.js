import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");

  // ✅ Updated handleSubmit to send data to Spring Boot
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Validation
    if (!name) {
      setNameError("Please fill out this field");
      valid = false;
    } else setNameError("");

    if (!email) {
      setEmailError("Please fill out this field");
      valid = false;
    } else setEmailError("");

    if (!phone) {
      setPhoneError("Please fill out this field");
      valid = false;
    } else setPhoneError("");

    if (!message) {
      setMessageError("Please fill out this field");
      valid = false;
    } else setMessageError("");

    if (!valid) return;

    // ✅ Prepare data
    const contactData = { name, email, phone, message };

    try {
      // ✅ Send data to Spring Boot backend
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        // Clear form after success
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        alert("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Error connecting to backend. Make sure Spring Boot is running.");
    }
  };

  return (
    <div className="contact-page">
      {/* Left side: Map + Info */}
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.50708250592!2d77.0688981!3d28.527582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5d8b5e08f3%3A0x37e3a1e85f3e2bbf!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="New Delhi Map"
        ></iframe>

        <div className="contact-info">
          <h2>📍 Get in Touch</h2>
          <h3>✍️ Our team is ready to help you with admissions, courses, and guidance.</h3>
          <p><strong>Address:</strong> New Delhi, India</p>
          <p><strong>Phone:</strong> +91 999999</p>
          <p><strong>Email:</strong> info@studyaarc.com</p>
          <p><strong>Hours:</strong> Mon–Sat, 10 AM to 7 PM</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out using the form below.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {nameError && <p className="error">{nameError}</p>}

          <label>
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {emailError && <p className="error">{emailError}</p>}

          <label>
            Phone:
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          {phoneError && <p className="error">{phoneError}</p>}

          <label>
            Message:
            <textarea
              placeholder="Write your message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          {messageError && <p className="error">{messageError}</p>}

          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
