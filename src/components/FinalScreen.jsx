import { motion } from "framer-motion";
import siteConfig from "../data/siteConfig";
import "../styles/finalScreen.css";

export default function FinalScreen() {
  return (
    <div className="final-screen">
      <motion.h2
        className="final-screen-name"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {siteConfig.herName},
      </motion.h2>

      <motion.p
        className="final-screen-line"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        {siteConfig.finalLine1}
      </motion.p>

      <motion.p
        className="final-screen-line highlight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 1.2 }}
      >
        {siteConfig.finalLine2}
      </motion.p>

      <motion.p
        className="final-screen-line"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 1.8 }}
      >
        {siteConfig.finalLine3}
      </motion.p>

      <motion.p
        className="final-screen-line highlight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 2.4 }}
      >
        {siteConfig.finalline4}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 3.0, type: "spring", stiffness: 200 }}
      >
        <span className="final-screen-heart" aria-hidden="true">
          ❤️
        </span>
      </motion.div>

      <motion.p
        className="final-screen-closing"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 3.6 }}
      >
        {siteConfig.finalClosing}
      </motion.p>
    </div>
  );
}
