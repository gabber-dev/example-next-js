"use client"
import { RealtimeSessionEngineProvider, useRealtimeSessionEngine } from "gabber-client-react";
import { startSession } from "./actions";
import { RealtimeSessionConnectionDetails } from "gabber-client-core";
import { useState } from "react";

export default function Home() {
  const [connectionDetails, setConnectionDetails] = useState<RealtimeSessionConnectionDetails | undefined>(undefined);

  if (!connectionDetails) {
    return (
      <div className="">
        <button className="btn" onClick={async () => {
          const conDetails = await startSession()
          setConnectionDetails(conDetails)
        }}>Start</button>
      </div>
    );
  }

  return <RealtimeSessionEngineProvider connectionOpts={{ connection_details: connectionDetails }}>
    <AppInner />
  </RealtimeSessionEngineProvider>
}

function AppInner() {
  const {
    microphoneEnabled,
    setMicrophoneEnabled,
    sendChatMessage,
    messages,
    connectionState,
  } = useRealtimeSessionEngine();
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendChatMessage({ text: inputText });
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-4 min-h-screen bg-gray-50">
      {/* Connection State */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow">
        <p className="text-gray-700">
          Connection Status:{" "}
          <span
            className={`capitalize ${connectionState === "connected"
              ? "text-green-600"
              : connectionState === "connecting"
                ? "text-yellow-600"
                : "text-red-600"
              }`}
          >
            {connectionState}
          </span>
        </p>
      </div>

      {/* Input Box and Microphone Toggle */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
          className={`p-2 rounded-lg ${microphoneEnabled
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            } hover:bg-opacity-80 transition`}
          title={microphoneEnabled ? "Disable Microphone" : "Enable Microphone"}
        >
          {microphoneEnabled ? "🎙️ On" : "🎙️ Off"}
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg ${message.agent
                  ? "bg-gray-100 mr-8"
                  : "bg-blue-100 ml-8"
                  }`}
              >
                <span className="text-sm text-gray-600">
                  {message.agent ? "Assistant" : "You"}:{" "}
                </span>{" "}
                {message.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}