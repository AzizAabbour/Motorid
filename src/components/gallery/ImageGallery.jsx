import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ImageGallery({ images = [], alt = 'Motorcycle' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imageList = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-gallery-container">
      {/* Main Image Display */}
      <div className="gallery-main-wrap" onClick={() => setLightboxOpen(true)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={imageList[currentIndex]}
            alt={`${alt} view ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="gallery-main-img"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {imageList.length > 1 && (
          <>
            <button
              className="gallery-nav-btn gallery-nav-prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="gallery-nav-btn gallery-nav-next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Fullscreen Button */}
        <button
          className="gallery-expand-btn"
          onClick={() => setLightboxOpen(true)}
          aria-label="View Fullscreen"
          title="Fullscreen view"
        >
          <Maximize2 size={16} />
          <span>Fullscreen</span>
        </button>

        {/* Photo Counter Pill */}
        <div className="gallery-counter">
          {currentIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnail Bar */}
      {imageList.length > 1 && (
        <div className="gallery-thumbnails-row">
          {imageList.map((imgUrl, index) => (
            <button
              key={index}
              className={`gallery-thumb-btn ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show image ${index + 1}`}
            >
              <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
            <button
              className="lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>

            {imageList.length > 1 && (
              <>
                <button
                  className="lightbox-nav-btn lightbox-prev"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="lightbox-nav-btn lightbox-next"
                  onClick={handleNext}
                  aria-label="Next photo"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentIndex}
                src={imageList[currentIndex]}
                alt={alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                Photo {currentIndex + 1} of {imageList.length}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
