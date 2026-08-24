import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Bike, Send, ShieldCheck, Award, ThumbsUp, Heart } from 'lucide-react';
import { addToast } from '../../features/ui/uiSlice';

export default function Footer() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      dispatch(addToast({ message: 'Please enter a valid email address.', type: 'warning' }));
      return;
    }
    dispatch(addToast({ message: 'Thank you for subscribing to MotoMarket alerts!', type: 'success' }));
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Footer Section */}
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="logo" style={{ color: '#ffffff' }}>
              <div className="logo-icon-wrap">
                <Bike size={22} />
              </div>
              <span className="logo-text">Moto<span style={{ color: '#38bdf8' }}>Market</span></span>
            </Link>
            <p>
              MotoMarket is the premier digital marketplace for motorcycle enthusiasts. Discover, compare, buy and sell verified high-performance motorcycles with confidence.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#38bdf8" />
                <span>Verified Sellers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#38bdf8" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/motorcycles">Browse All Bikes</Link></li>
              <li><Link to="/brands">Popular Brands</Link></li>
              <li><Link to="/sell">Sell Your Motorcycle</Link></li>
              <li><Link to="/favorites">Saved Wishlist</Link></li>
              <li><Link to="/dashboard">Seller Dashboard</Link></li>
              <li><Link to="/about">About MotoMarket</Link></li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="footer-col-title">Top Brands</h4>
            <ul className="footer-links-list">
              <li><Link to="/brands/Yamaha">Yamaha Motorcycles</Link></li>
              <li><Link to="/brands/Ducati">Ducati Superbikes</Link></li>
              <li><Link to="/brands/Kawasaki">Kawasaki Ninja Series</Link></li>
              <li><Link to="/brands/Honda">Honda Sport & Adventure</Link></li>
              <li><Link to="/brands/Aprilia">Aprilia Racing Division</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="footer-col-title">Marketplace Alerts</h4>
            <p className="footer-newsletter-text">
              Subscribe to get immediate notifications when rare superbikes or new listings match your taste.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe to newsletter">
                <Send size={15} />
              </button>
            </form>
            <div style={{ marginTop: '16px', fontSize: '13px', color: '#64748b' }}>
              <span>Need help? Call </span>
              <a href="tel:+18005556686" style={{ color: '#38bdf8', fontWeight: 600 }}>+1 (800) 555-MOTO</a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MotoMarket Inc. All rights reserved. Built with passion for riders worldwide.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Service</Link>
            <Link to="/contact">Support Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
