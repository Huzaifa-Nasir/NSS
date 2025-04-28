import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ScanForm from '../components/ScanForm';
import ScanResults from '../components/ScanResults';
import FirewallForm from '../components/FirewallForm';
import FirewallVisualizer from '../components/FirewallVisualizer';

const socket = io('http://localhost:5000');

function HomePage() {
  const [results, setResults] = useState([]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    socket.on('scanResults', (data) => {
      setResults(data);
    });
  }, []);

  return (
    <div>
      <h1>Network Security Scanner</h1>
      <ScanForm onScanResults={setResults} />
      <ScanResults results={results} />
      <FirewallForm />
      <FirewallVisualizer rules={rules} />
    </div>
  );
}

export default HomePage;
