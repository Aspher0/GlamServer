const { WebsocketClients, CustomServerError } = require('../utils/data');

function findSocketIdsByPlayer(name, world) {
    const matchingSocketIds = [];

    for (const socketId in WebsocketClients) {
        const clientInfo = WebsocketClients[socketId];

        if (clientInfo.PlayerName === name && clientInfo.PlayerHomeworld === world) {
            matchingSocketIds.push(socketId);
        }
    }

    return matchingSocketIds;
}

module.exports = (socket, io) => {
    socket.on("sendPayloadToPlayer", (payload) => {
        try {
            const parsedPayload = JSON.parse(payload);

            console.log("Payload received: ", parsedPayload);

            if (!parsedPayload.FromPlayer || !parsedPayload.ToPlayer || !parsedPayload.Payload) {
                throw new CustomServerError("The data your are trying to send is invalid.");
            }

            var NameCheckArray = [parsedPayload.FromPlayer, parsedPayload.ToPlayer];

            NameCheckArray.forEach(Player => {
                if (Player.playerName.split(" ").length !== 2)
                    throw new CustomServerError("Player name is not valid.");
            });

            const matchingSocketIds = findSocketIdsByPlayer(parsedPayload.ToPlayer.playerName, parsedPayload.ToPlayer.homeWorld);

            if (matchingSocketIds.length == 0)
                throw new CustomServerError("The player you are trying to reach has not been found or is not connected to the server.");

            matchingSocketIds.forEach(socket_id => {
                io.to(socket_id).emit("transferPayloadFromPlayer", parsedPayload);
            });
        } catch (error)
        {
            var data_to_return = {type: "errorMessage", message: error instanceof CustomServerError ? error.message : "An error occured and could be caused by the server or because of invalid data being sent by GlamMaster."};
            socket.emit("serverMessage", data_to_return);
        }
    });
};
