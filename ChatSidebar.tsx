"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Search, User, Heart } from "lucide-react";

const CHATS = [
  { id: 1, username: "oygul", lastSeen: "online now", time: "10:45", unread: 2, avatar: "O", online: true },
  { id: 2, username: "guli", lastSeen: "online now", time: "10:30", unread: 1, avatar: "G", online: true },
  { id: 3, username: "janona", lastSeen: "5m ago", time: "09:50", unread: 0, avatar: "J", online: false },
  { id: 4, username: "kamila", lastSeen: "15m ago", time: "09:20", unread: 0, avatar: "K", online: false },
  { id: 5, username: "hilola", lastSeen: "30m ago", time: "08:40", unread: 0, avatar: "H", online: false },
  { id: 6, username: "mubina", lastSeen: "1h ago", time: "07:30", unread: 0, avatar: "M", online: false },
];

interface ChatSidebarProps {
  selectedChat: { id: number; username: string } | null;
  onSelectChat: (chat: any) => void;
}

export default function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-dark/95 via-dark-card/90 to-dark/95 border-r border-dark-border/20 flex flex-col backdrop-blur-xl z-40">
      {/* Logo Section */}
      <div className="flex-shrink-0 p-6 border-b border-dark-border/20">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-pink-500 rounded-full flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight">
              <span className="text-white">LOVE</span><span className="text-accent">GRAM</span>
            </div>
            <p className="text-xs text-gray-400">Chat</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-shrink-0 p-4 space-y-2 border-b border-dark-border/20">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm smooth-transition ${
            isActive("/") && !pathname.startsWith("/chat") && !pathname.startsWith("/find") && !pathname.startsWith("/profile")
              ? "bg-accent/20 text-accent"
              : "text-gray-300 hover:text-white hover:bg-dark-card/50"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Menu</span>
        </Link>
        <Link
          href="/chat"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm smooth-transition ${
            isActive("/chat")
              ? "bg-accent/20 text-accent"
              : "text-gray-300 hover:text-white hover:bg-dark-card/50"
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Messages</span>
        </Link>
        <Link
          href="/find"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm smooth-transition ${
            isActive("/find")
              ? "bg-accent/20 text-accent"
              : "text-gray-300 hover:text-white hover:bg-dark-card/50"
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Find</span>
        </Link>
        <Link
          href="/profile/oygul"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm smooth-transition ${
            isActive("/profile")
              ? "bg-accent/20 text-accent"
              : "text-gray-300 hover:text-white hover:bg-dark-card/50"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent">
        <div className="p-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Messages</h2>
          <div className="space-y-2">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() =>
                  onSelectChat({
                    id: chat.id,
                    username: chat.username,
                    avatar: chat.avatar,
                    lastSeen: chat.lastSeen,
                    online: chat.online,
                  })
                }
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group border ${
                  selectedChat?.id === chat.id
                    ? "bg-accent/15 border-accent/40 shadow-glow"
                    : "border-dark-border/20 hover:border-accent/30 hover:bg-dark-card/40"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 transition-all group-hover:scale-105 ${
                    chat.online
                      ? "bg-gradient-to-br from-accent to-pink-500 border-accent/50"
                      : "bg-gradient-to-br from-gray-700 to-gray-600 border-gray-600/50"
                  }`}>
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-dark shadow-glow animate-pulse"></div>
                  )}
                  {chat.unread > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-dark text-xs font-bold shadow-glow">
                      {chat.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className={`text-sm font-semibold truncate group-hover:text-accent smooth-transition ${
                    selectedChat?.id === chat.id ? "text-accent" : "text-white"
                  }`}>
                    @{chat.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{chat.lastSeen}</p>
                </div>
                <span className={`text-xs flex-shrink-0 font-medium ${
                  selectedChat?.id === chat.id ? "text-accent" : "text-gray-500"
                }`}>
                  {chat.time}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex-shrink-0 p-4 border-t border-dark-border/20">
        <Link href="/profile/oygul" className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-card/50 transition-all duration-200 group border border-dark-border/20 hover:border-accent/30">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            O
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-white truncate">@oygul</p>
            <p className="text-xs text-accent group-hover:text-accent/80 font-medium smooth-transition">My profile</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
