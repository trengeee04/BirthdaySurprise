import { useState } from "react";
import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import memories from "../data/memories";
import "../styles/memoryGallery.css";

function Polaroid({ memory, index }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const [imageError, setImageError] = useState(false);

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
    >
      {!imageError ? (
        <img
          className="memory-polaroid-image"
          src={memory.image}
          alt={memory.caption}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="memory-polaroid-placeholder">📷</div>
      )}
      <p className="memory-polaroid-caption">{memory.caption}</p>
    </motion.div>
  );
}

export default function MemoryGallery() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });

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
        <p>Some of my favorites...</p>
      </motion.div>

      <div className="memory-gallery-grid">
        {memories.map((memory, index) => (
          <Polaroid key={index} memory={memory} index={index} />
        ))}
      </div>
    </div>
  );
}
