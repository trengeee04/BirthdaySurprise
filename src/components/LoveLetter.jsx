import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import loveLetter from "../data/loveLetter";
import siteConfig from "../data/siteConfig";
import "../styles/loveLetter.css";

function LetterCard({ section, index }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      className="love-letter-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    >
      <h3 className="love-letter-card-title">{section.title}</h3>
      <p className="love-letter-card-text">{section.text}</p>
    </motion.div>
  );
}

export default function LoveLetter({ onContinue }) {
  return (
    <div className="love-letter">
      <div className="section-container">
        <motion.div
          className="love-letter-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>A few things I want you to know... 💌</h2>
          <p>Scroll gently ❤️</p>
        </motion.div>

        {loveLetter.map((section, index) => (
          <div key={index}>
            <LetterCard section={section} index={index} />
            {index < loveLetter.length - 1 && (
              <div className="love-letter-divider">♡ ♡ ♡</div>
            )}
          </div>
        ))}

        <motion.div
          className="love-letter-continue"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="love-letter-continue-btn"
            onClick={onContinue}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Now I have some questions for you 👀
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
