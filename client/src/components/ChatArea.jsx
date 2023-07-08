import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

function ChatArea({
  showForm,
  messages,
  username,
  message,
  handleMessageChange,
  sendMessage,
}) {
  return (
    <section className="flex flex-1 flex-col px-8">
      <div className="flex flex-col h-full">
        <MessageList messages={messages} username={username} />

        {!showForm ? (
          <SendMessageForm
            message={message}
            handleMessageChange={handleMessageChange}
            sendMessage={sendMessage}
          />
        ) : (
          <footer className="flex justify-center items-center h-16">
            <p className="text-gray-600">
              Made with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              by{" "}
              <a
                href="https://github.com/tesfayegirma-116"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Tesfaye Girma
              </a>
            </p>
          </footer>
        )}
      </div>
    </section>
  );
}

export default ChatArea;
