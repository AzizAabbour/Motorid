import React from 'react';
import { Bike } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = Bike,
  title = 'No Motorcycles Found',
  description = 'Try changing your search keywords or resetting your active filters to see more results.',
  actionLabel = 'Reset All Filters',
  onAction,
  actionLink
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={36} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionLink ? (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      ) : onAction ? (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
