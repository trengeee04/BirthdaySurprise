import { useState } from "react";
import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import siteConfig from "../data/siteConfig";
import "../styles/videoSection.css";

export default function VideoSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="video-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="video-section-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h3>{siteConfig.videoIntro}</h3>
          <p>{siteConfig.videoButton}</p>
        </motion.div>

        <motion.div
          className="video-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {!videoError ? (
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={siteConfig.videoPoster}
              onError={() => setVideoError(true)}
            >
              <source src={siteConfig.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-placeholder">
              <span className="video-placeholder-icon">🎬</span>
              <span className="video-placeholder-text">
                Add your video to: public/assets/videos/
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
