import { motion } from "framer-motion";
import siteConfig from "../data/siteConfig";
import "../styles/questionCard.css";

export default function TransitionScreen({ onContinue }) {
  return (
    <div className="transition-screen">
      <motion.p
        className="transition-screen-line"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {siteConfig.transitionLine1}
      </motion.p>

      <motion.p
        className="transition-screen-line"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        {siteConfig.transitionLine2}
      </motion.p>

      <motion.p
        className="transition-screen-line"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        {siteConfig.transitionLine3}
      </motion.p>

      <motion.button
        className="transition-screen-btn"
        onClick={onContinue}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {siteConfig.transitionButton}
      </motion.button>
    </div>
  );
}
