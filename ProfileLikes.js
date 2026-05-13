export default function ProfileLikes({ user }) {
    return (
      <div style={styles.row}>
        {user.likes.map((l, i) => (
          <div key={i} style={styles.circle}>
            👤
          </div>
        ))}
      </div>
    );
  }
  
  const styles = {
    row: {
      display: "flex",
      gap: "10px",
      margin: "20px 0"
    },
    circle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#333",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };