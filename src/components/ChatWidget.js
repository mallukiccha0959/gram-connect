import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 Welcome to GramConnect Support!"
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Our support team will assist you shortly 🚀"
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white w-16 h-16 rounded-full shadow-2xl text-2xl z-50 hover:scale-110 transition"
      >
        💬
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-96 h-[550px] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/20"
          >

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-5">
              <h2 className="text-2xl font-bold">
                GramConnect Support
              </h2>

              <p className="text-sm opacity-80">
                We usually reply instantly
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>
              ))}

            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex gap-3">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-xl border outline-none"
              />

              <button
                onClick={sendMessage}
                className="bg-purple-600 text-white px-5 rounded-xl"
              >
                Send
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}