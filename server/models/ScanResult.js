const mongoose = require('mongoose');

const scanResultSchema = new mongoose.Schema({
  ip: String,
  port: Number,
  service: String,
  status: String,
  protocol: String,
});

module.exports = mongoose.model('ScanResult', scanResultSchema);
