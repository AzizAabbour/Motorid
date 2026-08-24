import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bike, Heart, User, PlusCircle, Search, Menu, MessageSquare } from 'lucide-react';
import { toggleMobileMenu } from '../../features/ui/uiSlice';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const favorites = useSelector(state => state.favorites.items);
  const conversations = useSelector(state => state.messages.conversations);
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Brand Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon-wrap">
            <Bike size={22} strokeWidth={2.4} />
          </div>
          <span className="logo-text">Moto<span>Market</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-menu">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/motorcycles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Motorcycles
              </NavLink>
            </li>
            <li>
              <NavLink to="/brands" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink to="/sell" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Sell Your Bike
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Header Action Items */}
        <div className="header-actions">
          {/* Quick Search trigger */}
          <button
            className="header-action-btn"
            onClick={() => navigate('/motorcycles')}
            title="Search Motorcycles"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Messages */}
          <Link
            to="/messages"
            className="header-action-btn"
            title="Messages"
            aria-label="Messages"
          >
            <MessageSquare size={19} />
            {unreadMessagesCount > 0 && (
              <span className="header-badge" style={{ backgroundColor: 'var(--primary)' }}>
                {unreadMessagesCount}
              </span>
            )}
          </Link>

          {/* Favorites */}
          <Link
            to="/favorites"
            className="header-action-btn"
            title="Favorite Motorcycles"
            aria-label="Favorites"
          >
            <Heart size={19} />
            {favorites.length > 0 && (
              <span className="header-badge">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* User Account / Dashboard */}
          <Link
            to="/dashboard"
            className="header-action-btn"
            title="User Dashboard"
            aria-label="Dashboard"
          >
            <User size={19} />
          </Link>

          {/* Primary CTA Button */}
          <Link to="/sell" className="btn btn-primary btn-sm">
            <PlusCircle size={16} />
            <span>Sell Motorcycle</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="hamburger-btn"
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
