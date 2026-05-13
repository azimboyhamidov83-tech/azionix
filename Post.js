"use client";

import { useState } from "react";
import Link from "next/link";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes ?? 0);

  return (
    <article className="post" aria-labelledby={`post-${post.id}`}>
      <div className="post-header">
        <Link href={`/profile/${post.username}`}>
          <b id={`post-${post.id}`}>@{post.username}</b>
        </Link>
      </div>

      <div className="post-image">
        <img src={post.image} alt={post.caption || `Post by ${post.username}`} />
      </div>

      <div className="post-actions">
        <button className="btn primary" onClick={() => setLikes(likes + 1)} aria-pressed="false">❤️ {likes}</button>
        <button className="btn">Direct</button>
      </div>
    </article>
  );
}