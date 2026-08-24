import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Award,
  CheckCircle2,
  Bike,
  Star,
  Globe,
  ArrowRight,
  Heart,
  Zap
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function AboutPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="section-tag"><Shield size={14} /> About Us</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="page-title">
              Built by Riders, <span style={{ color: 'var(--primary)' }}>For Riders</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="page-subtitle">
              MotoMarket is the premier digital marketplace connecting motorcycle enthusiasts with verified sellers worldwide. Our mission is to make buying and selling motorcycles simple, safe, and enjoyable.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container">
          <div className="about-teaser-section">
            <motion.div
              className="about-teaser-image"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
                alt="Motorcycle culture"
              />
            </motion.div>

            <motion.div
              className="about-teaser-text"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="section-tag"><Star size={14} /> Our Story</span>
              <h2>From Passion to Platform</h2>
              <p>
                Founded by a team of avid motorcyclists, MotoMarket was born from a simple observation: buying and selling motorcycles online should be as thrilling as the ride itself. We set out to build a marketplace that combines trust, transparency, and a premium experience.
              </p>
              <p>
                Today, we serve thousands of riders across the globe, with every listing verified and every seller vetted. Our expert team inspects motorcycles and ensures that every transaction is smooth and secure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <span className="section-tag"><Zap size={14} /> What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide every decision we make.</p>
          </motion.div>

          <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[
              { icon: Shield, title: 'Trust & Verification', desc: 'Every seller is verified and every listing is reviewed by our expert team before going live.' },
              { icon: Heart, title: 'Passion for Riding', desc: 'We are riders first. We understand what matters most when choosing your next motorcycle.' },
              { icon: Users, title: 'Community First', desc: 'We foster a community of enthusiasts who share knowledge, reviews, and their love for motorcycles.' },
              { icon: Globe, title: 'Global Reach', desc: 'Connect with sellers and buyers from around the world, with support for international transactions.' },
              { icon: Award, title: 'Quality Guarantee', desc: 'Our quality guarantee ensures every motorcycle meets strict standards before being listed.' },
              { icon: CheckCircle2, title: 'Secure Transactions', desc: 'End-to-end security for all payments and communications on our platform.' }
            ].map((value, i) => {
              const ValueIcon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="category-card"
                  style={{ cursor: 'default', textAlign: 'left', padding: '28px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <div className="category-icon-wrap">
                    <ValueIcon size={24} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: Bike, value: '10K+', label: 'Motorcycles Listed' },
              { icon: Users, value: '5K+', label: 'Verified Sellers' },
              { icon: Star, value: '15K+', label: 'Happy Riders' },
              { icon: Award, value: '5', label: 'Years of Experience' }
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="stat-icon-wrap">
                    <StatIcon size={24} />
                  </div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Join the MotoMarket Community</h2>
            <p>Whether you're buying or selling, we're here to make every transaction seamless and rewarding.</p>
            <div className="cta-banner-buttons">
              <Link to="/motorcycles" className="btn btn-dark btn-lg">
                Explore Marketplace <ArrowRight size={18} />
              </Link>
              <Link to="/sell" className="btn btn-outline-white btn-lg">
                Start Selling
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
