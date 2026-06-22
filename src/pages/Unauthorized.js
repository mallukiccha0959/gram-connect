const Unauthorized = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>403 🚫</h1>

      <h2>Unauthorized Access</h2>

      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default Unauthorized;