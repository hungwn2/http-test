import axios from 'axios';

// Create an axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// API service functions
export const fetchPlayers = () => API.get('/players/');
export const fetchPlayerByID = (steamID) => API.get(`/players/${steamID}/`);
export const fetchPlayerStats = (steamID) => API.get(`/fetch-stats/${steamID}/`);
