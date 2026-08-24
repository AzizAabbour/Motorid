import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Search, Tag, DollarSign, Bike } from 'lucide-react';
import { setFilter } from '../../features/motorcycles/motorcyclesSlice';
import { BRANDS_DATA } from '../../data/brandsData';
import { MOTORCYCLE_TYPES } from '../../data/motorcyclesData';

export default function QuickSearchBar() {
  const [brand, setBrand] = useState('All');
  const [type, setType] = useState('All Types');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({
      brand,
      type,
      maxPrice: maxPrice ? Number(maxPrice) : '',
      search
    }));
    navigate('/motorcycles');
  };

  return (
    <div className="quick-search-card">
      <form onSubmit={handleSearch} className="quick-search-form">
        {/* Brand Dropdown */}
        <div className="quick-search-field">
          <label className="quick-search-label">
            <Tag size={14} color="var(--primary)" />
            <span>Brand</span>
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="quick-search-select"
          >
            <option value="All">All Brands</option>
            {BRANDS_DATA.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Motorcycle Type Dropdown */}
        <div className="quick-search-field">
          <label className="quick-search-label">
            <Bike size={14} color="var(--primary)" />
            <span>Category</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="quick-search-select"
          >
            {MOTORCYCLE_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Max Budget */}
        <div className="quick-search-field">
          <label className="quick-search-label">
            <DollarSign size={14} color="var(--primary)" />
            <span>Max Price</span>
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="quick-search-select"
          >
            <option value="">Any Budget</option>
            <option value="10000">Up to $10,000</option>
            <option value="15000">Up to $15,000</option>
            <option value="20000">Up to $20,000</option>
            <option value="30000">Up to $30,000</option>
            <option value="40000">Up to $40,000</option>
          </select>
        </div>

        {/* Keyword input */}
        <div className="quick-search-field quick-search-keyword">
          <label className="quick-search-label">
            <Search size={14} color="var(--primary)" />
            <span>Search Model</span>
          </label>
          <input
            type="text"
            placeholder="e.g. R1, Panigale, Ninja..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="quick-search-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-lg quick-search-btn">
          <Search size={18} />
          <span>Find Bikes</span>
        </button>
      </form>
    </div>
  );
}
