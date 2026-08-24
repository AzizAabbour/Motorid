import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Heart, Share2, Phone, MessageCircle, Calendar, Gauge, Zap, Fuel,
  MapPin, Shield, Star, CheckCircle2, Clock, ArrowRight, Palette, Settings2, Tag
} from 'lucide-react';
import ImageGallery from '../components/gallery/ImageGallery';
import Breadcrumbs from '../components/common/Breadcrumbs';
import MotorcycleGrid from '../components/motorcycle/MotorcycleGrid';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { startConversationWithSeller } from '../features/messages/messagesSlice';
import { addToast } from '../features/ui/uiSlice';
import { formatPrice, formatMileage } from '../utils/formatters';

export default function MotorcycleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMotorcycles = useSelector(state => state.motorcycles.items);
  const favorites = useSelector(state => state.favorites.items);

  const motorcycle = allMotorcycles.find(m => m.id === id);

  if (!motorcycle) {
    return (
      <div className="section-padding container">
        <div className="empty-state">
          <h3 className="empty-state-title">Motorcycle Not Found</h3>
          <p className="empty-state-desc">The listing may have been removed or the URL is incorrect.</p>
          <Link to="/motorcycles" className="btn btn-primary">Browse All Motorcycles</Link>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(motorcycle.id);
  const seller = motorcycle.seller || {};

  // Get similar motorcycles (same brand or type, exclude current)
  const similarMotorcycles = allMotorcycles
    .filter(m => m.id !== motorcycle.id && m.status === 'active' && (m.brand === motorcycle.brand || m.type === motorcycle.type))
    .slice(0, 4);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(motorcycle.id));
    dispatch(addToast({
      message: isFavorite ? `Removed ${motorcycle.model} from favorites.` : `Saved ${motorcycle.model} to favorites!`,
      type: isFavorite ? 'info' : 'success'
    }));
  };

  const handleMessageSeller = () => {
    dispatch(startConversationWithSeller({
      motorcycle,
      seller,
      initialMessage: `Hi! I'm interested in the ${motorcycle.year} ${motorcycle.brand} ${motorcycle.model} listed at ${formatPrice(motorcycle.price)}. Is it still available?`
    }));
    dispatch(addToast({ message: 'Chat started with seller!', type: 'success' }));
    navigate('/messages');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    dispatch(addToast({ message: 'Link copied to clipboard!', type: 'info' }));
  };

  const specs = [
    { icon: Calendar, label: 'Year', value: motorcycle.year },
    { icon: Gauge, label: 'Mileage', value: formatMileage(motorcycle.mileage) },
    { icon: Zap, label: 'Engine', value: `${motorcycle.engine} cc` },
    { icon: Zap, label: 'Power', value: motorcycle.horsepower ? `${motorcycle.horsepower} HP` : '—' },
    { icon: Settings2, label: 'Transmission', value: motorcycle.transmission || '—' },
    { icon: Fuel, label: 'Fuel', value: motorcycle.fuelType || 'Petrol' },
    { icon: Palette, label: 'Color', value: motorcycle.color || '—' },
    { icon: Tag, label: 'Type', value: motorcycle.type || '—' },
    { icon: Shield, label: 'Condition', value: motorcycle.condition },
    { icon: MapPin, label: 'Location', value: motorcycle.location }
  ];

  return (
    <div className="section-padding" style={{ paddingTop: '16px' }}>
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Motorcycles', path: '/motorcycles' },
          { label: `${motorcycle.brand} ${motorcycle.model}` }
        ]} />

        <div className="details-layout">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ImageGallery
              images={motorcycle.images}
              alt={`${motorcycle.year} ${motorcycle.brand} ${motorcycle.model}`}
            />
          </motion.div>

          {/* Right: Info Panel */}
          <motion.div
            className="details-info-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div>
              <span className="details-brand-tag" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
                <Tag size={12} /> {motorcycle.brand} · {motorcycle.type}
              </span>
            </div>

            <h1 className="details-title">
              {motorcycle.year} {motorcycle.brand} {motorcycle.model}
            </h1>

            <div className="details-price-block">
              <span className="details-price">{formatPrice(motorcycle.price)}</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>USD</span>
            </div>

            {/* Specs Grid */}
            <div className="details-specs-grid">
              {specs.map((spec, i) => {
                const SpecIcon = spec.icon;
                return (
                  <div key={i} className="details-spec-card">
                    <div className="spec-icon"><SpecIcon size={18} /></div>
                    <div className="spec-text">
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="details-action-btns">
              <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={handleMessageSeller}>
                <MessageCircle size={16} /> Message Seller
              </button>
              <a href={`tel:${seller.phone || ''}`} className="btn btn-outline" style={{ flexGrow: 1 }}>
                <Phone size={16} /> Call Seller
              </a>
              <button
                className={`btn ${isFavorite ? 'btn-danger' : 'btn-ghost'} btn-icon`}
                onClick={handleToggleFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Save'}
              >
                <Heart size={18} fill={isFavorite ? '#ffffff' : 'transparent'} />
              </button>
              <button className="btn btn-ghost btn-icon" onClick={handleShare} title="Share listing">
                <Share2 size={18} />
              </button>
            </div>

            {/* Seller Card */}
            <div className="seller-card">
              <div className="seller-card-header">
                <img
                  src={seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={seller.name}
                  className="seller-avatar"
                />
                <div>
                  <div className="seller-name">{seller.name || 'Seller'}</div>
                  <div className="seller-meta">
                    <MapPin size={12} /> {seller.location || motorcycle.location}
                    {seller.verified && (
                      <span className="verified-badge-inline">
                        <Shield size={12} /> Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="seller-stats-row">
                <div className="seller-stat">
                  <div className="seller-stat-value"><Star size={14} color="var(--status-warning)" /> {seller.rating || '4.9'}</div>
                  <div className="seller-stat-label">Rating</div>
                </div>
                <div className="seller-stat">
                  <div className="seller-stat-value">{seller.reviewsCount || 0}</div>
                  <div className="seller-stat-label">Reviews</div>
                </div>
                <div className="seller-stat">
                  <div className="seller-stat-value" style={{ fontSize: '13px' }}>{seller.responseTime || '—'}</div>
                  <div className="seller-stat-label">Response</div>
                </div>
              </div>

              <div className="seller-action-btns">
                <button className="btn btn-primary w-full" onClick={handleMessageSeller}>
                  <MessageCircle size={16} /> Send Message
                </button>
                <a href={`tel:${seller.phone || ''}`} className="btn btn-outline w-full">
                  <Phone size={16} /> {seller.phone || 'Call Seller'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div
          className="details-description-section"
          style={{ marginTop: '36px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3>Description</h3>
          <p>{motorcycle.description}</p>

          {motorcycle.features && motorcycle.features.length > 0 && (
            <>
              <h3 style={{ marginTop: '24px' }}>Key Features</h3>
              <ul className="details-features-list">
                {motorcycle.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>

        {/* Similar Motorcycles */}
        {similarMotorcycles.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Similar Motorcycles</h2>
              <Link to="/motorcycles" className="btn btn-outline btn-sm">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <MotorcycleGrid motorcycles={similarMotorcycles} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}
