import { motion } from "framer-motion";
import siteConfig from "../data/siteConfig";
import "../styles/welcome.css";

export default function MusicPrompt({ onPlay, onSkip }) {
  return (
    <motion.div
      className="music-prompt-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="music-prompt-card glass-card"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <span className="music-prompt-icon">🎧</span>
        <p className="music-prompt-text">{siteConfig.musicPromptText}</p>
        <div className="music-prompt-buttons">
          <button className="music-prompt-play" onClick={onPlay}>
            {siteConfig.musicPlayButton}
          </button>
          <button className="music-prompt-skip" onClick={onSkip}>
            {siteConfig.musicSkipButton}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
