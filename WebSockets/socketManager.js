const { WebsocketClients } = require('../utils/data');

const clientInfos = require('./clientInfos');

const sendPayloadToPlayer = require('./sendPayloadToPlayer');

const disconnect = require('./disconnect');

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log('Client connected');

        WebsocketClients[socket.id] =
        {
            PlayerName: null,
            PlayerHomeworld: null
        };

        clientInfos(socket, io); // On connect, the client has to send its infos to the server

        sendPayloadToPlayer(socket, io);

        disconnect(socket, io); // On client disconnect
    });
};