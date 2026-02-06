import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService, { API_CONFIG } from '../services/api';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  X,
  Loader,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Check,
  Info
} from 'lucide-react';
import '../css/VideoPlayer.css';

const VideoPlayer = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressUpdateIntervalRef = useRef(null);

  // Content state
  const [content, setContent] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  // Progress tracking
  const [watchProgress, setWatchProgress] = useState(0);
  const [lastSavedProgress, setLastSavedProgress] = useState(0);

  // Load content on mount
  useEffect(() => {
    loadContent();
    return () => {
      // Save progress on unmount
      if (videoRef.current && content) {
        saveProgress();
      }
      // Clear intervals
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
    };
  }, [type, id]);

  // Load saved progress
  useEffect(() => {
    if (content && videoRef.current) {
      loadSavedProgress();
    }
  }, [content]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying && showControls && !showSettings && !showEpisodes) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying, showSettings, showEpisodes]);

  // Progress update interval
  useEffect(() => {
    if (isPlaying) {
      progressUpdateIntervalRef.current = setInterval(() => {
        if (videoRef.current) {
          const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setWatchProgress(progress);
          
          // Auto-save progress every 10 seconds
          if (Math.abs(videoRef.current.currentTime - lastSavedProgress) >= 10) {
            saveProgress();
          }
        }
      }, 1000);
    } else {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
    }
    return () => {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
    };
  }, [isPlaying, lastSavedProgress]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showSettings || showEpisodes) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          changeVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeVolume(Math.max(0, volume - 0.1));
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [volume, isFullscreen, showSettings, showEpisodes]);

  // Load content
  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');

      if (type === 'movie') {
        const movieData = await apiService.getMovieById(id);
        setContent(movieData);
        
        // Track view
        await apiService.trackMovieView(id);
        
        // Check if in my list
        const listStatus = await apiService.checkMovieInMyList(id);
        setInMyList(listStatus.in_my_list);
      } else if (type === 'series') {
        const seriesData = await apiService.getSeriesById(id);
        setContent(seriesData);
        
        // Load episodes
        const episodesData = await apiService.getEpisodes(id, {});
        setEpisodes(episodesData);
        
        // Set first episode as current
        if (episodesData.length > 0) {
          setCurrentEpisode(episodesData[0]);
          await apiService.trackEpisodeView(episodesData[0].id);
        }
        
        // Check if in my list
        const listStatus = await apiService.checkSeriesInMyList(id);
        setInMyList(listStatus.in_my_list);
      }
    } catch (err) {
      console.error('Error loading content:', err);
      setError(err.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  // Load saved progress
  const loadSavedProgress = async () => {
    try {
      let progressData;
      if (type === 'movie') {
        progressData = await apiService.getMovieProgress(id);
      } else if (currentEpisode) {
        progressData = await apiService.getEpisodeProgress(currentEpisode.id);
      }

      if (progressData && progressData.current_time > 0) {
        videoRef.current.currentTime = progressData.current_time;
        setLastSavedProgress(progressData.current_time);
        setWatchProgress(progressData.percentage_watched);
      }
    } catch (err) {
      console.error('Error loading progress:', err);
    }
  };

  // Save progress
  const saveProgress = async () => {
    if (!videoRef.current || !content) return;

    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const percentage = (currentTime / duration) * 100;

    try {
      const progressData = {
        current_time: Math.floor(currentTime),
        duration: Math.floor(duration),
        percentage_watched: Math.floor(percentage),
        is_completed: percentage >= 90
      };

      if (type === 'movie') {
        await apiService.updateMovieProgress(id, progressData);
      } else if (currentEpisode) {
        await apiService.updateEpisodeProgress(currentEpisode.id, progressData);
      }

      setLastSavedProgress(currentTime);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Skip backward
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  // Skip forward
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  // Change volume
  const changeVolume = (newVolume) => {
    if (videoRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      videoRef.current.volume = clampedVolume;
      setVolume(clampedVolume);
      if (clampedVolume > 0) {
        setIsMuted(false);
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Seek to position
  const seekTo = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  // Change playback rate
  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  // Toggle my list
  const toggleMyList = async () => {
    try {
      if (inMyList) {
        if (type === 'movie') {
          await apiService.removeMovieFromMyList(id);
        } else {
          await apiService.removeSeriesFromMyList(id);
        }
      } else {
        if (type === 'movie') {
          await apiService.addMovieToMyList(id);
        } else {
          await apiService.addSeriesToMyList(id);
        }
      }
      setInMyList(!inMyList);
    } catch (err) {
      console.error('Error toggling my list:', err);
    }
  };

  // Select episode
  const selectEpisode = async (episode) => {
    // Save current progress
    await saveProgress();
    
    setCurrentEpisode(episode);
    setShowEpisodes(false);
    
    // Track view
    await apiService.trackEpisodeView(episode.id);
    
    // Load saved progress for new episode
    setTimeout(() => {
      loadSavedProgress();
    }, 100);
  };

  // Video event handlers
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  const handleWaiting = () => setIsBuffering(true);
  const handlePlaying = () => setIsBuffering(false);
  const handleEnded = async () => {
    setIsPlaying(false);
    await saveProgress();
    
    // Auto-play next episode
    if (type === 'series' && currentEpisode) {
      const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
      if (currentIndex < episodes.length - 1) {
        selectEpisode(episodes[currentIndex + 1]);
      }
    }
  };

  // Format time
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mouse move handler
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  // Get video URL
  const getVideoUrl = () => {
    if (type === 'movie' && content?.video_url) {
      return API_CONFIG.getImageUrl(content.video_url);
    } else if (type === 'series' && currentEpisode?.video_url) {
      return API_CONFIG.getImageUrl(currentEpisode.video_url);
    }
    return '';
  };

  // Render loading state
  if (loading) {
    return (
      <div className="player-loading">
        <Loader size={64} className="spinner" />
        <p>Loading content...</p>
      </div>
    );
  }

  // Render error state
  if (error || !content) {
    return (
      <div className="player-error">
        <AlertCircle size={64} />
        <h2>Failed to load content</h2>
        <p>{error || 'Content not found'}</p>
        <button onClick={() => navigate(-1)} className="btn-back">
          Go Back
        </button>
      </div>
    );
  }

  const videoUrl = getVideoUrl();
  const title = type === 'movie' ? content.title : currentEpisode?.title || content.title;
  const description = type === 'movie' ? content.description : currentEpisode?.description || content.description;

  return (
    <div 
      ref={containerRef}
      className={`video-player-container ${isFullscreen ? 'fullscreen' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="video-element"
        src={videoUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onEnded={handleEnded}
        onClick={togglePlayPause}
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="buffering-overlay">
          <Loader size={64} className="spinner" />
        </div>
      )}

      {/* Top Controls */}
      <div className={`top-controls ${showControls ? 'visible' : ''}`}>
        <button onClick={() => navigate(-1)} className="control-btn back-btn">
          <X size={28} />
        </button>
        
        <div className="content-info">
          <h1 className="content-title">{title}</h1>
          {type === 'series' && currentEpisode && (
            <p className="episode-info">
              S{currentEpisode.season_number} E{currentEpisode.episode_number}
            </p>
          )}
        </div>
      </div>

      {/* Center Play/Pause */}
      {!isPlaying && !isBuffering && (
        <div className="center-controls">
          <button onClick={togglePlayPause} className="play-btn-large">
            <Play size={80} />
          </button>
        </div>
      )}

      {/* Bottom Controls */}
      <div className={`bottom-controls ${showControls ? 'visible' : ''}`}>
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="progress-container"
          onClick={seekTo}
        >
          <div className="progress-bar">
            <div 
              className="progress-filled"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div 
            className="progress-buffered"
            style={{ width: `${watchProgress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="controls-row">
          {/* Left Controls */}
          <div className="controls-left">
            <button onClick={togglePlayPause} className="control-btn">
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>

            <button onClick={skipBackward} className="control-btn">
              <SkipBack size={24} />
            </button>

            <button onClick={skipForward} className="control-btn">
              <SkipForward size={24} />
            </button>

            {/* Volume Control */}
            <div className="volume-control">
              <button onClick={toggleMute} className="control-btn">
                {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <div className="volume-slider">
                <input
                  ref={volumeRef}
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Time Display */}
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="controls-right">
            {type === 'series' && episodes.length > 0 && (
              <button 
                onClick={() => setShowEpisodes(!showEpisodes)} 
                className="control-btn"
                title="Episodes"
              >
                Episodes
              </button>
            )}

            <button 
              onClick={toggleMyList} 
              className="control-btn"
              title={inMyList ? 'Remove from My List' : 'Add to My List'}
            >
              {inMyList ? <Check size={24} /> : <Plus size={24} />}
            </button>

            <button 
              onClick={() => setShowInfo(!showInfo)} 
              className="control-btn"
              title="Info"
            >
              <Info size={24} />
            </button>

            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="control-btn"
              title="Settings"
            >
              <Settings size={24} />
            </button>

            <button onClick={toggleFullscreen} className="control-btn">
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      {showSettings && (
        <div className="settings-menu">
          <h3 className="settings-title">Playback Speed</h3>
          <div className="settings-options">
            {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(rate => (
              <button
                key={rate}
                onClick={() => changePlaybackRate(rate)}
                className={`settings-option ${playbackRate === rate ? 'active' : ''}`}
              >
                {rate}x {playbackRate === rate && <Check size={16} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Episodes Menu */}
      {showEpisodes && type === 'series' && (
        <div className="episodes-menu">
          <div className="episodes-header">
            <h3 className="episodes-title">Episodes</h3>
            <button onClick={() => setShowEpisodes(false)} className="close-btn">
              <X size={24} />
            </button>
          </div>
          <div className="episodes-list">
            {episodes.map(episode => (
              <div
                key={episode.id}
                onClick={() => selectEpisode(episode)}
                className={`episode-item ${currentEpisode?.id === episode.id ? 'active' : ''}`}
              >
                <div className="episode-number">
                  S{episode.season_number} E{episode.episode_number}
                </div>
                <div className="episode-details">
                  <h4 className="episode-title">{episode.title}</h4>
                  <p className="episode-description">{episode.description}</p>
                  <p className="episode-duration">{episode.duration} min</p>
                </div>
                {currentEpisode?.id === episode.id && (
                  <Check size={24} className="episode-check" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Panel */}
      {showInfo && (
        <div className="info-panel">
          <div className="info-header">
            <h3 className="info-title">About</h3>
            <button onClick={() => setShowInfo(false)} className="close-btn">
              <X size={24} />
            </button>
          </div>
          <div className="info-content">
            <p className="info-description">{description}</p>
            <div className="info-details">
              {content.release_year && (
                <p><strong>Year:</strong> {content.release_year}</p>
              )}
              {content.duration && type === 'movie' && (
                <p><strong>Duration:</strong> {content.duration} min</p>
              )}
              {content.rating && (
                <p><strong>Rating:</strong> {content.rating}</p>
              )}
              {content.genres && content.genres.length > 0 && (
                <p><strong>Genres:</strong> {content.genres.join(', ')}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;