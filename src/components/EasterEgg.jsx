import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import siteConfig from "../data/siteConfig";

export default function EasterEgg() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <>
      <button
        className="easter-egg-heart"
        onClick={handleClick}
        aria-label="Secret message"
        title="Click me!"
      >
        💗
        <span className="easter-egg-hint">click me for a surprise :)</span>
      </button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="easter-egg-message"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {siteConfig.easterEggMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
