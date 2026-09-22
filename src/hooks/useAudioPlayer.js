import { useState, useRef, useEffect, useCallback } from "react";
import playlist from "../data/playlist";

export default function useAudioPlayer() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Auto-play next song
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };
    const handleError = () => {
      console.warn("Audio playback error — skipping to next track");
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;

    const song = playlist[currentIndex];
    if (!song) return;

    audio.src = song.src;
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {
        // Browser blocked autoplay
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.src || audio.src === window.location.href) {
      // No source loaded yet — load first track
      if (playlist.length > 0) {
        audio.src = playlist[currentIndex].src;
        audio.load();
      }
    }

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  }, [currentIndex]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, []);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((newVolume) => {
    setVolume(newVolume);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playTrack = useCallback((index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    }, 100);
  }, []);

  const currentSong = playlist[currentIndex] || { title: "No songs", artist: "" };

  return {
    currentSong,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    changeVolume,
    toggleMute,
    playTrack,
    playlist,
  };
}
