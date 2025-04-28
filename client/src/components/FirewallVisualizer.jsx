import React from 'react';
import { Handle, Position } from 'reactflow';

function FirewallVisualizer({ rules }) {
  return (
    <div style={{ height: 300 }}>
      <h3>Firewall Flow Visual</h3>
      {rules.map((rule, idx) => (
        <div key={idx}>
          [{rule.priority}] {rule.action.toUpperCase()} {rule.ip}:{rule.port}/{rule.protocol}
        </div>
      ))}
    </div>
  );
}

export default FirewallVisualizer;
