import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeartBurst from "./HeartBurst";
import "../styles/questionCard.css";

// Playful messages shown near the NO button when it escapes
const escapeMessages = [
  "Wait... what? 😭",
  "Are you sure? 👀",
  "I don't think that's the answer... 🥺",
  "Amrugaa pleaseeee...",
  "You KNOW the answer.",
  "That button has trust issues now 😂",
  "It's scared of you!",
  "Why are you like this 😭❤️",
  "The button is crying.",
  "You're really doing this huh? 😂",
  "It ran away from home.",
  "Come onnn 🥺",
  "Even the button knows the truth.",
  "It's hiding! Find it! 👀",
  "This is getting personal 😭",
  "The button filed a restraining order.",
  "Just click YES already 😌",
  "I'll wait forever if I have to 🥺",
];

export default function QuestionCard({ question, onYes }) {
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [noPosition, setNoPosition] = useState(null);
  const [noStyle, setNoStyle] = useState({ rotation: 0, scale: 1 });
  const [attemptCount, setAttemptCount] = useState(0);
  const [escapeMessage, setEscapeMessage] = useState(null);
  const [heartBurst, setHeartBurst] = useState(null);
  const [miniBounce, setMiniBounce] = useState(false);
  const escapeMessageTimer = useRef(null);
  const yesButtonRef = useRef(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (escapeMessageTimer.current) clearTimeout(escapeMessageTimer.current);
    };
  }, []);

  const getYesButtonRect = useCallback(() => {
    if (!yesButtonRef.current) return null;
    return yesButtonRef.current.getBoundingClientRect();
  }, []);

  // Check if a position overlaps the YES button
  const overlapsYes = useCallback(
    (x, y, btnW, btnH) => {
      const yesRect = getYesButtonRect();
      if (!yesRect) return false;
      const safeMargin = 20;
      return !(
        x + btnW + safeMargin < yesRect.left ||
        x - safeMargin > yesRect.right ||
        y + btnH + safeMargin < yesRect.top ||
        y - safeMargin > yesRect.bottom
      );
    },
    [getYesButtonRect]
  );

  const escapeNo = useCallback(() => {
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    const padding = 24;
    const buttonWidth = 160;
    const buttonHeight = 56;
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    // Try up to 20 times to find a spot that doesn't overlap YES
    let newX, newY;
    let tries = 0;
    do {
      newX = padding + Math.random() * Math.max(0, maxX - padding);
      newY = padding + Math.random() * Math.max(0, maxY - padding);
      tries++;
    } while (overlapsYes(newX, newY, buttonWidth, buttonHeight) && tries < 20);

    // Randomized style changes
    const rotationRange = Math.min(5 + newAttempt * 2, 25);
    const newRotation = -rotationRange + Math.random() * (rotationRange * 2);

    // Scale gets more dramatic with attempts
    let newScale;
    if (newAttempt <= 3) {
      newScale = 0.9 + Math.random() * 0.2; // subtle
    } else if (newAttempt <= 6) {
      newScale = 0.75 + Math.random() * 0.4; // more varied
    } else {
      newScale = 0.65 + Math.random() * 0.55; // increasingly silly
    }

    setNoPosition({ x: newX, y: newY });
    setNoStyle({ rotation: newRotation, scale: newScale });
    setNoTextIndex((prev) => (prev + 1) % question.noTexts.length);

    // Trigger mini bounce animation
    setMiniBounce(true);
    setTimeout(() => setMiniBounce(false), 400);

    // Show playful escape message
    const messageIndex = (newAttempt - 1) % escapeMessages.length;
    setEscapeMessage(escapeMessages[messageIndex]);

    // Clear previous timer
    if (escapeMessageTimer.current) clearTimeout(escapeMessageTimer.current);
    escapeMessageTimer.current = setTimeout(() => {
      setEscapeMessage(null);
    }, 2000);
  }, [attemptCount, question.noTexts.length, overlapsYes]);

  const handleYes = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      setHeartBurst({ x, y, id: Date.now() });

      setTimeout(() => {
        onYes();
      }, 500);
    },
    [onYes]
  );

  const handleNoInteraction = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      escapeNo();
    },
    [escapeNo]
  );

  const noText = question.noTexts[noTextIndex % question.noTexts.length];

  // Calculate animation spring based on attempt count
  const noSpring = {
    type: "spring",
    stiffness: 300 + attemptCount * 30,
    damping: 18 + attemptCount * 2,
    mass: 0.8,
  };

  return (
    <div className="question-card glass-card">
      <h2 className="question-card-text">{question.question}</h2>

      <div className="question-card-buttons">
        <motion.button
          ref={yesButtonRef}
          className="question-btn-yes"
          onClick={handleYes}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
        >
          {question.yesText}
        </motion.button>

        {/* Initial NO button — before first escape */}
        {!noPosition && (
          <motion.button
            className="question-btn-no"
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            onClick={handleNoInteraction}
            whileHover={{ scale: 1.05 }}
          >
            {noText}
          </motion.button>
        )}
      </div>

      {/* Escaped NO button — smooth animated fixed position */}
      <AnimatePresence>
        {noPosition && (
          <motion.button
            className={`question-btn-no is-escaping ${miniBounce ? "is-bouncing" : ""}`}
            animate={{
              left: noPosition.x,
              top: noPosition.y,
              rotate: noStyle.rotation,
              scale: noStyle.scale,
            }}
            transition={noSpring}
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            onClick={handleNoInteraction}
            style={{ position: "fixed" }}
          >
            {noText}
            {/* Mini heart that pops on escape */}
            <span className="no-btn-mini-heart" key={attemptCount} aria-hidden="true">
              💔
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Playful escape message */}
      <AnimatePresence>
        {escapeMessage && (
          <motion.div
            className="escape-message"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={attemptCount}
          >
            {escapeMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attempt counter — shows after 3+ attempts */}
      <AnimatePresence>
        {attemptCount >= 3 && (
          <motion.div
            className="escape-attempt-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {attemptCount} attempts... just click YES 😌
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart Burst */}
      {heartBurst && (
        <HeartBurst
          key={heartBurst.id}
          x={heartBurst.x}
          y={heartBurst.y}
          onComplete={() => setHeartBurst(null)}
        />
      )}
    </div>
  );
}
