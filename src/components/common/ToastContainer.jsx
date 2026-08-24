import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { removeToast } from '../../features/ui/uiSlice';

const ToastItem = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 3500);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="var(--status-success)" />;
      case 'error':
        return <AlertCircle size={18} color="var(--status-danger)" />;
      case 'warning':
        return <AlertCircle size={18} color="var(--status-warning)" />;
      default:
        return <Info size={18} color="var(--primary)" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`toast toast-${toast.type || 'info'}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
        {getIcon()}
        <span>{toast.message}</span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', padding: '2px' }}
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default function ToastContainer() {
  const toasts = useSelector(state => state.ui.toasts);
  const dispatch = useDispatch();

  const handleDismiss = (id) => {
    dispatch(removeToast(id));
  };

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={handleDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}
