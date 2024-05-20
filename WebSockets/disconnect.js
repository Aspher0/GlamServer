const { WebsocketClients } = require('../utils/data');

module.exports = (socket, io) => {
    socket.on("disconnect", () => {
        console.log('Client disconnected');
    });
};