import React from 'react';
import { motion } from 'framer-motion';
import MotorcycleCard from './MotorcycleCard';
import EmptyState from '../common/EmptyState';

export default function MotorcycleGrid({
  motorcycles = [],
  columns = 4, // 3 or 4
  emptyTitle = 'No Motorcycles Found',
  emptyDesc = 'Try clearing your search terms or expanding your filter criteria.',
  onResetFilters
}) {
  if (!motorcycles || motorcycles.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDesc}
        onAction={onResetFilters}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: columns === 3
      ? 'repeat(auto-fill, minmax(320px, 1fr))'
      : 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={gridStyle}
    >
      {motorcycles.map((motorcycle) => (
        <motion.div key={motorcycle.id} variants={itemVariants}>
          <MotorcycleCard motorcycle={motorcycle} />
        </motion.div>
      ))}
    </motion.div>
  );
}
