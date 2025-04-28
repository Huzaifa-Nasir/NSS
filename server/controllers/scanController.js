const nmap = require('node-nmap');
const ScanResult = require('../models/ScanResult');
nmap.nmapLocation = 'D:\\Program Files\\Nmap\\nmap.exe'; 

function runScan(ip, scanType, io) {
  return new Promise((resolve, reject) => {
    let options = [];

    if (scanType === 'TCP SYN') {
      options.push('-sS');
    } else if (scanType === 'UDP') {
      options.push('-sU');
    } else if (scanType === 'Full Connect') {
      options.push('-sT');
    }

    let quickscan = new nmap.QuickScan(ip, options);
    console.log('Running Nmap scan with options:', options); // Log scan options

    quickscan.on('complete', async (data) => {
      console.log('Scan Results Data:', data);  // Log the full scan result data

      if (!data || !data[0] || !data[0].openPorts) {
        console.error('No open ports found for', ip);
        io.emit('scanResults', []);  // Send an empty array as a result
        resolve([]);
        return;
      }

      const results = data[0].openPorts.map(port => ({
        ip,
        port: port.port,
        service: port.service,
        status: port.state,
        protocol: port.protocol
      }));

      try {
        // Insert scan results into database
        await ScanResult.insertMany(results);
        // Emit scan results to connected clients
        io.emit('scanResults', results);
        resolve(results);
      } catch (err) {
        console.error('Error inserting scan results into DB:', err);
        reject(err);
      }
    });

    quickscan.on('error', (error) => {
      console.error('Error during nmap scan:', error);
      reject(error);
    });
  }).catch((error) => {
    // Catch and log any errors from the Promise itself
    console.error('Scan Promise Error:', error);
    throw error;
  });
}

module.exports = { runScan };
