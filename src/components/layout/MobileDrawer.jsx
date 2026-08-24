import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bike,
  X,
  Home,
  Grid,
  Tag,
  PlusCircle,
  Info,
  Phone,
  Heart,
  User,
  MessageSquare
} from 'lucide-react';
import { setMobileMenuOpen } from '../../features/ui/uiSlice';

export default function MobileDrawer() {
  const isOpen = useSelector(state => state.ui.mobileMenuOpen);
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();
  const location = useLocation();

  // Close drawer whenever the route changes
  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
  }, [location.pathname, dispatch]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-drawer-overlay"
            onClick={() => dispatch(setMobileMenuOpen(false))}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="mobile-drawer"
          >
            <div className="mobile-drawer-header">
              <Link to="/" className="logo" onClick={() => dispatch(setMobileMenuOpen(false))}>
                <div className="logo-icon-wrap">
                  <Bike size={20} />
                </div>
                <span className="logo-text">Moto<span>Market</span></span>
              </Link>
              <button
                className="btn-icon-sm"
                onClick={() => dispatch(setMobileMenuOpen(false))}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/motorcycles"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Grid size={18} />
                  <span>Motorcycles</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Tag size={18} />
                  <span>Brands</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Heart size={18} />
                  <span style={{ flexGrow: 1 }}>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="badge badge-featured">{favorites.length}</span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/messages"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Info size={18} />
                  <span>About Us</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Phone size={18} />
                  <span>Contact</span>
                </NavLink>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
              <Link
                to="/sell"
                className="btn btn-primary w-full"
                onClick={() => dispatch(setMobileMenuOpen(false))}
              >
                <PlusCircle size={18} />
                <span>Sell Your Motorcycle</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
