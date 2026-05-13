import Link from "next/link";
import { users } from "../data/users";

export default function ChatList() {
  return (
    <div className="chat-list">
      {users.map((u) => (
        <Link href={`/chat?user=${u.username}`} key={u.username} className="chat-item">
          <div>{u.avatar}</div>
          <div>@{u.username}</div>
        </Link>
      ))}
    </div>
  );
}