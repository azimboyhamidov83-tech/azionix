import "./globals.css";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOVEGRAM - Premium Social Media",
  description: "Modern, premium dark-mode social media experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-white overflow-hidden antialiased" style={{ background: "linear-gradient(135deg, #0b0b0f 0%, #1a1a23 50%, #0b0b0f 100%)" }}>
        <div className="flex h-screen w-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-hidden ml-64">
            {children}
          </main>
        </div>

        {/* Global Toast Notifications */}
        <Toast />
      </body>
    </html>
  );
}