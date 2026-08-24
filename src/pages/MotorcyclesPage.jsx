import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ArrowUpDown } from 'lucide-react';
import MotorcycleGrid from '../components/motorcycle/MotorcycleGrid';
import MotorcycleFilterSidebar from '../components/motorcycle/MotorcycleFilterSidebar';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { setSortBy, resetFilters } from '../features/motorcycles/motorcyclesSlice';

export default function MotorcyclesPage() {
  const { items, filters } = useSelector(state => state.motorcycles);
  const dispatch = useDispatch();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredMotorcycles = useMemo(() => {
    let result = items.filter(m => m.status === 'active');

    if (filters.brand && filters.brand !== 'All') {
      result = result.filter(m => m.brand === filters.brand);
    }
    if (filters.type && filters.type !== 'All Types') {
      result = result.filter(m => m.type === filters.type);
    }
    if (filters.condition && filters.condition !== 'All Conditions') {
      result = result.filter(m => m.condition === filters.condition);
    }
    if (filters.transmission && filters.transmission !== 'All Transmissions') {
      result = result.filter(m => m.transmission?.toLowerCase().includes(filters.transmission.toLowerCase().replace('all transmissions', '')));
    }
    if (filters.fuelType && filters.fuelType !== 'All Fuel Types') {
      result = result.filter(m => m.fuelType === filters.fuelType);
    }
    if (filters.minPrice) {
      result = result.filter(m => m.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      result = result.filter(m => m.price <= filters.maxPrice);
    }
    if (filters.minYear) {
      result = result.filter(m => m.year >= filters.minYear);
    }
    if (filters.maxYear) {
      result = result.filter(m => m.year <= filters.maxYear);
    }
    if (filters.maxMileage) {
      result = result.filter(m => m.mileage <= filters.maxMileage);
    }
    if (filters.location) {
      result = result.filter(m => m.location?.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(m =>
        m.model?.toLowerCase().includes(term) ||
        m.brand?.toLowerCase().includes(term) ||
        m.description?.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage-low':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage-high':
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [items, filters]);

  return (
    <div className="section-padding">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Motorcycles' }]} />

        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '4px' }}>Browse Motorcycles</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Discover your dream bike from our curated marketplace.
            </p>
          </div>
          <button
            className="btn btn-outline btn-sm mobile-filter-toggle-btn"
            onClick={() => setMobileFilterOpen(true)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="motorcycles-page-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="filter-sidebar">
            <MotorcycleFilterSidebar />
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <>
                <motion.div
                  className="mobile-filter-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFilterOpen(false)}
                />
                <motion.div
                  className="mobile-filter-drawer"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 16px 20px', borderBottom: '1px solid var(--border-light)', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Filters</h3>
                    <button onClick={() => setMobileFilterOpen(false)} style={{ display: 'flex', padding: '4px' }}>
                      <X size={20} />
                    </button>
                  </div>
                  <div style={{ padding: '0 20px' }}>
                    <MotorcycleFilterSidebar isMobile onCloseMobile={() => setMobileFilterOpen(false)} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Results Column */}
          <div className="motorcycles-results-col">
            <div className="results-topbar">
              <div className="results-count">
                Showing <strong>{filteredMotorcycles.length}</strong> motorcycle{filteredMotorcycles.length !== 1 ? 's' : ''}
              </div>
              <div className="results-sort-group">
                <ArrowUpDown size={14} color="var(--text-muted)" />
                <label>Sort by:</label>
                <select
                  className="results-sort-select"
                  value={filters.sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Lowest Price</option>
                  <option value="price-high">Highest Price</option>
                  <option value="mileage-low">Lowest Mileage</option>
                  <option value="mileage-high">Highest Mileage</option>
                </select>
              </div>
            </div>

            <MotorcycleGrid
              motorcycles={filteredMotorcycles}
              columns={3}
              emptyTitle="No Motorcycles Found"
              emptyDesc="Try clearing your search terms or expanding your filter criteria."
              onResetFilters={() => dispatch(resetFilters())}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
