function ScanResults({ results }) {
    return (
      <table>
        <thead>
          <tr>
            <th>IP</th>
            <th>Port</th>
            <th>Service</th>
            <th>Status</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, idx) => (
            <tr key={idx}>
              <td>{res.ip}</td>
              <td>{res.port}</td>
              <td>{res.service}</td>
              <td>{res.status}</td>
              <td>{res.protocol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default ScanResults;
  