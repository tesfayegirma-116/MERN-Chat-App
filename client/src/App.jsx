import { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";

const socket = io("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Handle join room event
  useEffect(() => {
    const localUsername = localStorage.getItem("username");
    const localRoom = localStorage.getItem("room");
    if (localUsername) {
      setUsername(localUsername);
    }
    if (localRoom) {
      setRoom(localRoom);
    }
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
      socket.emit("join room", { username, room });
    }
  }, [username]);

  useEffect(() => {
    if (room) {
      localStorage.setItem("room", room);
    }
  }, [room]);

  useEffect(() => {
    const fetchMessages = () => {
      fetch("http://localhost:4000/messages")
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
        });
    };

    fetchMessages();
    socket.on("newMessageAdded", fetchMessages);
    return () => {
      socket.off("newMessageAdded", fetchMessages);
    };
  }, []);

  const handleleaveRoom = () => {
    socket.emit("leave room", { username, room });
    setUsername("");
    setRoom("");
    setMessages([]);

    localStorage.removeItem("username");
    localStorage.removeItem("room");
  };

  useEffect(() => {
    // Fetch a random user avatar when the component mounts
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => setAvatarUrl(data.results[0].picture.large));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && room && message) {
      const payload = {
        username,
        room,
        message,
        time: moment().format("h:mm a"),
      };
      socket.emit("message", payload);
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </a>

                  <h1 className="text-2xl font-bold text-gray-900 ml-2">
                    Chat App
                  </h1>

                  <h2 className="text-sm font-medium text-gray-500 ml-2">
                    {room}
                  </h2>
                </div>

                <div className="flex items-center justify-end md:flex-1 lg:w-0">
                  {username && (
                    <div className="flex-shrink-0">
                      <span className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          alt="avatar"
                          src={avatarUrl}
                        />
                        <span className="text-sm font-medium text-gray-500 ml-2">
                          {username}
                        </span>
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleleaveRoom}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600"
                  >
                    {room ? (
                      <>
                        <span className="mr-2">
                          Leave Room <i className="fas fa-sign-out-alt"></i>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">
                          Join Room <i className="fas fa-sign-in-alt"></i>
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          {room ? (
            <div className="flex-1 flex overflow-hidden">
              <main className="flex-1 overflow-y-auto focus:outline-none">
                <div className="overflow-x-hidden px-4 py-8 sm:px-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="mt-6">
                      <div className="flow-root">
                        <ul className="-my-5 divide-y divide-gray-200">
                          {messages.map((message) => (
                            <li key={message._id} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  {/* take the first letter of the username and make it uppercase */}
                                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                                    <span className="text-lg font-medium leading-none text-white">
                                      {username.charAt(0).toUpperCase()}
                                    </span>
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {message.username}
                                  </p>

                                  <p className="text-sm text-gray-500 truncate">
                                    {message.message}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {message.time}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="flex flex-col">
                    <label htmlFor="username" className="text-lg font-bold">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="border border-gray-100 rounded-lg py-2 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col mt-4">
                    <label htmlFor="room" className="text-lg font-bold">
                      Room
                    </label>

                    <input
                      type="text"
                      id="room"
                      className="border border-gray-100 rounded-lg py-2 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600"
                  >
                    Join Room <span className="ml-2">🚀</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <footer
          className="bg-white border-t border-gray-200 
        shadow-lg"
        >
          <form onSubmit={handleSubmit}>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="border border-gray-100 rounded-lg py-2 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-60 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Send <span className="fa fa-paper-plane ml-2"></span>
                </button>
              </div>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default App;
