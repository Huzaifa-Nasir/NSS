import { useState } from 'react';
import axios from 'axios';

function FirewallForm() {
  const [rule, setRule] = useState({ action: 'allow', ip: '*', port: '*', protocol: '*' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/firewall', rule);
    alert('Rule added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={rule.action} onChange={(e) => setRule({ ...rule, action: e.target.value })}>
        <option value="allow">Allow</option>
        <option value="deny">Deny</option>
      </select>
      <input placeholder="IP" value={rule.ip} onChange={(e) => setRule({ ...rule, ip: e.target.value })} />
      <input placeholder="Port" value={rule.port} onChange={(e) => setRule({ ...rule, port: e.target.value })} />
      <input placeholder="Protocol" value={rule.protocol} onChange={(e) => setRule({ ...rule, protocol: e.target.value })} />
      <button type="submit">Add Rule</button>
    </form>
  );
}

export default FirewallForm;
