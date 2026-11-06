

import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { kawanInfo } from "../../kawanInfo";
import "./AiChatbotMain.css";
import AiChatbotSection from "./AiChatbotSection";
import { Helmet } from "react-helmet-async";

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
    // Format chat history to extract the user's most recent query
    const lastMessage = history[history.length - 1]?.text;
    const userQuery = lastMessage?.split(": ")?.[1]?.trim();

    if (!userQuery) return;

    // // Add a temporary "Thinking..." message to the chat
    // setChatHistory((prev) => [
    //   ...prev,
    //   { role: "model", text: "Thinking...", isError: false },
    // ]);

    try {
      // Prepare API request
      const url = import.meta.env.VITE_API_URL;
      const requestBody = { query: userQuery };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log(result, "RRRRRRRRRRRR");
      
      const botResponse = (result?.response || "No response received.").replace(
        "Processed query: ",
        ""
      );

      // Update chat history with the bot's response
      setChatHistory((prev) =>
        prev.filter((msg) => msg.text !== "Thinking...").concat({
          role: "model",
          text: botResponse,
        })
      );
    } catch (error) {
      console.error("Error generating bot response:", error);

      // Update chat history with an error message
      setChatHistory((prev) =>
        prev.filter((msg) => msg.text !== "Thinking...").concat({
          role: "model",
          text: "Something went wrong while fetching the response. Please try again.",
          isError: true,
        })
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
