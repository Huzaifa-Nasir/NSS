// client/src/api.js

import axios from 'axios';

// Axios instance (no baseURL needed because of proxy)
const API = axios.create();

// API endpoints
export const startScan = (scanData) => API.post('/api/scan', scanData);

export const simulateFirewall = (firewallRules) => API.post('/api/firewall/simulate', firewallRules);

export const getScanHistory = () => API.get('/api/scan/history');

export default API;
