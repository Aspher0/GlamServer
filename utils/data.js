class CustomServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomServerError";
    }
}

module.exports = {
    CustomServerError,
    WebsocketClients: {},
    CORSOptionsAllowAll: {
        origin: "*",
        credentials: true,
        optionSuccessStatus: 200,
        allowedHeaders: "*"
    },
};