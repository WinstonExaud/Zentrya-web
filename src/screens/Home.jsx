import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Info, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  VolumeX,
  Plus,
  ThumbsUp,
  X,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService, { API_CONFIG } from '../services/api';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, currentProfile, logout, isLoggedIn } = useAuth();
  const videoRef = useRef(null);

  // State management
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showRecap, setShowRecap] = useState(false);
  const [recapEnded, setRecapEnded] = useState(false);
  
  // Data state
  const [heroContent, setHeroContent] = useState(null);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [myList, setMyList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [profiles, setProfiles] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check authentication ONCE
  useEffect(() => {
    const checkAuth = () => {
      if (!isLoggedIn) {
        navigate('/login');
        return false;
      }
      
      if (!currentProfile) {
        navigate('/profiles');
        return false;
      }
      
      return true;
    };

    if (!initialCheckDone) {
      const isAuthenticated = checkAuth();
      setInitialCheckDone(true);
      
      if (isAuthenticated) {
        loadAllData();
      }
    }
  }, []); // Empty dependency - only run once on mount

  // Load all data
  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel with timeout
      const fetchPromises = [
        apiService.getMovies({ limit: 50, is_active: true }).catch(e => ({ movies: [] })),
        apiService.getSeries({ limit: 50, is_active: true }).catch(e => ({ series: [] })),
        apiService.getContinueWatching().catch(e => []),
        apiService.getMyList().catch(e => []),
        apiService.getCategories().catch(e => []),
        apiService.getGenres().catch(e => []),
        apiService.getUserProfiles().catch(e => [])
      ];

      const [
        moviesData,
        seriesData,
        continueWatchingData,
        myListData,
        categoriesData,
        genresData,
        profilesData
      ] = await Promise.all(fetchPromises);

      // Process movies
      const moviesList = moviesData.movies || [];
      setMovies(moviesList);
      
      // Set hero content - prioritize featured with good images
      if (moviesList.length > 0) {
        const featured = moviesList.find(m => 
          m.is_featured && (m.banner_url || m.backdrop_url)
        );
        const withBanner = moviesList.find(m => m.banner_url || m.backdrop_url);
        const hero = featured || withBanner || moviesList[0];
        setHeroContent(hero);
      }

      // Process series  
      const seriesList = seriesData.series || [];
      setSeries(seriesList);
      
      // If no hero content from movies, try series
      if (moviesList.length === 0 && seriesList.length > 0) {
        const featured = seriesList.find(s => 
          s.is_featured && (s.banner_url || s.backdrop_url)
        );
        const withBanner = seriesList.find(s => s.banner_url || s.backdrop_url);
        
        if (featured || withBanner) {
          setHeroContent(featured || withBanner);
        }
      }

      // Process continue watching
      setContinueWatching(continueWatchingData || []);

      // Process my list
      setMyList(myListData || []);

      // Process categories
      setCategories(categoriesData || []);

      // Process genres
      setGenres(genresData || []);

      // Process profiles
      setProfiles(profilesData || []);

    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load content. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play recap video after 3 seconds (Netflix style)
  useEffect(() => {
    if (heroContent && getVideoUrl(heroContent) && !recapEnded) {
      const autoplayTimer = setTimeout(() => {
        setShowRecap(true);
      }, 3000); // Start after 3 seconds

      return () => clearTimeout(autoplayTimer);
    }
  }, [heroContent, recapEnded]);

  // Auto-play video when recap is shown
  useEffect(() => {
    if (heroContent && videoRef.current && showRecap) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay prevented, user needs to interact:', err);
          // If autoplay fails, mute and try again
          setMuted(true);
          videoRef.current.muted = true;
          videoRef.current.play().catch(e => console.log('Still prevented:', e));
        });
      }
    }
  }, [showRecap]);

  // Handle video end - don't auto-replay
  const handleVideoEnd = () => {
    setRecapEnded(true);
    setShowRecap(false);
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const results = await apiService.searchMovies(searchQuery);
      console.log('Search results:', results);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Handle movie/series click
  const handleContentClick = async (content) => {
    try {
      let detailedContent;
      
      if (content.total_seasons || content.is_series) {
        detailedContent = await apiService.getSeriesById(content.id);
      } else {
        detailedContent = await apiService.getMovieById(content.id);
      }
      
      setSelectedMovie(detailedContent);
      document.body.style.overflow = 'hidden';
    } catch (err) {
      console.error('Error fetching content details:', err);
      setSelectedMovie(content);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeContentDetails = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
  };

  // Handle play content
  const handlePlayContent = async (content) => {
    try {
      // Determine content type
      const isMovie = !content.total_seasons && !content.is_series;
      const type = isMovie ? 'movie' : 'series';
      
      // Track view
      if (isMovie) {
        await apiService.trackMovieView(content.id);
      } else {
        // For series, get first episode and track it
        const episodes = await apiService.getEpisodes(content.id, { limit: 1 });
        if (episodes && episodes.length > 0) {
          await apiService.trackEpisodeView(episodes[0].id);
        }
      }
      
      // Navigate to player
      navigate(`/watch/${type}/${content.id}`);
    } catch (err) {
      console.error('Error playing content:', err);
      // Still navigate even if tracking fails
      const type = content.total_seasons || content.is_series ? 'series' : 'movie';
      navigate(`/watch/${type}/${content.id}`);
    }
  };

  // Handle add to my list
  const handleAddToMyList = async (content, e) => {
    if (e) e.stopPropagation();
    
    try {
      if (content.total_seasons || content.is_series) {
        await apiService.addSeriesToMyList(content.id);
      } else {
        await apiService.addMovieToMyList(content.id);
      }
      
      // Refresh my list
      const updatedList = await apiService.getMyList();
      setMyList(updatedList);
      
      console.log('Added to My List:', content.title);
    } catch (err) {
      console.error('Error adding to my list:', err);
    }
  };

  // Group content by categories and genres
  const getContentRows = () => {
    const rows = [];

    // 1. Continue Watching - ALWAYS FIRST (personalized)
    if (continueWatching.length > 0) {
      rows.push({
        id: 'continue-watching',
        title: 'Continue Watching for ' + (currentProfile?.name || 'You'),
        contents: continueWatching.map(item => {
          const contentData = item.movie || item.series || item;
          return {
            ...contentData,
            id: item.movie_id || item.series_id || contentData.id,
            title: contentData.title,
            poster_url: contentData.poster_url,
            progress: item.percentage_watched || 0,
            isContinueWatching: true
          };
        })
      });
    }

    // 2. My List (personalized)
    if (myList.length > 0) {
      rows.push({
        id: 'my-list',
        title: 'My List',
        contents: myList.map(item => {
          const contentData = item.movie || item.series || item;
          return {
            ...contentData,
            id: item.movie_id || item.series_id || contentData.id,
            title: contentData.title,
            poster_url: contentData.poster_url
          };
        })
      });
    }

    // 3. Backend Categories (Trending in Tanzania, Bongo Movies, Bongo Series, etc.)
    // These are actual categories from your backend
    categories.forEach(category => {
      const categoryMovies = movies.filter(m => m.category_id === category.id && m.is_active);
      const categorySeries = series.filter(s => s.category_id === category.id && s.is_active);
      const categoryContent = [...categoryMovies, ...categorySeries];

      if (categoryContent.length > 0) {
        rows.push({
          id: `category-${category.id}`,
          title: category.name, // "Trending in Tanzania", "Bongo Movies", "Bongo Series", etc.
          contents: categoryContent.slice(0, 20) // Limit to 20 per row
        });
      }
    });

    // 4. New Releases - All recent content (not category-specific)
    const allNewReleases = [
      ...movies.filter(m => m.is_active),
      ...series.filter(s => s.is_active)
    ]
      .sort((a, b) => {
        const dateA = new Date(a.created_at || `${a.release_year}-01-01`);
        const dateB = new Date(b.created_at || `${b.release_year}-01-01`);
        return dateB - dateA;
      })
      .slice(0, 20);
    
    if (allNewReleases.length > 0) {
      rows.push({
        id: 'new-releases',
        title: 'New Releases',
        contents: allNewReleases
      });
    }

    // 5. Top Genres (optional - only if you want genre-based rows)
    // Only add if no matching category exists
    const genreNames = categories.map(c => c.name.toLowerCase());
    
    genres.slice(0, 3).forEach(genre => {
      // Skip if there's already a category with similar name
      if (genreNames.some(catName => 
        catName.includes(genre.name.toLowerCase()) || 
        genre.name.toLowerCase().includes(catName)
      )) {
        return; // Skip this genre
      }

      const genreContent = [
        ...movies.filter(m => m.genres?.some(g => g.id === genre.id) && m.is_active),
        ...series.filter(s => s.genres?.some(g => g.id === genre.id) && s.is_active)
      ].slice(0, 20);

      if (genreContent.length > 0) {
        rows.push({
          id: `genre-${genre.id}`,
          title: genre.name,
          contents: genreContent
        });
      }
    });

    return rows;
  };

  // Timeout to prevent infinite loading
  useEffect(() => {
    if (!loading) return;
    
    const timeout = setTimeout(() => {
      setLoading(false);
      setError('Loading timeout. Please refresh the page.');
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  // Glassmorphism Loading
  if (loading) {
    return (
      <div className="home-loading-container">
        <div className="glassmorphism-loader">
          <div className="loader-content">
            <div className="Zentrya Tv-logo-loader">Zentrya Tv</div>
            <div className="loader-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loader-text">Loading your experience...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="home-container error">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadAllData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const contentRows = getContentRows();
  const getBannerUrl = (content) => {
    return API_CONFIG.getImageUrl(
      content?.banner_url || 
      content?.backdrop_url || 
      content?.poster_url
    );
  };

  // Get video URL for recap
  const getVideoUrl = (content) => {
    if (!content?.video_url) return null;
    return API_CONFIG.getImageUrl(content.video_url);
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <div className="logo" onClick={() => navigate('/home')}>Zentrya Tv</div>
          <ul className="nav-links">
            <li><a href="/home" className="active">Home</a></li>
            <li><a href="/shows">Shows</a></li>
            <li><a href="/movies">Movies</a></li>
            <li><a href="/originals">Originals</a></li>
            <li><a href="/latest">Latest</a></li>
            <li><a href="/my-list">My List</a></li>
          </ul>
        </div>

        <div className="navbar-right">
          {/* Search */}
          <div className={`search-container ${searchOpen ? 'open' : ''}`}>
            <button 
              className="icon-button search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-input"
                />
              </form>
            )}
          </div>

          {/* Kids */}
          <a href="/kids" className="nav-link">Kids</a>

          {/* Notifications */}
          <button className="icon-button notification-button">
            <Bell size={20} />
          </button>

          {/* Profile Dropdown */}
          <div className="profile-dropdown">
            <button 
              className="profile-button"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img 
                src={currentProfile?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                alt="Profile" 
                className="profile-avatar"
              />
              <ChevronDown size={14} className={`dropdown-icon ${profileOpen ? 'open' : ''}`} />
            </button>

            {profileOpen && (
              <div className="profile-menu">
                {profiles.map(profile => (
                  <div 
                    key={profile.id}
                    className={`profile-menu-item ${currentProfile?.id === profile.id ? 'active' : ''}`}
                    onClick={() => {
                      if (currentProfile?.id !== profile.id) {
                        navigate('/profiles');
                      }
                      setProfileOpen(false);
                    }}
                  >
                    <img src={profile.avatar} alt={profile.name} />
                    <span>{profile.name}</span>
                  </div>
                ))}
                
                <div className="profile-menu-divider"></div>
                
                <button 
                  onClick={() => {
                    navigate('/profiles/manage');
                    setProfileOpen(false);
                  }}
                  className="profile-menu-link"
                >
                  Manage Profiles
                </button>
                
                <a href="/account" className="profile-menu-link">Account</a>
                <a href="/help" className="profile-menu-link">Help Center</a>
                
                <div className="profile-menu-divider"></div>
                
                <button onClick={handleLogout} className="profile-menu-link">
                  Sign out of Zentrya Tv
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {heroContent && (
        <section className="hero-section">
          {showRecap && getVideoUrl(heroContent) ? (
            <div className="hero-video-container">
              <video
                ref={videoRef}
                className="hero-video"
                src={getVideoUrl(heroContent)}
                muted={muted}
                onEnded={handleVideoEnd}
                playsInline
              />
            </div>
          ) : (
            <div className="hero-backdrop">
              <img 
                src={getBannerUrl(heroContent)} 
                alt={heroContent.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1920x1080/141414/D4AF37?text=Zentrya Tv';
                }}
              />
              <div className="hero-gradient"></div>
            </div>
          )}

          <div className={`hero-content ${showRecap ? 'faded' : ''}`}>
            <div className="hero-info">
              <h1 className="hero-title">{heroContent.title}</h1>
              
              {!showRecap && (
                <>
                  {heroContent.synopsis && (
                    <p className="hero-tagline">
                      {heroContent.synopsis.substring(0, 100)}
                      {heroContent.synopsis.length > 100 ? '...' : ''}
                    </p>
                  )}
                  
                  <p className="hero-description">
                    {heroContent.description?.substring(0, 250) || heroContent.synopsis?.substring(0, 250)}
                    {(heroContent.description?.length > 250 || heroContent.synopsis?.length > 250) ? '...' : ''}
                  </p>

                  <div className="hero-meta">
                    {heroContent.content_rating && (
                      <span className="meta-rating">{heroContent.content_rating}</span>
                    )}
                    {heroContent.release_year && (
                      <span className="meta-year">{heroContent.release_year}</span>
                    )}
                    {heroContent.total_seasons && (
                      <span className="meta-seasons">{heroContent.total_seasons} Season{heroContent.total_seasons > 1 ? 's' : ''}</span>
                    )}
                    {heroContent.genres && heroContent.genres.length > 0 && (
                      <span className="meta-genre">
                        {heroContent.genres.slice(0, 3).map(g => g.name).join(' • ')}
                      </span>
                    )}
                  </div>
                </>
              )}

              <div className="hero-buttons">
                <button 
                  className="hero-button play-button"
                  onClick={() => handlePlayContent(heroContent)}
                >
                  <Play size={24} fill="currentColor" />
                  <span>Play</span>
                </button>
                <button 
                  className="hero-button info-button"
                  onClick={() => handleContentClick(heroContent)}
                >
                  <Info size={24} />
                  <span>More Info</span>
                </button>
              </div>
            </div>

            <div className="hero-controls">
              <button 
                className="audio-toggle"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              {heroContent.content_rating && (
                <div className="age-rating">{heroContent.content_rating}</div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      <div className="content-rows">
        {contentRows.length > 0 ? (
          contentRows.map((row) => (
            <ContentRow 
              key={row.id} 
              title={row.title} 
              contents={row.contents}
              onContentClick={handleContentClick}
              onAddToMyList={handleAddToMyList}
              onPlayContent={handlePlayContent}
            />
          ))
        ) : (
          <div className="no-content">
            <p>No content available at the moment.</p>
            <button onClick={loadAllData} className="retry-button">
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Content Details Modal */}
      {selectedMovie && (
        <ContentDetailsModal 
          content={selectedMovie} 
          onClose={closeContentDetails}
          onPlay={handlePlayContent}
          onAddToMyList={handleAddToMyList}
        />
      )}
    </div>
  );
};

// Content Row Component
const ContentRow = ({ title, contents, onContentClick, onAddToMyList, onPlayContent }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.offsetWidth * 0.8;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      setScrollPosition(newPosition);
      rowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      
      <div className="row-wrapper">
        {scrollPosition > 0 && (
          <button 
            className="row-nav-button left"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        <div className="row-content" ref={rowRef}>
          {contents.map((content) => (
            <div 
              key={`${content.id}-${content.movie_id || content.series_id || ''}`}
              className={`content-card ${hoveredItem === content.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem(content.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onContentClick(content)}
            >
              <img 
                src={API_CONFIG.getImageUrl(content.poster_url)} 
                alt={content.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/141414/D4AF37?text=' + encodeURIComponent(content.title);
                }}
              />
              
              {/* Progress bar for continue watching */}
              {content.isContinueWatching && content.progress > 0 && (
                <div className="card-progress-bar">
                  <div 
                    className="card-progress-fill" 
                    style={{ width: `${content.progress}%` }}
                  />
                </div>
              )}
              
              {hoveredItem === content.id && (
                <div className="card-overlay">
                  <div className="card-info">
                    <h3 className="card-title">{content.title}</h3>
                    <div className="card-meta">
                      {content.content_rating && (
                        <span className="card-rating">{content.content_rating}</span>
                      )}
                      {content.rating && (
                        <span className="card-match">{Math.round(content.rating * 10)}% Match</span>
                      )}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="card-action-button primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayContent(content);
                      }}
                      title="Play"
                    >
                      <Play size={16} fill="currentColor" />
                    </button>
                    <button 
                      className="card-action-button"
                      onClick={(e) => onAddToMyList(content, e)}
                      title="Add to My List"
                    >
                      <Plus size={16} />
                    </button>
                    <button 
                      className="card-action-button"
                      onClick={(e) => e.stopPropagation()}
                      title="Rate"
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <button 
                      className="card-action-button info"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContentClick(content);
                      }}
                      title="More Info"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          className="row-nav-button right"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

// Content Details Modal
const ContentDetailsModal = ({ content, onClose, onPlay, onAddToMyList }) => {
  return (
    <div className="movie-modal-overlay" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <X size={28} />
        </button>

        <div className="modal-backdrop">
          <img 
            src={API_CONFIG.getImageUrl(content.banner_url || content.backdrop_url || content.poster_url)} 
            alt={content.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1280x720/141414/D4AF37?text=' + encodeURIComponent(content.title);
            }}
          />
          <div className="modal-backdrop-gradient"></div>
        </div>

        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{content.title}</h2>
            
            <div className="modal-actions">
              <button 
                className="modal-play-button"
                onClick={() => onPlay(content)}
              >
                <Play size={24} fill="currentColor" />
                <span>Play</span>
              </button>
              <button 
                className="modal-icon-button"
                onClick={(e) => onAddToMyList(content, e)}
                title="Add to My List"
              >
                <Plus size={24} />
              </button>
              <button className="modal-icon-button" title="Rate">
                <ThumbsUp size={24} />
              </button>
            </div>
          </div>

          <div className="modal-metadata">
            <div className="modal-meta-row">
              {content.rating && (
                <span className="modal-match">
                  <Star size={16} fill="var(--Zentrya Tv-gold)" color="var(--Zentrya Tv-gold)" />
                  {Math.round(content.rating * 10)}% Match
                </span>
              )}
              {content.release_year && (
                <span className="modal-year">{content.release_year}</span>
              )}
              {content.content_rating && (
                <span className="modal-rating">{content.content_rating}</span>
              )}
              {content.duration && (
                <span className="modal-duration">{Math.floor(content.duration / 60)}h {content.duration % 60}m</span>
              )}
            </div>
            {content.genres && content.genres.length > 0 && (
              <div className="modal-genre">
                {content.genres.map(g => g.name).join(' • ')}
              </div>
            )}
          </div>

          <div className="modal-description">
            <p>{content.description || content.synopsis}</p>
          </div>

          <div className="modal-details-grid">
            {content.director && (
              <div className="modal-detail-item">
                <span className="detail-label">Director:</span>
                <span className="detail-value">{content.director}</span>
              </div>
            )}
            {content.production && (
              <div className="modal-detail-item">
                <span className="detail-label">Production:</span>
                <span className="detail-value">{content.production}</span>
              </div>
            )}
            {content.genres && content.genres.length > 0 && (
              <div className="modal-detail-item">
                <span className="detail-label">Genres:</span>
                <span className="detail-value">
                  {content.genres.map(g => g.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;