const { WebsocketClients } = require('../utils/data');

const clientInfos = require('./clientInfos');
const disconnect = require('./disconnect');

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log('Client connected');

        WebsocketClients[socket.id] =
        {
            PlayerName: null,
            PlayerHomeworld: null
        };

        clientInfos(socket, io);
        disconnect(socket, io);
    });
};