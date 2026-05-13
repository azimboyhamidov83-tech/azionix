import { useState } from "react";

export default function CreatePost({ addPost }) {
  const [text, setText] = useState("");

  const handlePost = () => {
    addPost({
      id: Date.now(),
      username: "you",
      avatar: "Y",
      content: text,
      likes: 0,
      views: 0
    });

    setText("");
  };

  return (
    <div style={styles.box}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

const styles = {
  box: {
    marginLeft: "140px",
    padding: "10px"
  }
};