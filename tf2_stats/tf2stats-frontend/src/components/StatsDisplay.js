import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

const StatsDisplay = ({ stats }) => {
  if (!stats || stats.length === 0) return <p>No stats available.</p>;

  // Get the most recent stats entry
  const latestStats = stats[stats.length - 1];

  // Prepare data for class playtime chart
  const classPlaytimeData = {
    labels: [
      'Scout', 'Soldier', 'Pyro', 'Demoman', 'Heavy',
      'Engineer', 'Medic', 'Sniper', 'Spy'
    ],
    datasets: [
      {
        data: [
          latestStats.scout_time,
          latestStats.soldier_time,
          latestStats.pyro_time,
          latestStats.demoman_time,
          latestStats.heavy_time,
          latestStats.engineer_time,
          latestStats.medic_time,
          latestStats.sniper_time,
          latestStats.spy_time,
        ],
        backgroundColor: [
          '#99ccff', // Scout - Light blue
          '#ff6666', // Soldier - Red
          '#ff9933', // Pyro - Orange
          '#cc66ff', // Demoman - Purple
          '#cc3300', // Heavy - Dark red
          '#ffcc00', // Engineer - Yellow
          '#66cc66', // Medic - Green
          '#99cc33', // Sniper - Light green
          '#666666', // Spy - Gray
        ],
      },
    ],
  };

  // Prepare data for KDA chart
  const kdaData = {
    labels: ['Kills', 'Deaths', 'Assists'],
    datasets: [
      {
        label: 'KDA Stats',
        data: [latestStats.kills, latestStats.deaths, latestStats.assists],
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2>Player Statistics</h2>
      
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Playtime</h3>
          <p>{Math.floor(latestStats.playtime_total / 60)} hours</p>
        </div>
        <div className="stat-card">
          <h3>K/D Ratio</h3>
          <p>{(latestStats.kills / Math.max(1, latestStats.deaths)).toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Points</h3>
          <p>{latestStats.points}</p>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart">
          <h3>Class Playtime Distribution</h3>
          <Doughnut data={classPlaytimeData} />
        </div>
        <div className="chart">
          <h3>Kills, Deaths & Assists</h3>
          <Bar data={kdaData} />
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;