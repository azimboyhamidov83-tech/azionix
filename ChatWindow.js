"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ username, chat, onBack }) {
  const user = username || chat;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const listRef = useRef(null);

  // load persisted messages for this chat
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(`chat_messages_${user}`);
      if (raw) {
        setMessages(JSON.parse(raw));
        return;
      }
    } catch (e) {
      // ignore
    }

    // fallback sample messages
    setMessages([
      { from: user, text: "Salom!", id: 1 },
      { from: "me", text: "Va alaykum!", id: 2 }
    ]);
  }, [user]);

  // persist messages when they change
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(`chat_messages_${user}`, JSON.stringify(messages));
    } catch (e) {
      // ignore
    }

    // scroll to bottom
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, user]);

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachment({ file, url });
  };

  const send = () => {
    if (!text && !attachment) return;
    const next = { from: "me", text, img: attachment?.url, id: Date.now() };
    setMessages((m) => [...m, next]);
    setText("");
    setAttachment(null);
  };

  return (
    <div style={styles.container}>

      <header style={styles.header}>
        {onBack && (
          <button onClick={onBack} style={styles.backBtn} aria-label="Back">◀</button>
        )}
        <div style={styles.avatar}>{user?.charAt(0).toUpperCase()}</div>
        <div>
          <div style={styles.name}>@{user}</div>
          <div style={styles.sub}>Online</div>
        </div>
      </header>

      <div style={styles.box} aria-live="polite" ref={listRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              ...styles.msg,
              alignSelf: m.from === "me" ? "flex-end" : "flex-start",
              background: m.from === "me" ? "#ff3b7b" : "#222"
            }}
          >
            {m.img && (
              <img src={m.img} style={styles.msgImg} alt="attachment" />
            )}
            <div>{m.text}</div>
            <div style={styles.msgFrom}>@{m.from}</div>
          </div>
        ))}
      </div>

      <div style={styles.composer}>
        <label style={styles.plus} aria-label="Attach image">
          +
          <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </label>

        <input
          aria-label="Message"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />

        <button onClick={send} style={styles.send} aria-label="Send">➤</button>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerAvatar}>{username?.charAt(0).toUpperCase()}</div>
        <div style={styles.footerName}>@{username}</div>
      </footer>

    </div>
  );
}

const styles = {
  container: { padding: "12px", color: "white", display: "flex", flexDirection: "column", height: "80vh" },
  header: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: "50%", background: "#ff3b7b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  name: { fontWeight: "bold" },
  sub: { fontSize: 12, color: "#aaa" },
  box: { flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "auto", padding: 8 },
  msg: { maxWidth: "70%", padding: 10, borderRadius: 12, color: "white", display: "flex", flexDirection: "column", gap: 6 },
  msgImg: { width: 160, borderRadius: 8, marginBottom: 6, objectFit: "cover" },
  msgFrom: { fontSize: 11, color: "rgba(255,255,255,0.8)" },
  composer: { display: "flex", gap: 8, alignItems: "center", marginTop: 8 },
  plus: { width: 40, height: 40, borderRadius: 10, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  input: { flex: 1, padding: 10, borderRadius: 10, border: "1px solid #222", background: "#0b0b0b", color: "white" },
  send: { width: 44, height: 40, borderRadius: 10, background: "#ff3b7b", border: "none", color: "white", cursor: "pointer" },
  footer: { display: "flex", gap: 8, alignItems: "center", marginTop: 10, opacity: 0.9 },
  footerAvatar: { width: 32, height: 32, borderRadius: "50%", background: "#ff3b7b", display: "flex", alignItems: "center", justifyContent: "center" },
  footerName: { fontSize: 13 }
};