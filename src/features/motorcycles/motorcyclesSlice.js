import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_MOTORCYCLES } from '../../data/motorcyclesData';

const loadSavedMotorcycles = () => {
  try {
    const saved = localStorage.getItem('motomarket_listings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading motorcycles from localStorage:', e);
  }
  return INITIAL_MOTORCYCLES;
};

const initialFilters = {
  search: '',
  brand: 'All',
  model: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  type: 'All Types',
  condition: 'All Conditions',
  transmission: 'All Transmissions',
  fuelType: 'All Fuel Types',
  maxMileage: '',
  location: '',
  sortBy: 'newest' // 'newest' | 'oldest' | 'price-low' | 'price-high' | 'mileage-low' | 'mileage-high'
};

const motorcyclesSlice = createSlice({
  name: 'motorcycles',
  initialState: {
    items: loadSavedMotorcycles(),
    filters: initialFilters,
    myListingsStatusFilter: 'all' // 'all' | 'active' | 'pending' | 'sold'
  },
  reducers: {
    addMotorcycle: (state, action) => {
      state.items.unshift(action.payload);
      try {
        localStorage.setItem('motomarket_listings', JSON.stringify(state.items));
      } catch (e) {
        console.error(e);
      }
    },
    updateMotorcycle: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        try {
          localStorage.setItem('motomarket_listings', JSON.stringify(state.items));
        } catch (e) {
          console.error(e);
        }
      }
    },
    deleteMotorcycle: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      try {
        localStorage.setItem('motomarket_listings', JSON.stringify(state.items));
      } catch (e) {
        console.error(e);
      }
    },
    markAsSold: (state, action) => {
      const moto = state.items.find(item => item.id === action.payload);
      if (moto) {
        moto.status = 'sold';
        try {
          localStorage.setItem('motomarket_listings', JSON.stringify(state.items));
        } catch (e) {
          console.error(e);
        }
      }
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setMyListingsStatusFilter: (state, action) => {
      state.myListingsStatusFilter = action.payload;
    }
  }
});

export const {
  addMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
  markAsSold,
  setFilter,
  resetFilters,
  setSortBy,
  setMyListingsStatusFilter
} = motorcyclesSlice.actions;

export default motorcyclesSlice.reducer;
