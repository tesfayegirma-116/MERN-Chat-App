import JoinRoomForm from "./JoinRoomForm";
import LeaveRoomButton from "./LeaveRoomButton";

function Sidebar({
  showForm,
  room,
  username,
  handleRoomChange,
  handleUsernameChange,
  joinRoom,
  leaveRoom,
}) {
  return (
    <aside className="bg-gray-100 border-r border-gray-200 w-64 p-4">
      {showForm ? (
        <JoinRoomForm
          room={room}
          username={username}
          handleRoomChange={handleRoomChange}
          handleUsernameChange={handleUsernameChange}
          joinRoom={joinRoom}
        />
      ) : (
        <div className="flex flex-col">
          <LeaveRoomButton leaveRoom={leaveRoom} />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
