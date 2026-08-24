import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, Upload, X, Trash2, Image as ImageIcon,
  Bike, Gauge, Calendar, DollarSign, Zap, Fuel, MapPin, Settings2,
  FileText, Eye, PartyPopper
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { addMotorcycle } from '../features/motorcycles/motorcyclesSlice';
import { addToast } from '../features/ui/uiSlice';
import { BRANDS_DATA } from '../data/brandsData';
import { MOTORCYCLE_TYPES, MOTORCYCLE_CONDITIONS, FUEL_TYPES } from '../data/motorcyclesData';
import { formatPrice, formatMileage } from '../utils/formatters';

const STEPS = [
  { label: 'Basics', icon: Bike },
  { label: 'Specs', icon: Zap },
  { label: 'Location', icon: MapPin },
  { label: 'Photos', icon: ImageIcon },
  { label: 'Description', icon: FileText },
  { label: 'Preview', icon: Eye }
];

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
];

export default function SellMotorcyclePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [published, setPublished] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: '', model: '', year: 2024, price: '', mileage: '',
    engine: '', horsepower: '', transmission: '6-Speed Manual', fuelType: 'Petrol',
    type: 'Sport', condition: 'Used', color: '',
    country: '', city: '', address: '',
    images: [...DEFAULT_IMAGES],
    description: '',
    features: ''
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addDemoImage = () => {
    const demoImages = [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=1200&q=80'
    ];
    const unused = demoImages.find(img => !form.images.includes(img));
    if (unused) {
      setForm(prev => ({ ...prev, images: [...prev.images, unused] }));
    } else {
      dispatch(addToast({ message: 'Maximum demo images reached!', type: 'warning' }));
    }
  };

  const goNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handlePublish = () => {
    const newMoto = {
      id: 'moto-user-' + Date.now(),
      brand: form.brand || 'Yamaha',
      model: form.model || 'Custom Listing',
      year: Number(form.year) || 2024,
      price: Number(form.price) || 10000,
      mileage: Number(form.mileage) || 0,
      engine: Number(form.engine) || 600,
      horsepower: Number(form.horsepower) || 0,
      transmission: form.transmission,
      fuelType: form.fuelType,
      type: form.type,
      color: form.color || 'Black',
      condition: form.condition,
      location: [form.city, form.country].filter(Boolean).join(', ') || 'United States',
      images: form.images.length > 0 ? form.images : DEFAULT_IMAGES,
      description: form.description || 'A beautiful motorcycle in excellent condition.',
      features: form.features ? form.features.split('\n').filter(Boolean) : [],
      featured: false,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      seller: {
        id: 'seller-user',
        name: 'You (My Listing)',
        phone: '+1 (555) 000-0000',
        email: 'user@motomarket.io',
        location: [form.city, form.country].filter(Boolean).join(', ') || 'United States',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        reviewsCount: 0,
        verified: true,
        memberSince: 'Today',
        responseTime: 'Instant'
      }
    };

    dispatch(addMotorcycle(newMoto));
    dispatch(addToast({ message: 'Your motorcycle has been published successfully! 🎉', type: 'success' }));
    setPublished(true);

    // Confetti
    import('canvas-confetti').then(confetti => {
      confetti.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }).catch(() => {});
  };

  if (published) {
    return (
      <div className="section-padding">
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--status-success-bg)', color: 'var(--status-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <PartyPopper size={40} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Listing Published! 🎉</h2>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Your motorcycle is now live on MotoMarket. Buyers can view it immediately!
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/motorcycles')} className="btn btn-primary btn-lg">
                <Bike size={18} /> Browse Marketplace
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn btn-outline btn-lg">
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return (
        <div>
          <h3 className="sell-form-title">Basic Information</h3>
          <p className="sell-form-desc">Tell us about your motorcycle.</p>
          <div className="sell-form-grid">
            <div className="form-group">
              <label className="form-label">Brand <span className="required">*</span></label>
              <select className="form-select" value={form.brand} onChange={(e) => updateField('brand', e.target.value)}>
                <option value="">Select Brand</option>
                {BRANDS_DATA.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Model <span className="required">*</span></label>
              <input className="form-input" placeholder="e.g. YZF-R1, Ninja ZX-10R" value={form.model} onChange={(e) => updateField('model', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Year <span className="required">*</span></label>
              <input className="form-input" type="number" min="1990" max="2026" value={form.year} onChange={(e) => updateField('year', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Price (USD) <span className="required">*</span></label>
              <input className="form-input" type="number" placeholder="e.g. 15000" value={form.price} onChange={(e) => updateField('price', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Mileage (km)</label>
              <input className="form-input" type="number" placeholder="e.g. 5000" value={form.mileage} onChange={(e) => updateField('mileage', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Condition</label>
              <select className="form-select" value={form.condition} onChange={(e) => updateField('condition', e.target.value)}>
                {MOTORCYCLE_CONDITIONS.filter(c => c !== 'All Conditions').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      );
      case 1: return (
        <div>
          <h3 className="sell-form-title">Technical Specifications</h3>
          <p className="sell-form-desc">Share the technical details of your motorcycle.</p>
          <div className="sell-form-grid">
            <div className="form-group">
              <label className="form-label">Engine Size (cc)</label>
              <input className="form-input" type="number" placeholder="e.g. 998" value={form.engine} onChange={(e) => updateField('engine', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Horsepower (HP)</label>
              <input className="form-input" type="number" placeholder="e.g. 200" value={form.horsepower} onChange={(e) => updateField('horsepower', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Transmission</label>
              <input className="form-input" placeholder="e.g. 6-Speed Manual with QS" value={form.transmission} onChange={(e) => updateField('transmission', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Fuel Type</label>
              <select className="form-select" value={form.fuelType} onChange={(e) => updateField('fuelType', e.target.value)}>
                {FUEL_TYPES.filter(f => f !== 'All Fuel Types').map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Motorcycle Category</label>
              <select className="form-select" value={form.type} onChange={(e) => updateField('type', e.target.value)}>
                {MOTORCYCLE_TYPES.filter(t => t !== 'All Types').map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Color</label>
              <input className="form-input" placeholder="e.g. Racing Red" value={form.color} onChange={(e) => updateField('color', e.target.value)} />
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div>
          <h3 className="sell-form-title">Location</h3>
          <p className="sell-form-desc">Where is the motorcycle located?</p>
          <div className="sell-form-grid">
            <div className="form-group">
              <label className="form-label">Country</label>
              <input className="form-input" placeholder="e.g. United States" value={form.country} onChange={(e) => updateField('country', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="e.g. Los Angeles" value={form.city} onChange={(e) => updateField('city', e.target.value)} />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '8px' }}>
            <label className="form-label">Address / Meetup Location (Optional)</label>
            <input className="form-input" placeholder="e.g. 123 Main St" value={form.address} onChange={(e) => updateField('address', e.target.value)} />
          </div>
        </div>
      );
      case 3: return (
        <div>
          <h3 className="sell-form-title">Photos</h3>
          <p className="sell-form-desc">Upload high-quality photos. The first image will be the main listing photo.</p>
          <div className="image-upload-zone" onClick={addDemoImage}>
            <Upload size={36} color="var(--primary)" />
            <p style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--dark-blue-800)' }}>Click to add a demo photo</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supports JPG, PNG, WebP (max 10 MB each)</p>
          </div>

          {form.images.length > 0 && (
            <div className="upload-previews-grid">
              {form.images.map((img, index) => (
                <div key={index} className={`upload-preview-item ${index === 0 ? 'primary-img' : ''}`}>
                  <img src={img} alt={`Upload ${index + 1}`} />
                  {index === 0 && (
                    <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'var(--primary)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                      MAIN
                    </span>
                  )}
                  <button className="remove-preview-btn" onClick={() => removeImage(index)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      case 4: return (
        <div>
          <h3 className="sell-form-title">Description</h3>
          <p className="sell-form-desc">Write a compelling description to attract buyers.</p>
          <div className="form-group">
            <label className="form-label">Detailed Description</label>
            <textarea
              className="form-textarea"
              rows={6}
              placeholder="Describe the motorcycle's condition, history, modifications, upgrades, reason for selling..."
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Key Features (one per line)</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder={"Akrapovič titanium exhaust\nBrembo brakes\nFull service history\nNever dropped"}
              value={form.features}
              onChange={(e) => updateField('features', e.target.value)}
            />
          </div>
        </div>
      );
      case 5: return (
        <div>
          <h3 className="sell-form-title">Preview Your Listing</h3>
          <p className="sell-form-desc">This is how your listing will appear on MotoMarket.</p>
          <div className="card" style={{ padding: '24px', marginTop: '16px' }}>
            {form.images.length > 0 && (
              <img src={form.images[0]} alt="Preview" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '20px' }} />
            )}
            <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              {form.brand || 'Brand'} · {form.year}
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
              {form.model || 'Model Name'}
            </h3>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px' }}>
              {formatPrice(Number(form.price) || 0)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
              <div><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Engine</span><br/><strong>{form.engine || '—'} cc</strong></div>
              <div><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mileage</span><br/><strong>{formatMileage(Number(form.mileage) || 0)}</strong></div>
              <div><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Type</span><br/><strong>{form.type}</strong></div>
            </div>
            {form.description && (
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {form.description.substring(0, 200)}{form.description.length > 200 ? '...' : ''}
              </p>
            )}
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="section-padding">
      <div className="container sell-wizard-container">
        <Breadcrumbs items={[{ label: 'Sell Your Motorcycle' }]} />

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '4px' }}>Sell Your Motorcycle</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Complete the steps below to publish your listing.</p>
        </div>

        {/* Step Progress */}
        <div className="sell-wizard-progress">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`sell-step-item ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
              onClick={() => { if (i < currentStep) setCurrentStep(i); }}
              style={{ cursor: i < currentStep ? 'pointer' : 'default' }}
            >
              <div className="sell-step-circle">
                {i < currentStep ? <Check size={16} /> : i + 1}
              </div>
              <span className="sell-step-label">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="sell-form-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {renderStepContent()}

            <div className="sell-form-nav">
              <button
                className="btn btn-ghost"
                onClick={goBack}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
              >
                <ArrowLeft size={16} /> Back
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button className="btn btn-primary" onClick={goNext}>
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button className="btn btn-primary btn-lg" onClick={handlePublish}>
                  <PartyPopper size={18} /> Publish Motorcycle
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
