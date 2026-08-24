import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
    toasts: []
  },
  reducers: {
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    addToast: (state, action) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      const { message, type = 'info', duration = 3500 } = action.payload;
      state.toasts.push({ id, message, type, duration });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    }
  }
});

export const {
  setMobileMenuOpen,
  toggleMobileMenu,
  addToast,
  removeToast
} = uiSlice.actions;

export default uiSlice.reducer;
