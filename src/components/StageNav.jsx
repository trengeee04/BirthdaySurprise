import { motion, AnimatePresence } from "framer-motion";
import "../styles/stageNav.css";

const stageLabels = [
  "Welcome",
  "Music",
  "Letter",
  "Questions",
  "Transition",
  "Finale",
];

export default function StageNav({ stage, goToStage, maxStage = 5 }) {
  const canGoBack = stage > 0;
  const canGoForward = stage < maxStage;

  return (
    <AnimatePresence>
      <motion.div
        className="stage-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.button
          className="stage-nav-btn"
          onClick={() => goToStage(stage - 1)}
          disabled={!canGoBack}
          whileHover={canGoBack ? { scale: 1.15 } : {}}
          whileTap={canGoBack ? { scale: 0.9 } : {}}
          aria-label="Go back"
        >
          <span className="stage-nav-icon">💕</span>
          <span className="stage-nav-arrow">‹</span>
        </motion.button>

        <div className="stage-nav-dots">
          {stageLabels.map((label, i) => (
            <button
              key={i}
              className={`stage-nav-dot ${i === stage ? "active" : ""} ${i <= stage ? "visited" : ""}`}
              onClick={() => goToStage(i)}
              aria-label={`Go to ${label}`}
              title={label}
            />
          ))}
        </div>

        <motion.button
          className="stage-nav-btn"
          onClick={() => goToStage(stage + 1)}
          disabled={!canGoForward}
          whileHover={canGoForward ? { scale: 1.15 } : {}}
          whileTap={canGoForward ? { scale: 0.9 } : {}}
          aria-label="Go forward"
        >
          <span className="stage-nav-arrow">›</span>
          <span className="stage-nav-icon">💕</span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
