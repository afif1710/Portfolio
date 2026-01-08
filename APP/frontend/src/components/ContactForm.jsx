import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import profile from '../data/profile.json';

const ContactForm = () => {
  const { reducedMotion } = useAccessibility();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // REPLACE_ME: Integrate with Formspree or your serverless function
    // Example Formspree: action="https://formspree.io/f/YOUR_FORM_ID"
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Info */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-mid-blue text-white px-4 py-1 rounded-full font-mono text-xs uppercase tracking-wider mb-6">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-6">
              Let's Build Something
              <span className="text-mid-blue"> Amazing</span>
            </h2>
            <p className="text-dark-grey text-lg leading-relaxed mb-8">
              I'm always excited to collaborate on interesting projects. Whether you have a 
              specific idea in mind or just want to explore possibilities, let's chat!
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-mid-blue/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-mid-blue" />
                </div>
                <div>
                  <p className="text-sm text-mid-grey">Email</p>
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="text-black font-medium hover:text-mid-blue transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-mid-blue/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-mid-blue" />
                </div>
                <div>
                  <p className="text-sm text-mid-grey">Location</p>
                  <p className="text-black font-medium">{profile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block font-mono text-xs uppercase tracking-wider text-mid-grey mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-grey/30 border border-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-mid-blue focus:border-transparent transition-all text-black placeholder-mid-grey"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block font-mono text-xs uppercase tracking-wider text-mid-grey mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-grey/30 border border-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-mid-blue focus:border-transparent transition-all text-black placeholder-mid-grey"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block font-mono text-xs uppercase tracking-wider text-mid-grey mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-grey/30 border border-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-mid-blue focus:border-transparent transition-all text-black placeholder-mid-grey resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="w-full bg-black text-white px-8 py-4 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Formspree note */}
            <p className="mt-4 text-sm text-mid-grey text-center">
              {/* REPLACE_ME: Remove this note after setting up Formspree */}
              Form submissions are simulated as of now. Email me anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;