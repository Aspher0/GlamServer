const { WebsocketClients, CustomServerError } = require('../utils/data');

module.exports = (socket, io) => {
    socket.on("clientInfos", (clientInfos) => {
        try {
            const { PlayerName, PlayerHomeworld } = JSON.parse(clientInfos);

            if (!PlayerName || !PlayerHomeworld) {
                throw new CustomServerError("Player name or homeworld is missing.");
            }

            if (PlayerName.split(" ").length !== 2) {
                throw new CustomServerError("Player name is not valid.");
            }

            WebsocketClients[socket.id] = { PlayerName, PlayerHomeworld };
        } catch (error)
        {
            var data_to_return = {type: "errorMessage", message: error instanceof CustomServerError ? error.message : "Connection could not be established. It could be caused by an error from the server or invalid data being sent by GlamMaster."};
            socket.emit("serverMessage", data_to_return)
            socket.disconnect();
        }
    });
};
