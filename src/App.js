import React from "react";

const appStyle = {
  minHeight: "100vh",
  backgroundColor: "#0a2342",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Nunito, sans-serif",
  fontSize: "3rem",
  fontWeight: 700,
  textAlign: "center"
};

function App() {
  return (
    <div style={appStyle}>
      <h1 style={titleStyle}>MANPA HOST</h1>
    </div>
  );
}

export default App;
