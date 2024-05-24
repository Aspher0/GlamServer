const { WebsocketClients } = require('../utils/data');

module.exports = (socket, io) => {
    socket.on("disconnect", () => {
        console.log('Client disconnected');
        
        if (socket.id in WebsocketClients)
            delete WebsocketClients[socket.id];
    });
};