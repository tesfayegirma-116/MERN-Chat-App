const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// enable cors
app.use(cors());

// handle socket connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // join a room
  socket.on("join room", (room) => {
    console.log(`user joined room ${room}`);
    socket.join(room);
  });

  // leave a room
  socket.on("leave room", (room) => {
    console.log(`user left room ${room}`);
    socket.leave(room);
  });

  // handle incoming messages
  socket.on("message", (data) => {
    console.log(`received message in room ${data.room}: ${data.message}`);
    io.to(data.room).emit("message", data);
  });

  // handle socket disconnections
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
