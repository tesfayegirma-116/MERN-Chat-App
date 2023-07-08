function JoinRoomForm({
  room,
  username,
  handleRoomChange,
  handleUsernameChange,
  joinRoom,
}) {
  return (
    <form onSubmit={joinRoom}>
      <div className="flex flex-col">
        <input
          type="text"
          name="room"
          id="room"
          value={room}
          onChange={handleRoomChange}
          placeholder="Enter a room name ..."
          className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-blue-400 text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="flex flex-col mt-4">
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-blue-400 text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter a username ..."
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded mt-4 px-2 py-1"
      >
        Join Room <i className="fas fa-sign-in-alt"></i>
      </button>
    </form>
  );
}

export default JoinRoomForm;
