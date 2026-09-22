import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import InfiniteSpiral from "./InfiniteSpiral";
import memories from "../data/memories";
import "../styles/spiralGallery.css";

// Convert the existing memories data format to InfiniteSpiral's expected format
const spiralItems = memories.map((memory) => ({
  src: memory.image,
  alt: memory.caption,
}));

export default function SpiralGallery() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3 });

  if (spiralItems.length === 0) return null;

  return (
    <div className="spiral-gallery">
      <motion.div
        ref={headerRef}
        className="spiral-gallery-header"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Memories in Motion 💫</h2>
        <p>Hover to pause, drag to explore</p>
      </motion.div>

      <div className="spiral-gallery-container">
        <InfiniteSpiral
          items={spiralItems}
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
        />
      </div>
    </div>
  );
}
