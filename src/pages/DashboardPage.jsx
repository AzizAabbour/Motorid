import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Bike, Heart, MessageSquare, Settings,
  PlusCircle, Eye, Edit, Trash2, CheckCircle2, Clock, Tag,
  TrendingUp, Star, User
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { deleteMotorcycle, markAsSold, setMyListingsStatusFilter } from '../features/motorcycles/motorcyclesSlice';
import { addToast } from '../features/ui/uiSlice';
import { formatPrice } from '../utils/formatters';

const DASHBOARD_TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'listings', label: 'My Listings', icon: Bike },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const allMotorcycles = useSelector(state => state.motorcycles.items);
  const favoriteIds = useSelector(state => state.favorites.items);
  const conversations = useSelector(state => state.messages.conversations);
  const statusFilter = useSelector(state => state.motorcycles.myListingsStatusFilter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // "My Listings" = listings whose seller id is seller-user, OR just show all for demo purposes
  const myListings = allMotorcycles.filter(m => m.seller?.id === 'seller-user' || m.seller?.name?.includes('My Listing'));
  const filteredListings = statusFilter === 'all'
    ? myListings
    : myListings.filter(m => m.status === statusFilter);

  const activeCount = myListings.filter(m => m.status === 'active').length;
  const soldCount = myListings.filter(m => m.status === 'sold').length;
  const unreadMsgCount = conversations.reduce((a, c) => a + (c.unreadCount || 0), 0);

  const handleDelete = (id) => {
    dispatch(deleteMotorcycle(id));
    dispatch(addToast({ message: 'Listing deleted successfully.', type: 'success' }));
    setDeleteConfirm(null);
  };

  const handleMarkSold = (id) => {
    dispatch(markAsSold(id));
    dispatch(addToast({ message: 'Listing marked as sold!', type: 'success' }));
  };

  const renderOverview = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Dashboard Overview</h2>
      <div className="dashboard-overview-cards">
        {[
          { label: 'Active Listings', value: activeCount, icon: Bike, bg: 'var(--primary-light)', color: 'var(--primary)' },
          { label: 'Sold Motorcycles', value: soldCount, icon: CheckCircle2, bg: 'var(--status-success-bg)', color: 'var(--status-success)' },
          { label: 'Saved Favorites', value: favoriteIds.length, icon: Heart, bg: '#fef2f2', color: 'var(--status-danger)' },
          { label: 'Messages', value: unreadMsgCount, icon: MessageSquare, bg: 'var(--secondary-light)', color: 'var(--secondary)' }
        ].map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="dash-stat-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="dash-stat-card-header">
                <div className="dash-stat-card-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                  <StatIcon size={20} />
                </div>
              </div>
              <div className="dash-stat-card-value">{stat.value}</div>
              <div className="dash-stat-card-label">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link to="/sell" className="btn btn-primary">
          <PlusCircle size={16} /> Create New Listing
        </Link>
        <button className="btn btn-outline" onClick={() => setActiveTab('listings')}>
          View My Listings
        </button>
      </div>
    </motion.div>
  );

  const renderMyListings = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="listing-table-wrap">
        <div className="listing-table-header">
          <h3>My Listings</h3>
          <div className="listing-status-tabs">
            {['all', 'active', 'pending', 'sold'].map(status => (
              <button
                key={status}
                className={`listing-status-tab ${statusFilter === status ? 'active' : ''}`}
                onClick={() => dispatch(setMyListingsStatusFilter(status))}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredListings.length > 0 ? (
          filteredListings.map(listing => (
            <div key={listing.id} className="listing-row">
              <img
                src={listing.images?.[0] || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=300&q=80'}
                alt={listing.model}
                className="listing-row-img"
              />
              <div className="listing-row-info">
                <div className="listing-row-title">{listing.year} {listing.brand} {listing.model}</div>
                <div className="listing-row-subtitle">
                  <span className={`badge badge-status-${listing.status}`}>{listing.status}</span>
                  {' · '}{listing.location}
                </div>
              </div>
              <div className="listing-row-price">{formatPrice(listing.price)}</div>
              <div className="listing-row-actions">
                <button
                  className="btn btn-ghost btn-icon-sm"
                  title="View Listing"
                  onClick={() => navigate(`/motorcycles/${listing.id}`)}
                >
                  <Eye size={16} />
                </button>
                {listing.status !== 'sold' && (
                  <button
                    className="btn btn-ghost btn-icon-sm"
                    title="Mark as Sold"
                    onClick={() => handleMarkSold(listing.id)}
                    style={{ color: 'var(--status-success)' }}
                  >
                    <CheckCircle2 size={16} />
                  </button>
                )}
                <button
                  className="btn btn-ghost btn-icon-sm"
                  title="Delete Listing"
                  onClick={() => setDeleteConfirm(listing.id)}
                  style={{ color: 'var(--status-danger)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px' }}>
            <EmptyState
              icon={Bike}
              title="No Listings Yet"
              description="You haven't listed any motorcycles for sale. Create your first listing now!"
              actionLabel="Create Listing"
              actionLink="/sell"
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Listing"
      >
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Are you sure you want to permanently delete this listing? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </Modal>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'listings': return renderMyListings();
      case 'favorites': return (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Your Favorites</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>You have {favoriteIds.length} saved motorcycle(s).</p>
          <Link to="/favorites" className="btn btn-primary">
            <Heart size={16} /> View All Favorites
          </Link>
        </div>
      );
      case 'messages': return (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Messages</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>You have {conversations.length} conversation(s).</p>
          <Link to="/messages" className="btn btn-primary">
            <MessageSquare size={16} /> Open Messages
          </Link>
        </div>
      );
      case 'settings': return (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Account Settings</h2>
          <div className="card" style={{ padding: '24px', maxWidth: '500px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" defaultValue="John Rider" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" defaultValue="john.rider@motomarket.io" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" type="tel" defaultValue="+1 (555) 000-0000" />
            </div>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      );
      default: return renderOverview();
    }
  };

  return (
    <div className="section-padding">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Dashboard' }]} />

        <div className="dashboard-layout">
          {/* Sidebar */}
          <aside className="dashboard-sidebar">
            <div className="dashboard-user-info">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="User"
                className="dashboard-avatar"
              />
              <div className="dashboard-user-name">John Rider</div>
              <div className="dashboard-user-email">john.rider@motomarket.io</div>
            </div>

            <ul className="dashboard-nav-list">
              {DASHBOARD_TABS.map(tab => {
                const TabIcon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      className={`dashboard-nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <TabIcon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="dashboard-content">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
