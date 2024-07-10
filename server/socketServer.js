// socketServer.js

const { Server } = require('socket.io');
const actions = require('./actions');
const { handleMessage, handleDirectMessage, handleCallRequest } = require('./socketHandlers');

const initSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on(actions.CONNECTION, (socket) => {
        console.log('New client connected:', socket.id);

        socket.on(actions.MESSAGE, (data) => handleMessage(io, socket, data));
        socket.on(actions.DIRECT_MESSAGE, (data) => handleDirectMessage(io, socket, data));
        socket.on(actions.CALL_REQUEST, (data) => handleCallRequest(io, socket, data));

        socket.on(actions.DISCONNECT, () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = initSocketServer;
