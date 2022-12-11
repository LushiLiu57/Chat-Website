const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
const cors = require("cors");

app.use(cors());
app.use(express.json());


server.listen("3100", ()=> {
    console.log("Running on 3100");
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`ID ${socket.id} joined room ${data}`);
    });

    socket.on("sent_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED", socket.id);
    });
});