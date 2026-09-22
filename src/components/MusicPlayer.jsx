import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/musicPlayer.css";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ player }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const {
    currentSong,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    next,
    prev,
    seek,
    changeVolume,
    toggleMute,
    playTrack,
    playlist,
  } = player;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  return (
    <div className="music-player">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="music-player-panel"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            {/* Now Playing */}
            <div className="music-player-now-playing">
              <div className="music-player-label">These songs reminds me of you :3 🎶</div>
              <div className="music-player-title">{currentSong.title}</div>
              <div className="music-player-artist">{currentSong.artist}</div>
            </div>

            {/* Progress Bar */}
            <div className="music-player-progress">
              <div
                className="music-player-progress-bar"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Song progress"
                aria-valuenow={currentTime}
                aria-valuemin={0}
                aria-valuemax={duration}
                tabIndex={0}
              >
                <div
                  className="music-player-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="music-player-time">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="music-player-controls">
              <button
                className="music-player-btn"
                onClick={prev}
                aria-label="Previous track"
              >
                ⏮
              </button>
              <button
                className="music-player-btn music-player-btn-main"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                className="music-player-btn"
                onClick={next}
                aria-label="Next track"
              >
                ⏭
              </button>
            </div>

            {/* Volume */}
            <div className="music-player-volume">
              <button
                className="music-player-volume-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
              </button>
              <input
                type="range"
                className="music-player-volume-slider"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                aria-label="Volume"
              />
            </div>

            {/* Playlist Toggle */}
            <button
              className="music-player-playlist-toggle"
              onClick={() => setShowPlaylist(!showPlaylist)}
            >
              {showPlaylist ? "Hide Playlist ▲" : "Show Playlist ▼"}
            </button>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  className="music-player-playlist"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {playlist.map((song, index) => (
                    <button
                      key={index}
                      className={`music-player-playlist-item ${index === currentIndex ? "active" : ""
                        }`}
                      onClick={() => playTrack(index)}
                    >
                      <span className="music-player-playlist-item-indicator">
                        {index === currentIndex && isPlaying ? "♪" : ""}
                      </span>
                      <div className="music-player-playlist-item-info">
                        <div className="music-player-playlist-item-title">
                          {song.title}
                        </div>
                        <div className="music-player-playlist-item-artist">
                          {song.artist}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        className={`music-player-toggle ${isPlaying ? "is-playing" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close music player" : "Open music player"}
      >
        {isOpen ? "✕" : "🎵"}
      </button>
    </div>
  );
}
