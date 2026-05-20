import React from 'react'

const Footer = () => {
  const cols = ["Countries", "Regions", "Cities", "Districts", "Hotels"];
  return (
    <div style={{ width: "100%", maxWidth: "1024px", padding: "0 16px", fontSize: "13px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px", paddingTop: "32px", borderTop: "1px solid #e8c99a" }}>
        {[0,1,2,3,4].map(col => (
          <ul key={col} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cols.map(item => (
              <li key={item} style={{ marginBottom: "10px", color: "#7d4f22", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "#a06830"}
                onMouseLeave={e => e.target.style.color = "#7d4f22"}
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div style={{ textAlign: "center", color: "#a06830", paddingBottom: "20px", fontSize: "12px" }}>
        ✦ Copyright 2024 LuxStay. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
