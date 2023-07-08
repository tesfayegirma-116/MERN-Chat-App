function SendMessageForm({ message, handleMessageChange, sendMessage }) {
  return (
    <form className="flex h-16" onSubmit={sendMessage}>
      <input
        value={message}
        onChange={handleMessageChange}
        className="flex-1 border outline-none px-6 rounded-l-lg"
        placeholder="Enter your message here..."
      />
      <button
        type="submit"
        className="bg-teal-400 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-r-lg ml-1"
      >
        Send <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
}

export default SendMessageForm;
