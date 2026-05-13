export default function ProfileHeader({ user }) {
    return (
      <div style={styles.header}>
        <div style={styles.avatar}>{user.avatar}</div>
  
        <div>
          <h2>@{user.username}</h2>
          <p>photos: {user.photos} | married: {user.married}</p>
        </div>
      </div>
    );
  }
  
  const styles = {
    header: {
      display: "flex",
      gap: "20px",
      alignItems: "center"
    },
    avatar: {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      background: "white",
      color: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "30px",
      fontWeight: "bold"
    }
  };