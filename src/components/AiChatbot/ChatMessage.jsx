import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat, isLast = false, onSuggestion }) => {
  if (chat.hideInChat) return null;

  return (
    <>
      <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <p className="message-text">{chat.text}</p>
      </div>
      {/* Quick replies: only on the newest bot message, so they disappear once the user replies. */}
      {isLast && chat.suggestions?.length > 0 && onSuggestion && (
        <div className="quick-replies">
          {chat.suggestions.map((text) => (
            <button key={text} type="button" className="quick-reply" onClick={() => onSuggestion(text)}>
              {text}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatMessage;
