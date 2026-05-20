import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const greetings = ["Bonjour", "Welcome back", "Hello", "Hi", "Good to see you"];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div style={{ backgroundColor: "#3d230d", minHeight: "56px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "1024px", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#ffd93d", fontWeight: "bold", fontSize: "20px", letterSpacing: "3px", fontFamily: "Georgia, serif" }}>
            ✦ LuxStay
          </span>
        </Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#f5e6d3", fontWeight: "500", fontSize: "14px" }}>
              {randomGreeting}, {user.user_name} ✨
            </span>
            <button
              onClick={handleLogout}
              style={{ backgroundColor: "#ffc61a", color: "#1f1007", fontWeight: "600", fontSize: "14px", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => navigate("/register")}
              style={{ backgroundColor: "transparent", border: "1px solid #ffd93d", color: "#ffd93d", fontWeight: "600", fontSize: "14px", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{ backgroundColor: "#ffc61a", color: "#1f1007", fontWeight: "600", fontSize: "14px", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
