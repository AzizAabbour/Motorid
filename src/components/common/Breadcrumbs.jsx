import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={14} color="#94a3b8" />
            {isLast || !item.path ? (
              <span style={{ color: 'var(--dark-blue-900)', fontWeight: 600 }}>{item.label}</span>
            ) : (
              <Link to={item.path} style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
