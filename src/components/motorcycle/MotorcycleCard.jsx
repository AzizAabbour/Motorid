import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Gauge, Calendar, Zap, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { addToast } from '../../features/ui/uiSlice';
import { formatPrice, formatMileage } from '../../utils/formatters';

export default function MotorcycleCard({ motorcycle }) {
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();
  const isFavorite = favorites.includes(motorcycle.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(motorcycle.id));
    dispatch(addToast({
      message: isFavorite
        ? `Removed ${motorcycle.model} from saved favorites.`
        : `Saved ${motorcycle.model} to your favorites!`,
      type: isFavorite ? 'info' : 'success'
    }));
  };

  const getConditionBadgeClass = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'new':
        return 'badge-condition-new';
      case 'certified pre-owned':
        return 'badge-condition-certified';
      default:
        return 'badge-condition-used';
    }
  };

  const mainImage = motorcycle.images && motorcycle.images.length > 0
    ? motorcycle.images[0]
    : 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div
      className="moto-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Image Wrap */}
      <div className="moto-card-image-wrap">
        <img
          src={mainImage}
          alt={`${motorcycle.year} ${motorcycle.brand} ${motorcycle.model}`}
          className="moto-card-img"
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="moto-card-badges">
          {motorcycle.featured && (
            <span className="badge badge-featured">
              ★ Featured
            </span>
          )}
          <span className={`badge ${getConditionBadgeClass(motorcycle.condition)}`}>
            {motorcycle.condition}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          className={`btn-favorite moto-card-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          aria-label="Toggle favorite"
        >
          <Heart size={18} fill={isFavorite ? 'var(--status-danger)' : 'transparent'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="moto-card-body">
        <div className="moto-card-brand-year">
          <span>{motorcycle.brand}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{motorcycle.year}</span>
        </div>

        <h3 className="moto-card-title" title={`${motorcycle.brand} ${motorcycle.model}`}>
          <Link to={`/motorcycles/${motorcycle.id}`}>
            {motorcycle.model}
          </Link>
        </h3>

        <div className="moto-card-price-row">
          <span className="moto-card-price">{formatPrice(motorcycle.price)}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>USD</span>
        </div>

        {/* Key Specs Grid */}
        <div className="moto-card-specs-grid">
          <div className="moto-spec-item">
            <span className="moto-spec-label">
              <Gauge size={12} /> Mileage
            </span>
            <span className="moto-spec-value">{formatMileage(motorcycle.mileage)}</span>
          </div>
          <div className="moto-spec-item">
            <span className="moto-spec-label">
              <Zap size={12} /> Engine
            </span>
            <span className="moto-spec-value">{motorcycle.engine} cc</span>
          </div>
          <div className="moto-spec-item">
            <span className="moto-spec-label">
              <Calendar size={12} /> Power
            </span>
            <span className="moto-spec-value">{motorcycle.horsepower ? `${motorcycle.horsepower} HP` : motorcycle.type}</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="moto-card-footer">
          <div className="moto-card-location">
            <MapPin size={13} color="var(--primary)" />
            <span>{motorcycle.location}</span>
          </div>
          <Link to={`/motorcycles/${motorcycle.id}`} className="btn btn-outline btn-sm">
            <span>Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
