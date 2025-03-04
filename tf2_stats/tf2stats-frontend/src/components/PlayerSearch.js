
// src/components/PlayerSearch.js
import React, { useState } from 'react';

const PlayerSearch = ({ onSearch }) => {
  const [steamID, setSteamID] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (steamID.trim()) {
      onSearch(steamID.trim());
    }
  };

  return (
    <div className="search-container">
      <h2>Search TF2 Player Stats</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="steamID">Steam ID:</label>
          <input
            type="text"
            id="steamID"
            value={steamID}
            onChange={(e) => setSteamID(e.target.value)}
            placeholder="Enter Steam ID or Custom URL"
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default PlayerSearch;