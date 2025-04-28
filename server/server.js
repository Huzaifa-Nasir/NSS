const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const scanRoutes = require('./routes/scanRoutes');
const firewallRoutes = require('./routes/firewallRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/scan', scanRoutes(io)); 
app.use('/api/firewall', firewallRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}, DB connected`));
})
.catch((err) => console.error(err));
