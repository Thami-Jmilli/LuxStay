import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({ baseURL: "http://localhost:5000/api", withCredentials: true });

const Register = () => {
  const [credentials, setCredentials] = useState({ user_name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", credentials);
      alert("Account created successfully ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  const inputStyle = {
    padding: "12px 16px", border: "1px solid #d4a96a", borderRadius: "8px", outline: "none",
    fontSize: "15px", color: "#3d230d", width: "100%", boxSizing: "border-box",
    fontFamily: "Georgia, serif", backgroundColor: "#fffdf0"
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fdf8f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", padding: "48px 40px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(160,104,48,0.15)", width: "380px", border: "1px solid #e8c99a" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "28px", fontFamily: "Georgia, serif", fontWeight: "bold", color: "#3d230d", letterSpacing: "2px" }}>✦ LuxStay</div>
          <div style={{ color: "#a06830", fontSize: "14px", marginTop: "8px" }}>Create your account</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input type="text" placeholder="Username" id="user_name" onChange={handleChange} style={inputStyle} />
          <input type="email" placeholder="Email" id="email" onChange={handleChange} style={inputStyle} />
          <input type="password" placeholder="Password" id="password" onChange={handleChange} style={inputStyle} />

          <button
            onClick={handleClick}
            style={{ padding: "14px", background: "linear-gradient(135deg, #a06830, #c0893a)", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "16px", fontFamily: "Georgia, serif", marginTop: "8px" }}
          >
            Create Account ✨
          </button>

          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <span style={{ color: "#7d4f22", fontSize: "13px" }}>Already have an account? </span>
            <span onClick={() => navigate("/login")} style={{ color: "#a06830", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
