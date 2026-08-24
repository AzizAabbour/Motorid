import { createSlice } from '@reduxjs/toolkit';

const loadSavedFavorites = () => {
  try {
    const saved = localStorage.getItem('motomarket_favorites');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading favorites from localStorage:', e);
  }
  // Default favorite some bikes
  return ['moto-1', 'moto-2'];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadSavedFavorites()
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const motoId = action.payload;
      const index = state.items.indexOf(motoId);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(motoId);
      }
      try {
        localStorage.setItem('motomarket_favorites', JSON.stringify(state.items));
      } catch (e) {
        console.error(e);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
      try {
        localStorage.setItem('motomarket_favorites', JSON.stringify(state.items));
      } catch (e) {
        console.error(e);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      try {
        localStorage.removeItem('motomarket_favorites');
      } catch (e) {
        console.error(e);
      }
    }
  }
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
