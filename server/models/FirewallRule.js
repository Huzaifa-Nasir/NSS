const mongoose = require('mongoose');

const firewallRuleSchema = new mongoose.Schema({
  action: { type: String, enum: ['allow', 'deny'], required: true },
  ip: String,
  port: Number,
  protocol: String,
  priority: Number,
});

module.exports = mongoose.model('FirewallRule', firewallRuleSchema);
