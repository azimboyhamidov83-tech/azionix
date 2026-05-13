"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Home,
  MessageCircle,
  Search,
  User,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname() || "/";

  const isActive = (path: string) => {
    if (path === "/") {
      return (
        pathname === "/" &&
        !pathname.startsWith("/chat") &&
        !pathname.startsWith("/find") &&
        !pathname.startsWith("/profile")
      );
    }

    return pathname.startsWith(path);
  };

  const navItems = [
    {
      name: "Menu",
      href: "/",
      icon: Home,
    },
    {
      name: "Chat",
      href: "/chat",
      icon: MessageCircle,
    },
    {
      name: "Find",
      href: "/find",
      icon: Search,
    },
    {
      name: "Profile",
      href: "/profile/oygul",
      icon: User,
    },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0
        h-screen w-64
        flex flex-col justify-between
        px-6 py-7
        border-r border-white/10
        bg-[#07070b]/95
        backdrop-blur-2xl
        z-50
      "
    >
      {/* TOP */}
      <div className="flex flex-col gap-10">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-4 group"
        >
          {/* ICON */}
          <div
            className="
              relative
              w-14 h-14
              rounded-2xl
              flex items-center justify-center
              bg-gradient-to-br
              from-pink-500
              via-[#ff3b7b]
              to-rose-600
              shadow-[0_0_35px_rgba(255,59,123,0.45)]
              transition-all duration-300
              group-hover:scale-105
              group-hover:shadow-[0_0_50px_rgba(255,59,123,0.65)]
            "
          >
            {/* GLOW */}
            <div
              className="
                absolute inset-0
                rounded-2xl
                bg-white/10
                blur-xl
              "
            />

            <Heart
              className="
                relative z-10
                w-7 h-7
                text-white
                drop-shadow-lg
              "
              fill="white"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col leading-none">

            <div
              className="
                text-[30px]
                font-black
                tracking-[-1.5px]
                select-none
              "
            >
              <span className="text-white">
                LOVE
              </span>

              <span className="text-[#ff3b7b]">
                GRAM
              </span>
            </div>

            <span
              className="
                text-[12px]
                font-medium
                text-gray-400
                mt-1
                tracking-wide
              "
            >
              Azionix's social media
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-4">

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group
                  relative
                  flex items-center gap-4
                  px-5 py-4
                  rounded-2xl
                  overflow-hidden
                  border
                  transition-all duration-300
                  ${
                    active
                      ? `
                        bg-gradient-to-r
                        from-[#ff3b7b]/20
                        to-[#ff3b7b]/5
                        border-[#ff3b7b]/40
                        shadow-[0_0_30px_rgba(255,59,123,0.25)]
                      `
                      : `
                        border-transparent
                        hover:border-white/10
                        hover:bg-white/[0.03]
                      `
                  }
                `}
              >
                {/* ACTIVE GLOW */}
                {active && (
                  <div
                    className="
                      absolute left-0 top-0
                      h-full w-1
                      bg-[#ff3b7b]
                    "
                  />
                )}

                {/* ICON */}
                <Icon
                  className={`
                    w-5 h-5
                    transition-all duration-300
                    ${
                      active
                        ? "text-[#ff3b7b]"
                        : "text-gray-300 group-hover:text-white"
                    }
                  `}
                />

                {/* TEXT */}
                <span
                  className={`
                    text-[15px]
                    font-semibold
                    transition-all duration-300
                    ${
                      active
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </span>

                {/* ACTIVE DOT */}
                {active && (
                  <div
                    className="
                      ml-auto
                      w-2 h-2
                      rounded-full
                      bg-[#ff3b7b]
                      animate-pulse
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM PROFILE */}
      <Link
        href="/profile/oygul"
        className="
          group
          flex items-center gap-4
          p-4
          rounded-2xl
          border border-white/10
          bg-white/[0.03]
          hover:bg-[#ff3b7b]/10
          hover:border-[#ff3b7b]/30
          transition-all duration-300
          hover:shadow-[0_0_30px_rgba(255,59,123,0.2)]
        "
      >
        {/* AVATAR */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
            alt="profile"
            className="
              w-14 h-14
              rounded-full
              object-cover
              border-2 border-[#ff3b7b]/50
              group-hover:border-[#ff3b7b]
              transition-all duration-300
            "
          />

          {/* ONLINE */}
          <div
            className="
              absolute bottom-0 right-0
              w-4 h-4
              rounded-full
              bg-green-500
              border-2 border-black
            "
          />
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">

          <div
            className="
              text-white
              font-bold
              text-sm
              truncate
            "
          >
            @oygul
          </div>

          <div
            className="
              text-gray-400
              text-xs
              mt-1
            "
          >
            View my profile
          </div>
        </div>

        {/* ARROW */}
        <ChevronRight
          className="
            w-5 h-5
            text-gray-500
            group-hover:text-[#ff3b7b]
            group-hover:translate-x-1
            transition-all duration-300
          "
        />
      </Link>
    </aside>
  );
}