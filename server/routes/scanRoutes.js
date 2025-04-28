const express = require('express');
const { runScan } = require('../controllers/scanController');

function scanRoutes(io) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { ip, scanType } = req.body;
    try {
      const results = await runScan(ip, scanType, io);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
}

module.exports = scanRoutes;
