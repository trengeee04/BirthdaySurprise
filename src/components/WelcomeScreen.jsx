import { motion } from "framer-motion";
import siteConfig from "../data/siteConfig";
import "../styles/welcome.css";

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      {/* Birthday Emojis Row */}
      <motion.div
        className="welcome-birthday-emojis"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
        aria-hidden="true"
      >
        🎈🎂🎉
      </motion.div>

      <motion.h1
        className="welcome-greeting"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {siteConfig.welcomeGreeting}
      </motion.h1>

      <motion.p
        className="welcome-subtext"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {siteConfig.welcomeSubtext}
      </motion.p>

      {/* Birthday sparkle line */}
      <motion.p
        className="welcome-birthday-wish"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        ✨ It's your day, and you deserve the world ✨
      </motion.p>

      <motion.button
        className="welcome-button"
        onClick={onStart}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {siteConfig.welcomeButton}
      </motion.button>
    </div>
  );
}
