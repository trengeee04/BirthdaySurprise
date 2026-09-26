import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useInView from "../hooks/useInView";
import memories from "../data/memories";
import "../styles/memoryGallery.css";

function Polaroid({ memory, index, onClick }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const [mediaError, setMediaError] = useState(false);
  const isVideo = memory.type === "video";

  return (
    <motion.div
      ref={ref}
      className="memory-polaroid"
      initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -3 : 2 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 1.5 }
          : { opacity: 0, y: 30 }
      }
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onClick={() => onClick(index)}
    >
      {!mediaError ? (
        isVideo ? (
          <div className="memory-polaroid-video-wrapper">
            <video
              className="memory-polaroid-image"
              src={`${memory.src}#t=0.001`}
              muted
              playsInline
              preload="metadata"
              onError={() => setMediaError(true)}
            />
            <span className="memory-polaroid-play-badge" aria-hidden="true">▶</span>
          </div>
        ) : (
          <img
            className="memory-polaroid-image"
            src={memory.src}
            alt={memory.caption}
            loading="lazy"
            onError={() => setMediaError(true)}
          />
        )
      ) : (
        <div className="memory-polaroid-placeholder">
          {isVideo ? "🎬" : "📷"}
        </div>
      )}
      <p className="memory-polaroid-caption">{memory.caption}</p>
    </motion.div>
  );
}

function Lightbox({ memory, onClose, onPrev, onNext }) {
  const isVideo = memory.type === "video";

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-content"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <button className="lightbox-nav lightbox-nav-prev" onClick={onPrev} aria-label="Previous">
          ‹
        </button>

        <div className="lightbox-media">
          {isVideo ? (
            <video
              className="lightbox-video"
              src={memory.src}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              className="lightbox-image"
              src={memory.src}
              alt={memory.caption}
            />
          )}
        </div>

        <button className="lightbox-nav lightbox-nav-next" onClick={onNext} aria-label="Next">
          ›
        </button>

        <p className="lightbox-caption">{memory.caption}</p>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function MemoryGallery() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + memories.length) % memories.length
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % memories.length
    );
  }, []);

  if (memories.length === 0) return null;

  return (
    <div className="memory-gallery">
      <motion.div
        ref={headerRef}
        className="memory-gallery-header"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Our Little Moments 📸</h2>
        <p>Tap any memory to open it ❤️</p>
      </motion.div>

      <div className="memory-gallery-grid">
        {memories.map((memory, index) => (
          <Polaroid
            key={index}
            memory={memory}
            index={index}
            onClick={openLightbox}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            key="lightbox"
            memory={memories[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
