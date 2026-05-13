export default function ProfileGrid({ user }) {
    return (
      <div style={styles.grid}>
        {user.posts.map((p) => (
          <div key={p.id} style={styles.item}>
            {p.type === "img" ? "🖼 IMAGE" : "🎥 VIDEO"}
            <p>👁 {p.views}</p>
          </div>
        ))}
      </div>
    );
  }
  
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px",
      marginTop: "20px"
    },
    item: {
      background: "#222",
      padding: "20px",
      textAlign: "center",
      borderRadius: "10px"
    }
  };