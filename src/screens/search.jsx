import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService, { API_CONFIG } from '../services/api';
import {
  Search as SearchIcon,
  X,
  Play,
  Plus,
  Check,
  Info,
  TrendingUp,
  Film,
  Tv,
  Clock,
  Star,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import '../css/search.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentProfile } = useAuth();

  // State
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, movies, series
  const [sortBy, setSortBy] = useState('relevance'); // relevance, rating, year, title
  const [showFilters, setShowFilters] = useState(false);
  const [myList, setMyList] = useState([]);

  // Load initial data
  useEffect(() => {
    loadTrendingContent();
    loadRecentSearches();
    loadMyList();
  }, []);

  // Search when query changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, [searchParams]);

  // Load trending content
  const loadTrendingContent = async () => {
    try {
      const [moviesRes, seriesRes] = await Promise.all([
        apiService.getMovies({ limit: 10, sort: 'views', is_active: true }),
        apiService.getSeries({ limit: 10, sort: 'views', is_active: true })
      ]);

      const trending = [
        ...(moviesRes.movies || []),
        ...(seriesRes.series || [])
      ]
        .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        .slice(0, 12);

      setTrendingContent(trending);
    } catch (error) {
      console.error('Error loading trending content:', error);
    }
  };

  // Load recent searches from localStorage
  const loadRecentSearches = () => {
    try {
      const saved = localStorage.getItem('zentryatvrecent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  // Save search to recent
  const saveRecentSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    try {
      let searches = [...recentSearches];
      
      // Remove if already exists
      searches = searches.filter(s => s.toLowerCase() !== searchQuery.toLowerCase());
      
      // Add to beginning
      searches.unshift(searchQuery);
      
      // Keep only last 10
      searches = searches.slice(0, 10);
      
      setRecentSearches(searches);
      localStorage.setItem('zentryatvrecent_searches', JSON.stringify(searches));
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('zentryatvrecent_searches');
  };

  // Load my list
  const loadMyList = async () => {
    try {
      const list = await apiService.getMyList();
      setMyList(list || []);
    } catch (error) {
      console.error('Error loading my list:', error);
    }
  };

  // Check if content is in my list
  const isInMyList = (contentId, isMovie) => {
    return myList.some(item => 
      isMovie ? item.movie_id === contentId : item.series_id === contentId
    );
  };

  // Toggle my list
  const toggleMyList = async (content) => {
    const isMovie = !content.total_seasons && !content.is_series;
    const inList = isInMyList(content.id, isMovie);

    try {
      if (inList) {
        await apiService.removeFromMyList(content.id, isMovie ? 'movie' : 'series');
      } else {
        await apiService.addToMyList(content.id, isMovie ? 'movie' : 'series');
      }
      await loadMyList();
    } catch (error) {
      console.error('Error toggling my list:', error);
    }
  };

  // Perform search
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    saveRecentSearch(searchQuery);

    try {
      const [moviesRes, seriesRes] = await Promise.all([
        apiService.getMovies({ limit: 100, is_active: true }),
        apiService.getSeries({ limit: 100, is_active: true })
      ]);

      const allContent = [
        ...(moviesRes.movies || []).map(m => ({ ...m, type: 'movie' })),
        ...(seriesRes.series || []).map(s => ({ ...s, type: 'series' }))
      ];

      // Filter by search query
      const filtered = allContent.filter(item => {
        const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = item.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const castMatch = item.cast?.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
        const directorMatch = item.director?.toLowerCase().includes(searchQuery.toLowerCase());
        const genreMatch = item.genres?.some(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return titleMatch || descMatch || castMatch || directorMatch || genreMatch;
      });

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    setSearchParams({});
  };

  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    setQuery(search);
    setSearchParams({ q: search });
  };

  // Navigate to content
  const handlePlay = async (content) => {
    try {
      const isMovie = content.type === 'movie' || (!content.total_seasons && !content.is_series);
      const type = isMovie ? 'movie' : 'series';
      
      // Track view
      if (isMovie) {
        await apiService.trackMovieView(content.id);
      }
      
      navigate(`/watch/${type}/${content.id}`);
    } catch (error) {
      console.error('Error playing content:', error);
      const type = content.type === 'movie' ? 'movie' : 'series';
      navigate(`/watch/${type}/${content.id}`);
    }
  };

  // Get filtered results
  const getFilteredResults = () => {
    let results = [...searchResults];

    // Apply type filter
    if (activeFilter === 'movies') {
      results = results.filter(item => item.type === 'movie');
    } else if (activeFilter === 'series') {
      results = results.filter(item => item.type === 'series');
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'year':
        results.sort((a, b) => (b.release_year || 0) - (a.release_year || 0));
        break;
      case 'title':
        results.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default: // relevance - keep original order
        break;
    }

    return results;
  };

  const filteredResults = getFilteredResults();

  // Render content card
  const renderContentCard = (content) => {
    const isMovie = content.type === 'movie';
    const inList = isInMyList(content.id, isMovie);

    return (
      <div key={content.id} className="search-result-card">
        <div className="result-card-poster">
          <img
            src={API_CONFIG.getImageUrl(content.poster_url)}
            alt={content.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/FFD700?text=No+Image';
            }}
          />
          <div className="result-card-overlay">
            <button
              className="result-play-btn"
              onClick={() => handlePlay(content)}
              title="Play"
            >
              <Play size={24} fill="currentColor" />
            </button>
            <button
              className={`result-list-btn ${inList ? 'in-list' : ''}`}
              onClick={() => toggleMyList(content)}
              title={inList ? 'Remove from My List' : 'Add to My List'}
            >
              {inList ? <Check size={20} /> : <Plus size={20} />}
            </button>
          </div>
        </div>
        <div className="result-card-info">
          <div className="result-card-title">{content.title}</div>
          <div className="result-card-meta">
            {content.rating > 0 && (
              <span className="result-rating">
                <Star size={14} fill="#FFD700" color="#FFD700" />
                {content.rating.toFixed(1)}
              </span>
            )}
            {content.release_year && (
              <span className="result-year">{content.release_year}</span>
            )}
            <span className="result-type">
              {isMovie ? <Film size={14} /> : <Tv size={14} />}
              {isMovie ? 'Movie' : 'Series'}
            </span>
          </div>
          {content.genres && content.genres.length > 0 && (
            <div className="result-genres">
              {content.genres.slice(0, 3).map(genre => (
                <span key={genre.id} className="result-genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <SearchIcon className="search-input-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search for movies, series, actors, directors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={clearSearch}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="search-content">
        {/* No query - Show trending and recent */}
        {!query && (
          <div className="search-empty-state">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="recent-searches-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <Clock size={20} />
                    Recent Searches
                  </h2>
                  <button
                    className="clear-recent-btn"
                    onClick={clearRecentSearches}
                  >
                    Clear All
                  </button>
                </div>
                <div className="recent-searches-list">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="recent-search-item"
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      <SearchIcon size={16} />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Content */}
            <div className="trending-section">
              <h2 className="section-title">
                <TrendingUp size={20} />
                Trending in Tanzania
              </h2>
              <div className="trending-grid">
                {trendingContent.map(content => renderContentCard(content))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Searching...</p>
          </div>
        )}

        {/* Search Results */}
        {query && !loading && (
          <div className="search-results-section">
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-title">
                  Search Results for "{query}"
                </h2>
                <p className="results-count">
                  {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
                </p>
              </div>

              {/* Filters */}
              <div className="results-filters">
                <button
                  className="filters-toggle-btn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>

                {showFilters && (
                  <div className="filters-dropdown">
                    {/* Type Filter */}
                    <div className="filter-group">
                      <label className="filter-label">Type</label>
                      <div className="filter-buttons">
                        <button
                          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                          onClick={() => setActiveFilter('all')}
                        >
                          All
                        </button>
                        <button
                          className={`filter-btn ${activeFilter === 'movies' ? 'active' : ''}`}
                          onClick={() => setActiveFilter('movies')}
                        >
                          <Film size={16} />
                          Movies
                        </button>
                        <button
                          className={`filter-btn ${activeFilter === 'series' ? 'active' : ''}`}
                          onClick={() => setActiveFilter('series')}
                        >
                          <Tv size={16} />
                          Series
                        </button>
                      </div>
                    </div>

                    {/* Sort By */}
                    <div className="filter-group">
                      <label className="filter-label">Sort By</label>
                      <select
                        className="filter-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="relevance">Relevance</option>
                        <option value="rating">Rating</option>
                        <option value="year">Year</option>
                        <option value="title">Title (A-Z)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Grid */}
            {filteredResults.length > 0 ? (
              <div className="results-grid">
                {filteredResults.map(content => renderContentCard(content))}
              </div>
            ) : (
              <div className="no-results">
                <SearchIcon size={64} />
                <h3>No results found</h3>
                <p>Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;