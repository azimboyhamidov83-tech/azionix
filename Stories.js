import { users } from "../data/users";
import Link from "next/link";

export default function Stories() {
  return (
    <div className="stories">
      {users.map((u) => (
        <Link href={`/profile/${u.username}`} key={u.username} className="story">
          <div className="story-avatar">{u.avatar}</div>
          <div>@{u.username}</div>
        </Link>
      ))}
    </div>
  );
}