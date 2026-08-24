import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  Bike,
  Shield,
  Users,
  Star,
  TrendingUp,
  ChevronRight,
  Zap,
  MapPin,
  Award,
  CheckCircle2,
  Search,
  Globe
} from 'lucide-react';
import MotorcycleGrid from '../components/motorcycle/MotorcycleGrid';
import QuickSearchBar from '../components/motorcycle/QuickSearchBar';
import { BRANDS_DATA } from '../data/brandsData';
import { setFilter } from '../features/motorcycles/motorcyclesSlice';

// Animated counter component
const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const duration = 1800;
      const startTime = Date.now();

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress >= 1) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const MOTORCYCLE_CATEGORIES = [
  { label: 'Superbike', icon: Zap, filterValue: 'Superbike' },
  { label: 'Sport', icon: TrendingUp, filterValue: 'Sport' },
  { label: 'Naked', icon: Bike, filterValue: 'Naked' },
  { label: 'Adventure', icon: Globe, filterValue: 'Adventure' },
  { label: 'Cruiser', icon: MapPin, filterValue: 'Cruiser' },
  { label: 'Touring', icon: MapPin, filterValue: 'Touring' }
];

export default function HomePage() {
  const allMotorcycles = useSelector(state => state.motorcycles.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const featuredMotorcycles = allMotorcycles.filter(m => m.featured && m.status === 'active').slice(0, 8);
  const latestMotorcycles = allMotorcycles.filter(m => m.status === 'active').slice(0, 8);

  // Count bikes per brand
  const getBrandCount = (brandName) => allMotorcycles.filter(m => m.brand === brandName && m.status === 'active').length;

  // Count bikes per category
  const getCategoryCount = (type) => allMotorcycles.filter(m => m.type === type && m.status === 'active').length;

  const handleCategoryClick = (filterValue) => {
    dispatch(setFilter({ type: filterValue }));
    navigate('/motorcycles');
  };

  const handleBrandClick = (brandName) => {
    dispatch(setFilter({ brand: brandName }));
    navigate('/motorcycles');
  };

  return (
    <div>
      {/* ======== HERO SECTION ======== */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-bg-glow-2" />
        <div className="container hero-inner">
          {/* Left Content */}
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <div className="hero-tag">
                <Star size={14} />
                <span>Premium Motorcycle Marketplace</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="hero-title">
              Find Your Perfect <span>Motorcycle</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="hero-subtitle">
              Discover, compare and buy premium motorcycles from trusted sellers. Explore thousands of verified listings across Yamaha, Ducati, Kawasaki, Honda, and Aprilia.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="hero-buttons">
              <Link to="/motorcycles" className="btn btn-primary btn-lg">
                <Search size={18} />
                <span>Explore Motorcycles</span>
              </Link>
              <Link to="/sell" className="btn btn-outline-white btn-lg">
                <span>Sell Your Motorcycle</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="hero-stats-row">
              <div className="hero-stat-item">
                <div className="hero-stat-value">10K+</div>
                <div className="hero-stat-label">Motorcycles</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-value">5K+</div>
                <div className="hero-stat-label">Verified Sellers</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-value">15K+</div>
                <div className="hero-stat-label">Happy Riders</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            className="hero-image-col"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
                alt="Premium Motorcycle"
              />
              <motion.div
                className="hero-image-float-badge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="float-icon">
                  <Shield size={20} />
                </div>
                <div className="float-text">
                  <h4>Verified Listings</h4>
                  <p>100% trusted & inspected</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======== QUICK SEARCH BAR ======== */}
      <section className="quick-search-section container">
        <QuickSearchBar />
      </section>

      {/* ======== POPULAR BRANDS ======== */}
      <section className="section-padding" style={{ paddingTop: '24px' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <span className="section-tag"><Award size={14} /> Top Brands</span>
            <h2 className="section-title">Popular Brands</h2>
            <p className="section-subtitle">Explore motorcycles from the world's most iconic manufacturers.</p>
          </motion.div>

          <div className="brands-showcase">
            {BRANDS_DATA.map((brand, i) => (
              <motion.div
                key={brand.id}
                className="brand-showcase-item"
                onClick={() => handleBrandClick(brand.name)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="brand-showcase-logo" style={{ borderColor: brand.color }}>
                  {brand.name.charAt(0)}
                </div>
                <span className="brand-showcase-name">{brand.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{getBrandCount(brand.name)} bikes</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FEATURED MOTORCYCLES ======== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '100%', textAlign: 'left', marginBottom: '32px' }}>
            <div>
              <span className="section-tag"><Star size={14} /> Handpicked</span>
              <h2 className="section-title">Featured Motorcycles</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>Premium selections verified by our expert team.</p>
            </div>
            <Link to="/motorcycles" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <MotorcycleGrid motorcycles={featuredMotorcycles} columns={4} />
        </div>
      </section>

      {/* ======== MOTORCYCLE CATEGORIES ======== */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <span className="section-tag"><Bike size={14} /> Categories</span>
            <h2 className="section-title">Browse by Type</h2>
            <p className="section-subtitle">Find the exact type of riding machine that matches your style.</p>
          </motion.div>

          <div className="categories-grid">
            {MOTORCYCLE_CATEGORIES.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <motion.div
                  key={cat.label}
                  className="category-card"
                  onClick={() => handleCategoryClick(cat.filterValue)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="category-icon-wrap">
                    <CatIcon size={24} />
                  </div>
                  <div className="category-label">{cat.label}</div>
                  <div className="category-count">{getCategoryCount(cat.filterValue)} bikes</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== STATS SECTION ======== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: Bike, value: 10000, suffix: '+', label: 'Motorcycles Listed' },
              { icon: Users, value: 5000, suffix: '+', label: 'Verified Sellers' },
              { icon: Star, value: 15000, suffix: '+', label: 'Happy Customers' },
              { icon: Award, value: 5, suffix: '', label: 'Major Brands' }
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
                  <div className="stat-number">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== LATEST MOTORCYCLES ======== */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '100%', textAlign: 'left', marginBottom: '32px' }}>
            <div>
              <span className="section-tag"><TrendingUp size={14} /> Recently Added</span>
              <h2 className="section-title">Latest Motorcycles</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>Fresh listings just uploaded by verified sellers.</p>
            </div>
            <Link to="/motorcycles" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
              Browse All <ChevronRight size={16} />
            </Link>
          </div>
          <MotorcycleGrid motorcycles={latestMotorcycles} columns={4} />
        </div>
      </section>

      {/* ======== ABOUT TEASER ======== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div
            className="about-teaser-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
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
              <span className="section-tag"><Shield size={14} /> About MotoMarket</span>
              <h2>The Marketplace Built for Real Riders</h2>
              <p>
                MotoMarket connects passionate motorcycle enthusiasts with verified sellers, creating a premium buying and selling experience. Every listing is reviewed, every seller is verified.
              </p>

              <div className="about-features-grid">
                {['Verified Sellers Only', 'Secure Transactions', 'Expert Support Team', 'Quality Guarantee'].map(feat => (
                  <div key={feat} className="about-feature-item">
                    <div className="feature-check">
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn btn-primary">
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======== CTA BANNER ======== */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to Sell Your Motorcycle?</h2>
            <p>Join thousands of sellers on MotoMarket. List your bike in minutes and connect with serious buyers.</p>
            <div className="cta-banner-buttons">
              <Link to="/sell" className="btn btn-dark btn-lg">
                Start Selling Now <ArrowRight size={18} />
              </Link>
              <Link to="/motorcycles" className="btn btn-outline-white btn-lg">
                Explore Marketplace
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
