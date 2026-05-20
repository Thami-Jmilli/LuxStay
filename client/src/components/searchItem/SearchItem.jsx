import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({ item }) => {
  return (
    <div style={{ border: "1px solid #e8c99a", padding: "16px", borderRadius: "10px", display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "20px", backgroundColor: "white", boxShadow: "0 2px 12px rgba(160,104,48,0.12)" }}>
      <img src={item.images[0]} alt="" style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }} />

      <div style={{ display: "flex", flexDirection: "column", flex: 2, gap: "6px" }}>
        <h1 style={{ fontSize: "20px", color: "#3d230d", margin: 0, fontFamily: "Georgia, serif" }}>{item.hotel_name}</h1>
        <span style={{ fontSize: "12px", color: "#a06830" }}>{item.distance}m from centre</span>
        <span style={{ fontSize: "12px", backgroundColor: "#5c3716", color: "white", width: "max-content", padding: "4px 10px", borderRadius: "5px" }}>
          Free airport taxi
        </span>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "#3d230d" }}>Studio Apartment with Air conditioning</span>
        <span style={{ fontSize: "12px", color: "#5c3716" }}>{item.hotel_description}</span>
        <span style={{ fontSize: "12px", color: "#5c8a3c", fontWeight: "bold" }}>Free cancellation</span>
        <span style={{ fontSize: "12px", color: "#5c8a3c" }}>You can cancel later, so lock in this great price today!</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {item.hotel_rating && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "500", color: "#3d230d" }}>Excellent</span>
            <button style={{ backgroundColor: "#a06830", color: "white", padding: "6px 10px", fontWeight: "bold", border: "none", borderRadius: "6px" }}>
              {item.hotel_rating}
            </button>
          </div>
        )}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "26px", fontWeight: "bold", color: "#3d230d" }}>${item.cheapestPrice}</span>
          <span style={{ fontSize: "12px", color: "#a06830" }}>Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`} style={{ textDecoration: "none" }}>
            <button style={{ backgroundColor: "#a06830", color: "white", fontWeight: "bold", padding: "12px 16px", border: "none", cursor: "pointer", borderRadius: "6px", width: "100%", fontSize: "14px" }}>
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
