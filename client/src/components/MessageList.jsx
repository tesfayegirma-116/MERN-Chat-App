import Message from "./Message";

function MessageList({ messages, username }) {
  return (
    <div className="overflow-y-scroll flex-1">
      {messages.map((msg, i) => (
        <Message key={i} msg={msg} username={username} />
      ))}
    </div>
  );
}

export default MessageList;
