

import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { kawanInfo } from "../../kawanInfo";
import "./AiChatbotMain.css";
import AiChatbotSection from "./AiChatbotSection";
import { Helmet } from "react-helmet-async";
import { SERVER_URL } from "../../config";

const MOOD_CHECK_URL = "/face-detection/index.html";
const PENDING_MOOD_KEY = "kawan:pendingMoodCheckin";
const MOOD_KEYS = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];
const LOW_MOODS = ["sad", "angry", "fearful", "disgusted"];

// Quick replies offered after Kawan's feedback on a mood check-in.
const moodSuggestions = (mood) => {
  const notQuite = "🤔 That's not quite how I feel";
  if (mood === "happy") {
    return ["🌟 How can I keep this good mood going?", "🙏 Guide me through a quick gratitude exercise", notQuite];
  }
  if (LOW_MOODS.includes(mood)) {
    return [
      "🫁 Guide me through a 1-minute breathing exercise",
      "📝 Help me put into words what's bothering me",
      "🧑‍⚕️ How do I book a Kawan counsellor?",
      notQuite,
    ];
  }
  return ["🎯 Suggest one small thing I can do today", "🫁 Guide me through a 1-minute breathing exercise", notQuite];
};

const readPendingCheckin = () => {
  try {
    const raw = localStorage.getItem(PENDING_MOOD_KEY);
    if (!raw) return null;
    localStorage.removeItem(PENDING_MOOD_KEY);
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

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
  // Latest history for event listeners (postMessage/storage) that outlive renders.
  const chatHistoryRef = useRef(chatHistory);
  chatHistoryRef.current = chatHistory;
  const handledCheckins = useRef(new Set());

  // `extra` is sent to the server (e.g. { mood }); `suggestions` become quick-reply chips on the reply.
  const generateBotResponse = async (history, extra = {}, suggestions = null) => {
    // Last entry is the user's new message; earlier visible turns give context.
    const userMessage = history[history.length - 1]?.text?.trim();
    if (!userMessage) return;

    const previousTurns = history
      .slice(0, -1)
      .filter((msg) => !msg.hideInChat && !msg.isError && msg.text !== "Thinking...")
      .map(({ role, text }) => ({ role, text }));

    const showReply = (text, isError = false) =>
      setChatHistory((prev) =>
        prev
          .filter((msg) => msg.text !== "Thinking...")
          .concat({ role: "model", text, isError, ...(suggestions && !isError ? { suggestions } : {}) })
      );

    // Never leave "Thinking..." hanging on a stalled connection.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(`${SERVER_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: previousTurns, ...extra }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Server sends a user-friendly message (e.g. rate limit reached).
        throw new Error(result?.message || `HTTP error! status: ${response.status}`);
      }

      showReply(result?.response || "No response received.");
    } catch (error) {
      console.error("Error generating bot response:", error);
      if (error?.name === "AbortError") {
        showReply("This is taking longer than usual. Please check your connection and try again.", true);
        return;
      }
      showReply(
        error?.message && !error.message.startsWith("HTTP error") && error.name !== "TypeError"
          ? error.message
          : "Something went wrong while fetching the response. Please try again.",
        true
      );
    } finally {
      clearTimeout(timeout);
    }
  };

  // Add a user message + "Thinking..." and ask the bot.
  const sendUserMessage = (text, extra, suggestions) => {
    const userTurn = { role: "user", text };
    const history = [...chatHistoryRef.current, userTurn];
    setChatHistory((prev) => [...prev, userTurn, { role: "model", text: "Thinking..." }]);
    generateBotResponse(history, extra, suggestions);
  };

  const handleMoodCheckin = (checkin) => {
    if (!checkin || checkin.type !== "kawan-mood-checkin" || !MOOD_KEYS.includes(checkin.mood)) return;
    if (handledCheckins.current.has(checkin.id)) return;
    handledCheckins.current.add(checkin.id);

    // Only the copy we act on should remain as a fallback for a reload.
    try {
      const pending = JSON.parse(localStorage.getItem(PENDING_MOOD_KEY) || "null");
      if (pending?.id === checkin.id) localStorage.removeItem(PENDING_MOOD_KEY);
    } catch {
      /* ignore */
    }

    const lines = [`Mood check-in: ${checkin.label} ${checkin.emoji} (${Math.round(checkin.confidence * 100)}%)`];
    if (checkin.selfReport) lines.push(`I feel: ${checkin.selfReport}`);
    if (checkin.note) lines.push(`Note: ${checkin.note}`);

    setShowChatbot(true);
    sendUserMessage(
      lines.join("\n"),
      {
        mood: {
          mood: checkin.mood,
          confidence: checkin.confidence,
          scores: checkin.scores,
          selfReport: checkin.selfReport,
          note: checkin.note,
          recent: checkin.recent,
        },
      },
      moodSuggestions(checkin.mood)
    );
  };
  const handleMoodCheckinRef = useRef(handleMoodCheckin);
  handleMoodCheckinRef.current = handleMoodCheckin;

  // Receive check-ins from the Mood Check window (postMessage), or pick up one
  // left in localStorage (window opened directly / popup lost its opener).
  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      handleMoodCheckinRef.current(event.data);
    };
    const checkPending = () => {
      const pending = readPendingCheckin();
      if (pending) handleMoodCheckinRef.current(pending);
    };
    const onStorage = (event) => {
      if (event.key === PENDING_MOOD_KEY && event.newValue) checkPending();
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", checkPending);
    checkPending();
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", checkPending);
    };
  }, []);

  const openMoodCheck = () => {
    const popup = window.open(MOOD_CHECK_URL, "kawan-mood-check", "width=800,height=860");
    // Popup blocked: open in this tab; the result is picked up when the user comes back.
    if (!popup) window.location.href = MOOD_CHECK_URL;
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
                <br />
                <span className="mood-hint">Tip: tap 📷 below for a quick mood check-in.</span>
              </p>
            </div>

            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage
                key={index}
                chat={chat}
                isLast={index === chatHistory.length - 1}
                onSuggestion={(text) => sendUserMessage(text)}
              />
            ))}
          </div>

          {/* Chatbot Footer */}
          <div className="chat-footer flex">
            {/* Camera Button */}
            <div className="mr-2 text-3xl hover:text-[#f762f7] content-center items-center text-[#cc31cc] justify-center">
              <button
                className="camera-btn material-symbols-rounded"
                title="Mood check with your camera"
                aria-label="Open mood check with your camera"
                onClick={openMoodCheck}
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
