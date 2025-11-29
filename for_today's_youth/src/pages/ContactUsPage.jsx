import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes borderGlow {
    0% {
      border-color: rgba(34, 211, 238, 0.3);
      box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.3);
    }
    50% {
      border-color: rgba(34, 211, 238, 0.8);
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
    }
    100% {
      border-color: rgba(6, 182, 212, 1);
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
    }
  }
  .contact-card {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .contact-card:hover {
    animation: borderGlow 0.6s ease-out forwards;
  }
  .form-group {
    animation: slideInDown 0.6s ease-out forwards;
  }
`;

export const ContactUsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, 'ContactMessages'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        userId: user?.uid || 'anonymous',
        timestamp: serverTimestamp(),
      });

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: user?.email || '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className="container mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Reach out to us anytime!
        </p>
      </div>

      {/* Contact Information Cards */}
      <div className="container mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Card */}
          <div
            className="contact-card h-full bg-gradient-to-br from-slate-800 to-blue-800 rounded-xl p-8 border-2 border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
            style={{ animationDelay: '0s' }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-3 text-center">Email</h3>
            <p className="text-gray-300 text-center text-lg font-semibold mb-2">fortodays.youth@gmail.com</p>
            <p className="text-gray-400 text-center text-sm">We typically respond within 24 hours</p>
          </div>

          {/* Phone Card */}
          <div
            className="contact-card h-full bg-gradient-to-br from-blue-800 to-slate-800 rounded-xl p-8 border-2 border-sky-500 hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-300"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 7.487a1 1 0 00.502.984l2.114 1.057a8 8 0 00-6.213-6.213l-1.057-2.114a1 1 0 00-.984-.502H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-2.28a1 1 0 00-.684-.948l-7.487-1.498a1 1 0 00-.984-.502l-1.057 2.114a8 8 0 006.213 6.213l1.057 1.057a1 1 0 00.502.984h2.28a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-sky-300 mb-3 text-center">Phone</h3>
            <p className="text-gray-300 text-center text-lg font-semibold mb-2">+880 1234-567890</p>
            <p className="text-gray-400 text-center text-sm">Monday - Friday, 9 AM - 6 PM</p>
          </div>

          {/* Location Card */}
          <div
            className="contact-card h-full bg-gradient-to-br from-slate-800 to-blue-800 rounded-xl p-8 border-2 border-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-300 mb-3 text-center">Location</h3>
            <p className="text-gray-300 text-center text-lg font-semibold mb-2">Dhaka, Bangladesh</p>
            <p className="text-gray-400 text-center text-sm">Visit us or contact for directions</p>
          </div>
        </div>
      </div>

      {/* Main Content - Form and Map */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-8 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20">
          <h2 className="text-3xl font-bold text-cyan-300 mb-8">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="form-group" style={{ animationDelay: '0.1s' }}>
              <label className="block text-cyan-300 font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-blue-700 border-2 border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="form-group" style={{ animationDelay: '0.2s' }}>
              <label className="block text-cyan-300 font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-blue-700 border-2 border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 transition-all"
              />
            </div>

            {/* Phone Field */}
            <div className="form-group" style={{ animationDelay: '0.3s' }}>
              <label className="block text-cyan-300 font-semibold mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+880 1234-567890"
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-blue-700 border-2 border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 transition-all"
              />
            </div>

            {/* Subject Field */}
            <div className="form-group" style={{ animationDelay: '0.4s' }}>
              <label className="block text-cyan-300 font-semibold mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this about?"
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-blue-700 border-2 border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 transition-all"
              />
            </div>

            {/* Message Field */}
            <div className="form-group" style={{ animationDelay: '0.5s' }}>
              <label className="block text-cyan-300 font-semibold mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message here..."
                rows="6"
                className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-blue-700 border-2 border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="form-group pt-4" style={{ animationDelay: '0.6s' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="h-full min-h-[600px] rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20">
          <iframe
            title="For Today's Youth Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9027250670403!2d90.39911!3d23.810331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c730d23d9cd9%3A0x1d6d8c3d3d3d3d3d!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '600px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="container mx-auto mt-16 bg-gradient-to-r from-slate-800/50 to-blue-800/50 rounded-2xl p-8 border border-cyan-400/30">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">Why Contact Us?</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Whether you have questions about our courses, job opportunities, or just want to share feedback, we're here to help. 
            Our team is dedicated to providing the best support and guidance for your career journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <p className="text-cyan-300 font-bold text-lg mb-2">Quick Response</p>
              <p className="text-gray-400">We respond to all inquiries within 24 hours</p>
            </div>
            <div className="text-center">
              <p className="text-sky-300 font-bold text-lg mb-2">Expert Support</p>
              <p className="text-gray-400">Get guidance from our experienced team</p>
            </div>
            <div className="text-center">
              <p className="text-blue-300 font-bold text-lg mb-2">Always Available</p>
              <p className="text-gray-400">Multiple channels to reach us anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
