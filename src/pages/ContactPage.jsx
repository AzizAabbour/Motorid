import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  Headphones
} from 'lucide-react';
import { addToast } from '../features/ui/uiSlice';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function ContactPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      dispatch(addToast({ message: 'Please fill in all required fields.', type: 'warning' }));
      return;
    }
    dispatch(addToast({ message: 'Your message has been sent! We\'ll get back to you soon.', type: 'success' }));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="section-tag"><Headphones size={14} /> Get in Touch</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="page-title">
              Contact <span style={{ color: 'var(--primary)' }}>Us</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="page-subtitle">
              Have a question, feedback, or need support? We'd love to hear from you. Our team is ready to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'start' }}>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                Let's Connect
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
                Whether you're a buyer, seller, or just curious about MotoMarket, don't hesitate to reach out. We typically respond within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: Mail, label: 'Email', value: 'support@motomarket.com', href: 'mailto:support@motomarket.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (800) 555-MOTO', href: 'tel:+18005556686' },
                  { icon: MapPin, label: 'Address', value: '123 Rider Avenue, Motor City, CA 90210' },
                  { icon: Clock, label: 'Business Hours', value: 'Mon - Fri: 9AM - 6PM (PST)' },
                  { icon: Globe, label: 'Website', value: 'www.motomarket.com', href: '#' }
                ].map(item => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <ItemIcon size={20} color="var(--primary)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        {item.href ? (
                          <a href={item.href} style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                            {item.value}
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="card" style={{ padding: '36px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
                  <MessageSquare size={20} style={{ marginRight: '8px', verticalAlign: '-3px', color: 'var(--primary)' }} />
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-input"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className="form-input"
                      rows={5}
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={handleChange}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={18} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
