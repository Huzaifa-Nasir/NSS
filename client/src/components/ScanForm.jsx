import { useState } from 'react';
import axios from 'axios';

function ScanForm({ onScanResults }) {
  const [ip, setIp] = useState('');
  const [scanType, setScanType] = useState('TCP SYN');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/scan', { ip, scanType });
    onScanResults(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Target IP" value={ip} onChange={(e) => setIp(e.target.value)} required />
      <select value={scanType} onChange={(e) => setScanType(e.target.value)}>
        <option>TCP SYN</option>
        <option>UDP</option>
        <option>Full Connect</option>
      </select>
      <button type="submit">Start Scan</button>
    </form>
  );
}

export default ScanForm;
