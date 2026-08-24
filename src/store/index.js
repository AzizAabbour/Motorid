import { configureStore } from '@reduxjs/toolkit';
import motorcyclesReducer from '../features/motorcycles/motorcyclesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import messagesReducer from '../features/messages/messagesSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    motorcycles: motorcyclesReducer,
    favorites: favoritesReducer,
    messages: messagesReducer,
    ui: uiReducer
  }
});
