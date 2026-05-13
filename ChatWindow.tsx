"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, MoreVertical, Send, Plus, Smile } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
}

interface ChatWindowProps {
  chat: {
    id: number;
    username: string;
    avatar: string;
    lastSeen: string;
    online: boolean;
  };
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, text: "Salom! Qayfsan?", sender: "them", time: "10:40" },
  { id: 2, text: "Salom! Yaxshi-chi, o'zim ham yaxshiman", sender: "me", time: "10:41" },
  { id: 3, text: "Qayerda turibsan?", sender: "them", time: "10:42" },
  { id: 4, text: "Namangan shaharida, o'zim 😊", sender: "me", time: "10:43" },
  { id: 5, text: "Vah! Meni ham Namanganda qo'y!", sender: "them", time: "10:44" },
];

export default function ChatWindow({ chat }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: input,
          sender: "me",
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="fixed left-72 right-0 top-0 h-screen bg-gradient-to-br from-dark via-dark-card/50 to-dark flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-b from-dark/80 to-dark/60 border-b border-dark-border/20 backdrop-blur-md p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-accent transition-colors p-2 hover:bg-dark-card/50 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-pink-500 rounded-full blur-lg opacity-0 hover:opacity-30 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white font-bold text-sm border-2 border-accent/40">
              {chat.avatar}
            </div>
            {chat.online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark shadow-glow animate-pulse"></div>
            )}
          </div>
          <div>
            <p className="text-white font-bold text-lg">@{chat.username}</p>
            <p className={`text-xs font-medium smooth-transition ${
              chat.online 
                ? "text-green-400" 
                : "text-gray-500"
            }`}>
              {chat.online ? "Online now" : `Last seen ${chat.lastSeen}`}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-accent transition-colors p-2 hover:bg-dark-card/50 rounded-lg">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-xs px-5 py-3 rounded-2xl backdrop-blur-sm transition-all duration-200 ${
                msg.sender === "me"
                  ? "bg-gradient-to-r from-accent to-pink-500 text-white rounded-br-none shadow-glow hover:shadow-glow-lg hover:scale-105"
                  : "bg-dark-card/60 border border-dark-border/40 text-gray-200 rounded-bl-none hover:border-dark-border/60"
              }`}
            >
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              <p className={`text-xs font-medium mt-2 opacity-70 ${
                msg.sender === "me" 
                  ? "text-white/80" 
                  : "text-gray-400"
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 bg-gradient-to-t from-dark to-dark/80 border-t border-dark-border/20 backdrop-blur-md p-5">
        <div className="flex items-end gap-3">
          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-dark-card/60 border border-dark-border/40 hover:border-accent/40 hover:bg-dark-card/80 flex items-center justify-center text-gray-400 hover:text-accent smooth-transition transition-all">
            <Plus className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Xabar yozing..."
              className="w-full bg-dark-card/60 text-white placeholder-gray-500 rounded-full px-5 py-3 border border-dark-border/40 focus:outline-none focus:border-accent/60 focus:bg-dark-card/80 focus:ring-2 focus:ring-accent/20 smooth-transition font-medium"
            />
          </div>

          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-dark-card/60 border border-dark-border/40 hover:border-accent/40 hover:bg-dark-card/80 flex items-center justify-center text-gray-400 hover:text-accent smooth-transition transition-all">
            <Smile className="w-5 h-5" />
          </button>

          <button
            onClick={handleSend}
            className="flex-shrink-0 w-11 h-11 bg-gradient-to-r from-accent to-pink-500 rounded-full flex items-center justify-center text-white hover:shadow-glow hover:scale-110 smooth-transition transition-all active:scale-95"
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}
