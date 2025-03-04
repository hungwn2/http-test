import React from 'react';

const PlayerProfile = ({ player }) => {
  if (!player) return null;

  return (
    <div className="player-profile">
      <div className="profile-header">
        <img src={player.avatar_url} alt={player.nickname} className="avatar" />
        <div className="player-info">
          <h2>{player.nickname}</h2>
          <p>Steam ID: {player.steam_id}</p>
          <a href={player.profile_url} target="_blank" rel="noopener noreferrer">
            Steam Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;