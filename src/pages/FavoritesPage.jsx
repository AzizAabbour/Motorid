import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import MotorcycleGrid from '../components/motorcycle/MotorcycleGrid';
import EmptyState from '../components/common/EmptyState';
import { clearFavorites } from '../features/favorites/favoritesSlice';
import { addToast } from '../features/ui/uiSlice';

export default function FavoritesPage() {
  const allMotorcycles = useSelector(state => state.motorcycles.items);
  const favoriteIds = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();

  const favoriteMotorcycles = allMotorcycles.filter(m => favoriteIds.includes(m.id));

  const handleClearAll = () => {
    dispatch(clearFavorites());
    dispatch(addToast({ message: 'All favorites cleared.', type: 'info' }));
  };

  return (
    <div className="section-padding">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Favorites' }]} />

        <div className="favorites-header">
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={28} color="var(--status-danger)" />
              Saved Motorcycles
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {favoriteMotorcycles.length} motorcycle{favoriteMotorcycles.length !== 1 ? 's' : ''} in your wishlist.
            </p>
          </div>
          {favoriteMotorcycles.length > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={handleClearAll} style={{ color: 'var(--status-danger)' }}>
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {favoriteMotorcycles.length > 0 ? (
          <MotorcycleGrid motorcycles={favoriteMotorcycles} columns={4} />
        ) : (
          <EmptyState
            icon={Heart}
            title="No Saved Motorcycles Yet"
            description="When you find motorcycles you love, tap the heart icon to save them here for later."
            actionLabel="Browse Motorcycles"
            actionLink="/motorcycles"
          />
        )}
      </div>
    </div>
  );
}
