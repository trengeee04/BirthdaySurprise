import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import FloatingHearts from "./components/FloatingHearts";
import SparkleTrail from "./components/SparkleTrail";
import EasterEgg from "./components/EasterEgg";
import WelcomeScreen from "./components/WelcomeScreen";
import MusicPrompt from "./components/MusicPrompt";
import MusicPlayer from "./components/MusicPlayer";
import LoveLetter from "./components/LoveLetter";
import QuestionJourney from "./components/QuestionJourney";
import TransitionScreen from "./components/TransitionScreen";
import FinalLetter from "./components/FinalLetter";
import VideoSection from "./components/VideoSection";
import MemoryGallery from "./components/MemoryGallery";
import FinalScreen from "./components/FinalScreen";

// Hooks
import useAudioPlayer from "./hooks/useAudioPlayer";

/*
  Stage Flow:
  0 = Welcome Screen
  1 = Music Prompt
  2 = Love Letter (scrollable)
  3 = Question Journey
  4 = Transition Screen
  5 = Final Letter + Video + Gallery + Final Screen (scrollable)
*/

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.6,
  ease: "easeInOut",
};

export default function App() {
  const [stage, setStage] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const player = useAudioPlayer();

  const goToStage = useCallback((nextStage) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setStage(nextStage);
  }, []);

  const handleWelcomeStart = useCallback(() => {
    goToStage(1);
  }, [goToStage]);

  const handleMusicPlay = useCallback(() => {
    player.play();
    setMusicEnabled(true);
    goToStage(2);
  }, [player, goToStage]);

  const handleMusicSkip = useCallback(() => {
    goToStage(2);
  }, [goToStage]);

  const handleLetterContinue = useCallback(() => {
    goToStage(3);
  }, [goToStage]);

  const handleQuestionsComplete = useCallback(() => {
    goToStage(4);
  }, [goToStage]);

  const handleTransitionContinue = useCallback(() => {
    goToStage(5);
  }, [goToStage]);

  return (
    <>
      {/* Background Elements — always visible */}
      <FloatingHearts />
      <SparkleTrail />

      {/* Easter Egg — visible after welcome */}
      {stage >= 2 && <EasterEgg />}

      {/* Music Player — visible after music prompt */}
      {(musicEnabled || stage >= 2) && <MusicPlayer player={player} />}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <WelcomeScreen onStart={handleWelcomeStart} />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="music-prompt"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <MusicPrompt onPlay={handleMusicPlay} onSkip={handleMusicSkip} />
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="love-letter"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoveLetter onContinue={handleLetterContinue} />
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="questions"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <QuestionJourney onComplete={handleQuestionsComplete} />
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div
            key="transition"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <TransitionScreen onContinue={handleTransitionContinue} />
          </motion.div>
        )}

        {stage === 5 && (
          <motion.div
            key="finale"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <FinalLetter />
            <VideoSection />
            <MemoryGallery />
            <FinalScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
