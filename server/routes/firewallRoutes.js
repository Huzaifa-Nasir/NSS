const express = require('express');
const FirewallRule = require('../models/FirewallRule');
const { evaluateTraffic } = require('../controllers/firewallController');

const router = express.Router();

router.post('/', async (req, res) => {
  const rule = new FirewallRule(req.body);
  try {
    const saved = await rule.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/evaluate', async (req, res) => {
  const { ip, port, protocol } = req.body;
  const action = await evaluateTraffic(ip, port, protocol);
  res.json({ action });
});

module.exports = router;
