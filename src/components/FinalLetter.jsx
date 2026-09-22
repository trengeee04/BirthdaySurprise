import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import finalLetter from "../data/finalLetter";
import "../styles/finalScreen.css";

function AnimatedParagraph({ text, index }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <motion.p
      ref={ref}
      className="final-letter-paragraph"
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      {text}
    </motion.p>
  );
}

export default function FinalLetter() {
  return (
    <div className="final-letter">
      <div className="final-letter-content">
        <motion.h2
          className="final-letter-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {finalLetter.greeting}
        </motion.h2>

        <motion.p
          className="final-letter-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {finalLetter.intro}
        </motion.p>

        {finalLetter.paragraphs.map((para, index) => (
          <AnimatedParagraph key={index} text={para} index={index} />
        ))}

        <motion.p
          className="final-letter-ending"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {finalLetter.ending}
        </motion.p>

        <motion.div
          className="final-letter-signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="final-letter-signature-line">{finalLetter.signature}</p>
          <p className="final-letter-signature-name">
            {finalLetter.signatureName}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
