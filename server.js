const { CORSOptionsAllowAll } = require('./utils/data');

const bodyParser = require("body-parser");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const cors = require("cors");
const io = new Server(httpServer, {
    cors: CORSOptionsAllowAll
});

global.io = io;

const socketManager = require('./WebSockets/socketManager');
const APIRoutes = require('./API');

app.use((req, res, next) => {
    if (req.method === 'GET')
        return res.status(401).json({ error: 'Not authorized' });

    next();
});

app.use(cors(CORSOptionsAllowAll));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', APIRoutes);

socketManager(io);

httpServer.listen(3000, () => {
    console.log(`Server up and running on port 3000 on ${new Date()}.`);
});