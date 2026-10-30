import { useMusic } from "../contexts/MusicContext";
import { useEffect, useRef } from "react";

export const MusicPlayer = () => {
  const {
    currentSong,
    currentTime,
    formatTime,
    duration,
    setDuration,
    setCurrentTime,
    nextSong,
    prevSong,
    isPlaying,
    play,
    pause,
    volume,
    setVolume,
  } = useMusic();

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleTimeEnded = () => {
      nextSong();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleTimeEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleTimeEnded);
    };
  }, [setDuration, setCurrentTime, nextSong, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
  }, [currentSong, setCurrentTime, setDuration]);

  const handleTimeUpdate = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error(err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong?.url}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <div className="track-info">
        <h3 className="track-title">{currentSong?.title}</h3>
        <p className="track-artist">{currentSong?.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleTimeUpdate}
          className="progress-bar"
          style={{ "--progress": `${progressPercentage}%` }}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={prevSong}>
          ⏮
        </button>
        <button
          className="control-btn play-btn"
          onClick={() => (isPlaying ? pause() : play())}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="control-btn" onClick={nextSong}>
          ⏭
        </button>
      </div>

      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-bar"
        />
      </div>
    </div>
  );
};
