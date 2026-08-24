import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { BRANDS_DATA } from '../data/brandsData';
import { setFilter, resetFilters } from '../features/motorcycles/motorcyclesSlice';

export default function BrandsPage() {
  const allMotorcycles = useSelector(state => state.motorcycles.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBrandCount = (brandName) =>
    allMotorcycles.filter(m => m.brand === brandName && m.status === 'active').length;

  const handleExploreBrand = (brandName) => {
    dispatch(resetFilters());
    dispatch(setFilter({ brand: brandName }));
    navigate('/motorcycles');
  };

  return (
    <div className="section-padding">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Brands' }]} />

        <motion.div
          style={{ textAlign: 'center', marginBottom: '40px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag"><Globe size={14} /> Global Brands</span>
          <h1 className="section-title">Popular Motorcycle Brands</h1>
          <p className="section-subtitle">
            Explore premium motorcycles from the world's most iconic manufacturers.
          </p>
        </motion.div>

        <div className="brands-grid">
          {BRANDS_DATA.map((brand, i) => (
            <motion.div
              key={brand.id}
              className="brand-page-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="brand-card-hero">
                <img src={brand.heroImage} alt={brand.name} />
                <div className="brand-card-logo-circle" style={{ color: brand.color }}>
                  {brand.name.charAt(0)}
                </div>
              </div>

              <div className="brand-card-body">
                <div className="brand-card-name">{brand.name}</div>
                <div className="brand-card-tagline">"{brand.tagline}"</div>
                <p className="brand-card-desc">{brand.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <MapPin size={13} color="var(--primary)" /> {brand.country} · Founded {brand.founded}
                </div>

                <div className="brand-card-models">
                  {brand.popularModels.slice(0, 4).map(model => (
                    <span key={model} className="brand-card-model-tag">{model}</span>
                  ))}
                </div>

                <div className="brand-card-footer">
                  <span className="brand-card-count">
                    <strong>{getBrandCount(brand.name)}</strong> bikes available
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleExploreBrand(brand.name)}
                  >
                    Explore <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
