import React from 'react'

const MailList = () => {
  return (
    <div style={{ width: "100%", marginTop: "50px", background: "linear-gradient(135deg, #3d230d 0%, #5c3716 100%)", color: "white", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "50px 20px" }}>
      <h1 style={{ margin: 0, fontSize: "28px", fontFamily: "Georgia, serif", color: "#ffd93d" }}>
        Affordable deals. Always.
      </h1>
      <span style={{ color: "#e8c99a", fontSize: "15px", maxWidth: "480px", textAlign: "center" }}>
        Interested in more exciting deals? Sign up to receive the best deals.
      </span>
      <div style={{ display: "flex", gap: "0" }}>
        <input
          type="text"
          placeholder="Your Email"
          style={{ width: "280px", height: "44px", padding: "0 14px", border: "2px solid #d4a96a", borderRight: "none", borderRadius: "6px 0 0 6px", outline: "none", fontSize: "14px", color: "#3d230d" }}
        />
        <button style={{ height: "44px", padding: "0 24px", backgroundColor: "#ffc61a", color: "#1f1007", fontWeight: "700", border: "none", borderRadius: "0 6px 6px 0", cursor: "pointer", fontSize: "14px" }}>
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default MailList;
