const clientPing = require('./clientPing');
const disconnect = require('./disconnect');

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log('New client connected');

        clientPing(socket, io);
        disconnect(socket, io);
    });
};