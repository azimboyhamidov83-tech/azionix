import React, { useState } from 'react';
import { Heart, Home, MessageCircle, Search, User, ChevronRight } from 'lucide-react';

interface UserItem {
  id: string;
  username: string;
  handle: string;
  avatar: string;
}

const FindPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('find');

  const users: UserItem[] = [
    { id: '1', username: 'Guli', handle: '@guli', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: '2', username: 'Jeneferlopez', handle: '@jeneferlopez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: '3', username: 'Janona', handle: '@janona', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: '4', username: 'Aziza', handle: '@aziza', avatar: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=100&h=100&fit=crop' },
    { id: '5', username: 'Kamila', handle: '@kamila', avatar: 'https://images.unsplash.com/photo-1494890112c0-5a5efb2e7e8c?w=100&h=100&fit=crop' },
  ];

  const menuItems = [
    { id: 'menu', label: 'Menu', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'find', label: 'Find', icon: Search },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-48 md:w-56 bg-gradient-to-b from-black via-slate-900 to-slate-950 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-7 h-7 text-pink-500 fill-pink-500" />
            <span className="text-xl font-bold tracking-wider">
              <span className="text-white">LOVE</span>
              <span className="text-pink-500">GRAM</span>
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenuItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenuItem(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/30 to-pink-500/10 text-pink-400 shadow-lg shadow-pink-500/20'
                    : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53a8681c3a86?w=48&h=48&fit=crop"
              alt="Profile"
              className="w-12 h-12 rounded-full border border-pink-500/30"
            />
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold">@oygul</div>
              <div className="text-xs text-pink-400 hover:text-pink-300">View my profile</div>
            </div>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-800/50">
          <h1 className="text-4xl font-bold">Find</h1>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto px-6 pb-28">
          {users.map((user, index) => (
            <div key={user.id}>
              <button className="w-full flex items-center gap-4 py-4 px-4 rounded-lg group transition-all duration-300 hover:bg-slate-800/30">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-14 h-14 rounded-full border-2 border-pink-500/50 object-cover group-hover:border-pink-500 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors duration-300" />
                </div>

                {/* Username */}
                <div className="flex-1 text-left">
                  <span className="text-base font-medium text-white group-hover:text-pink-400 transition-colors duration-300">
                    {user.handle}
                  </span>
                </div>

                {/* Arrow Icon */}
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-pink-500 transition-all duration-300 group-hover:translate-x-1" />
              </button>

              {/* Divider */}
              {index < users.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Search Bar - Fixed at Bottom */}
        <div className="fixed bottom-0 right-0 left-48 md:left-56 p-6 bg-gradient-to-t from-black via-black to-transparent">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidirish uchun..."
              className="w-full bg-slate-900/80 border border-slate-700/50 rounded-full pl-12 pr-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:shadow-lg focus:shadow-pink-500/20 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPage;
