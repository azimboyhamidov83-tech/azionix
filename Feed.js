"use client";

import { posts } from "../data/posts";
import Post from "./Post";
import Stories from "./Stories";

export default function Feed() {
  return (
    <>
      <Stories />
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </>
  );
}