"use client";

import { useState } from "react";
import { posts } from "../data/posts";

export default function AddPost() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(URL.createObjectURL(selected));

    if (selected.type.startsWith("video")) {
      setMediaType("video");
    } else {
      setMediaType("image");
    }
  };

  const createPost = () => {
    if (!file && !text) return;

    posts.unshift({
      id: Date.now(),
      username: "me",
      avatar: "M",
      avatarUrl: "https://i.pravatar.cc/200?img=1",
      caption: text,
      media: file,
      mediaType: mediaType,
      likes: 0,
      timestamp: "now"
    });

    setText("");
    setFile(null);
    setMediaType("image");

    alert("Post uploaded 🚀");
  };

  return (
    <div style={styles.container}>

      <h2>➕ Add Post</h2>

      {/* FILE UPLOAD */}
      <input type="file" accept="image/*,video/*" onChange={handleFile} />

      {/* TEXT */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        style={styles.text}
      />

      {/* PREVIEW */}
      {file && (
        mediaType === "video" ? (
          <video src={file} controls style={{ width: "100%" }} />
        ) : (
          <img src={file} style={{ width: "100%" }} />
        )
      )}

      <button onClick={createPost} style={styles.btn}>
        Post
      </button>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    color: "white"
  },

  text: {
    width: "100%",
    height: "100px",
    marginTop: "10px"
  },

  btn: {
    marginTop: "10px",
    background: "#ff3b7b",
    border: "none",
    padding: "10px",
    width: "100%",
    color: "white"
  }
};