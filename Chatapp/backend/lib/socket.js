const { Server } = require("socket.io");
const http = require("http");
const express = require('express');

// first i have created the express app to send HTTP requests
const app = express();

// then i have created the HTTP server to listen for incoming requests
const server = http.createServer(app);

// then i have created the socket.io server to handle real-time connections
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});


const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}


const userSocketMap = {};

io.on("connection", (socket) => {
    // when user connects
    console.log("a user connected", socket.id);
    // then i have stored the user id in the userSocketMap
    const userId = socket.handshake.auth.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // then i have sent the user id to the client the online clients,  i have create a custom event for this
    io.emit("getOnlineUsers", Object.keys(userSocketMap));



    // when user disconnects
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})


module.exports = { io, server, app, userSocketMap, getReceiverSocketId };