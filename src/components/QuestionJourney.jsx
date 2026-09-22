import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import questions from "../data/questions";
import yesResponses from "../data/yesResponses";
import "../styles/questionCard.css";

const cardTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function QuestionJourney({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleYes = useCallback(() => {
    const response = yesResponses[currentIndex % yesResponses.length];
    setResponseText(response);
    setShowResponse(true);

    // Show response briefly, then move to next question in one step
    setTimeout(() => {
      setShowResponse(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete();
      }
    }, 1000);
  }, [currentIndex, onComplete]);

  return (
    <div className="question-journey">
      <AnimatePresence mode="wait">
        {showResponse ? (
          <motion.div
            key="response"
            className="question-yes-response"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {responseText}
          </motion.div>
        ) : (
          <motion.div
            key={`q-${currentIndex}`}
            {...cardTransition}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <QuestionCard
              question={questions[currentIndex]}
              onYes={handleYes}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
