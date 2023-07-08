function Message({ msg, username }) {
  return (
    <div
      className={`my-2 flex ${username === msg.username ? "justify-end" : ""}`}
    >
      <span
        className={`font-bold mr-2 ${
          username === msg.username ? "text-right" : ""
        }`}
      >
        <img
          className="inline-block h-6 w-6 rounded-full"
          src={`https://ui-avatars.com/api/?name=${msg.username}&background=random&color=fff`}
          alt="avatar"
        />
      </span>
      <span
        className={`rounded-lg px-3 py-1 ${
          username === msg.username
            ? "bg-gray-300 text-gray-700"
            : "bg-teal-500 text-white"
        }`}
      >
        {msg.message}
      </span>
    </div>
  );
}

export default Message;
