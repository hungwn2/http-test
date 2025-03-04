import React, { useState } from 'react';
import PlayerSearch from '../components/PlayerSearch';
import PlayerProfile from '../components/PlayerProfile';
import StatsDisplay from '../components/StatsDisplay';
import { fetchPlayerStats } from '../api';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  const handleSearch = async (steamID) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchPlayerStats(steamID);
      setPlayerData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Failed to fetch player data. Please check the Steam ID and try again.'
      );
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1>TF2 Player Stats Tracker</h1>
        <PlayerSearch onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error-message">{error}</div>}
        
        {playerData && (
          <div className="results">
            <PlayerProfile player={playerData} />
            <StatsDisplay stats={playerData.stats} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;