"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname() || "/";
  const isActive = (p) => (p === "/" ? path === "/" : path.startsWith(p));

  return (
    <nav className="sidebar" aria-label="Primary">
      <div className="logo">❤️</div>

      <Link href="/" className={"nav-link " + (isActive("/") ? "active" : "")}>🏠</Link>
      <Link href="/chat" className={"nav-link " + (isActive("/chat") ? "active" : "")}>💬</Link>
      <Link href="/find" className={"nav-link " + (isActive("/find") ? "active" : "")}>🔍</Link>
      <Link href="/profile/oygul" className={"nav-link " + (isActive("/profile") ? "active" : "")}>👤</Link>
    </nav>
  );
}