const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const cors = require("cors");
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const port = process.env.PORT || 4000;

//cors middleware
app.use(express.json());
app.use(cors());

const mongoURL =
  "mongodb+srv://tesfayegirma360:PWsHIB41cz20OcyZ@cluster0.sfnabrn.mongodb.net/chat_app";

//connect to mongodb
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//create schema
const chatSchema = new mongoose.Schema({
  message: String,
  sender: String,
  receiver: String,
  room: String,
  time: String,
});

//create model
const Chat = mongoose.model("Chat", chatSchema);

//socket.io connection and room based chat and save to database on connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(data.user + " joined the room : " + data.room);
    socket.broadcast
      .to(data.room)

      .emit("new user joined", { user: data.user, message: "has joined" });
  });

  socket.on("leave", (data) => {
    console.log(data.user + " left the room : " + data.room);
    socket.broadcast
      .to(data.room)
      .emit("left room", { user: data.user, message: "has left" });
    socket.leave(data.room);
  });

  socket.on("message", (data) => {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
      time: data.time,
    });

    //save message to database
    const chat = new Chat({
      message: data.message,
      sender: data.user,
      receiver: data.receiver,
      room: data.room,
      time: data.time,
    });
    chat.save().then((result) => {
      // emit 'message' event with saved message data
      io.in(data.room).emit("message", result);

      // emit 'newMessageAdded' event to all clients
      io.emit("newMessageAdded");

      console.log(result);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//get all messages from database
app.get("/messages", (req, res) => {
  Chat.find().then((result) => {
    res.send(result);
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
