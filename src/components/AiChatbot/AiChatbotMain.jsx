

import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { kawanInfo } from "../../kawanInfo";
import "./AiChatbotMain.css";
import AiChatbotSection from "./AiChatbotSection";
import { Helmet } from "react-helmet-async";
import { SERVER_URL } from "../../config";

const AiChatbotMain = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: kawanInfo,
    },
  ]);

  const generateBotResponse = async (history) => {
    // Last entry is the user's new message; earlier visible turns give context.
    const userMessage = history[history.length - 1]?.text?.trim();
    if (!userMessage) return;

    const previousTurns = history
      .slice(0, -1)
      .filter((msg) => !msg.hideInChat && !msg.isError && msg.text !== "Thinking...")
      .map(({ role, text }) => ({ role, text }));

    const showReply = (text, isError = false) =>
      setChatHistory((prev) =>
        prev.filter((msg) => msg.text !== "Thinking...").concat({ role: "model", text, isError })
      );

    try {
      const response = await fetch(`${SERVER_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: previousTurns }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Server sends a user-friendly message (e.g. rate limit reached).
        throw new Error(result?.message || `HTTP error! status: ${response.status}`);
      }

      showReply(result?.response || "No response received.");
    } catch (error) {
      console.error("Error generating bot response:", error);
      showReply(
        error?.message && !error.message.startsWith("HTTP error") && error.name !== "TypeError"
          ? error.message
          : "Something went wrong while fetching the response. Please try again.",
        true
      );
    }
  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <>
      <Helmet>
        <title>AI ChatBot | Kawan</title>
      </Helmet>
      <div className={`z-500 container ${showChatbot ? "show-chatbot" : ""}`}>
        <button
          onClick={() => setShowChatbot((prev) => !prev)}
          id="chatbot-toggler"
        >
          <span className="material-symbols-rounded">mode_comment</span>
          <span className="material-symbols-rounded">close</span>
        </button>

        <div className="chatbot-popup">
          {/* Chatbot Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
            <button
              onClick={() => setShowChatbot((prev) => !prev)}
              className="material-symbols-rounded"
            >
              keyboard_arrow_down
            </button>
          </div>

          {/* Chatbot Body */}
          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there <br /> How can I help you today?
              </p>
            </div>

            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chatbot Footer */}
          <div className="chat-footer flex">
            {/* Camera Button */}
            <div className="mr-2 text-3xl hover:text-[#f762f7] content-center items-center text-[#cc31cc] justify-center">
              <button
                className="camera-btn material-symbols-rounded"
                onClick={() =>
                  window.open(
                    "http://localhost:8080",
                    "_blank",
                    "width=800,height=600"
                  )
                }
              >
                photo_camera
              </button>
            </div>
            <div className="w-full">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChatbotMain;
