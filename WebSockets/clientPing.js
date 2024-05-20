const { WebsocketClients } = require('../utils/data');

module.exports = (socket, io) => {
    socket.on("clientPing", () => {
        console.log('Received a ping from a client');

        socket.emit("serverPong", {type: "pong", message: "The server received your message and says hello ! o/"});
    });
};