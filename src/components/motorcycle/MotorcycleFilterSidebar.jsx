import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filter, RotateCcw, Search, DollarSign, Calendar, Gauge, Zap } from 'lucide-react';
import { setFilter, resetFilters } from '../../features/motorcycles/motorcyclesSlice';
import { BRANDS_DATA } from '../../data/brandsData';
import {
  MOTORCYCLE_TYPES,
  MOTORCYCLE_CONDITIONS,
  TRANSMISSION_TYPES,
  FUEL_TYPES
} from '../../data/motorcyclesData';

export default function MotorcycleFilterSidebar({ isMobile = false, onCloseMobile }) {
  const filters = useSelector(state => state.motorcycles.filters);
  const dispatch = useDispatch();

  const handleFilterChange = (field, value) => {
    dispatch(setFilter({ [field]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="filter-sidebar-content">
      <div className="filter-sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Filter Search</h3>
        </div>
        <button
          onClick={handleReset}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--text-muted)', fontSize: '12px' }}
        >
          <RotateCcw size={13} />
          <span>Reset All</span>
        </button>
      </div>

      {/* Keyword / Model Search */}
      <div className="form-group">
        <label className="form-label">
          <Search size={13} /> Search Keyword / Model
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Fireblade, SP, Akrapovic..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      {/* Brand Select */}
      <div className="form-group">
        <label className="form-label">Brand</label>
        <select
          className="form-select"
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        >
          <option value="All">All Brands</option>
          {BRANDS_DATA.map(b => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Motorcycle Type / Category */}
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          {MOTORCYCLE_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div className="form-group">
        <label className="form-label">Condition</label>
        <select
          className="form-select"
          value={filters.condition}
          onChange={(e) => handleFilterChange('condition', e.target.value)}
        >
          {MOTORCYCLE_CONDITIONS.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="form-group">
        <label className="form-label">
          <DollarSign size={13} /> Price Range ($)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input
            type="number"
            className="form-input"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : '')}
          />
          <input
            type="number"
            className="form-input"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : '')}
          />
        </div>
      </div>

      {/* Year Range */}
      <div className="form-group">
        <label className="form-label">
          <Calendar size={13} /> Year Range
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input
            type="number"
            className="form-input"
            placeholder="Min Year"
            min="1990"
            max="2026"
            value={filters.minYear}
            onChange={(e) => handleFilterChange('minYear', e.target.value ? Number(e.target.value) : '')}
          />
          <input
            type="number"
            className="form-input"
            placeholder="Max Year"
            min="1990"
            max="2026"
            value={filters.maxYear}
            onChange={(e) => handleFilterChange('maxYear', e.target.value ? Number(e.target.value) : '')}
          />
        </div>
      </div>

      {/* Max Mileage */}
      <div className="form-group">
        <label className="form-label">
          <Gauge size={13} /> Max Mileage (km)
        </label>
        <input
          type="number"
          className="form-input"
          placeholder="e.g. 10000"
          value={filters.maxMileage}
          onChange={(e) => handleFilterChange('maxMileage', e.target.value ? Number(e.target.value) : '')}
        />
      </div>

      {/* Transmission */}
      <div className="form-group">
        <label className="form-label">Transmission</label>
        <select
          className="form-select"
          value={filters.transmission}
          onChange={(e) => handleFilterChange('transmission', e.target.value)}
        >
          {TRANSMISSION_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Fuel Type */}
      <div className="form-group">
        <label className="form-label">Fuel Type</label>
        <select
          className="form-select"
          value={filters.fuelType}
          onChange={(e) => handleFilterChange('fuelType', e.target.value)}
        >
          {FUEL_TYPES.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="form-label">Location (City / State)</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Los Angeles, CA"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>

      {isMobile && (
        <button
          onClick={onCloseMobile}
          className="btn btn-primary w-full"
          style={{ marginTop: '12px' }}
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}
