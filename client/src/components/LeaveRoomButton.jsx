function LeaveRoomButton({ leaveRoom }) {
  return (
    <button
      onClick={leaveRoom}
      className="bg-red-400 text-white rounded mt-4 px-4 py-2"
    >
      Leave Room <i className="fas fa-sign-out-alt"></i>
    </button>
  );
}

export default LeaveRoomButton;
