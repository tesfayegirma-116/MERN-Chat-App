import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

const ENDPOINT = "http://localhost:4000";

function App() {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { message, room, username });
      setMessage("");
    }
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (room) {
      socket.emit("join room", room);
      setShowForm(false);
    }
  };

  const leaveRoom = () => {
    socket.emit("leave room", room);
    setRoom("");
    setMessages([]);
    setShowForm(true);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col pb-10 font-poppins">
      <Header showForm={showForm} />
      <main className="flex flex-1">
        <Sidebar
          showForm={showForm}
          room={room}
          username={username}
          handleRoomChange={(e) => setRoom(e.target.value)}
          handleUsernameChange={handleUsernameChange}
          joinRoom={joinRoom}
          leaveRoom={leaveRoom}
        />
        <ChatArea
          showForm={showForm}
          messages={messages}
          username={username}
          message={message}
          handleMessageChange={(e) => setMessage(e.target.value)}
          sendMessage={sendMessage}
        />
      </main>
    </div>
  );
}

export default App;
