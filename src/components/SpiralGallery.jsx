import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useInView from "../hooks/useInView";
import InfiniteSpiral from "./InfiniteSpiral";
import spiralImages from "../data/spiralImages";
import "../styles/spiralGallery.css";
import "../styles/memoryGallery.css"; // Reuse lightbox styles

export default function SpiralGallery() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = useCallback((index) => {
    setActiveImageIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const nextImage = useCallback((e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % spiralImages.length);
  }, []);

  const prevImage = useCallback((e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + spiralImages.length) % spiralImages.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage(e);
      if (e.key === "ArrowLeft") prevImage(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, closeLightbox, nextImage, prevImage]);

  if (spiralImages.length === 0) return null;

  return (
    <div className="spiral-gallery">
      <motion.div
        ref={headerRef}
        className="spiral-gallery-header"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Every single version of you I fell in LOVE with 💫</h2>
        <p>Hover to pause, drag to explore :3</p>
      </motion.div>

      <div className="spiral-gallery-container">
        <InfiniteSpiral
          items={spiralImages}
          animationMode="all"
          speed={0.55}
          radius={170}
          cardWidth={140}
          cardHeight={140}
          verticalSpacing={60}
          perspective={1000}
          cardRadius={12}
          centerScale={1.2}
          edgeBlur={6}
          cardsPerTurn={7}
          pauseOnHover
          onItemClick={openLightbox}
        />
      </div>

      <AnimatePresence>
        {activeImageIndex !== null && createPortal(
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
                ✕
              </button>

              <button className="lightbox-nav lightbox-nav-prev" onClick={prevImage} aria-label="Previous">
                ‹
              </button>

              <div className="lightbox-media">
                <img
                  className="lightbox-image"
                  src={spiralImages[activeImageIndex].src}
                  alt={spiralImages[activeImageIndex].alt}
                />
              </div>

              <button className="lightbox-nav lightbox-nav-next" onClick={nextImage} aria-label="Next">
                ›
              </button>

              <p className="lightbox-caption">{spiralImages[activeImageIndex].alt}</p>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
