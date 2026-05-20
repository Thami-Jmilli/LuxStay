import React from 'react'
import useFetch from '../../hooks/useFetch'

const FavouriteProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div style={{ width: "100%", maxWidth: "1024px", display: "flex", justifyContent: "space-between", gap: "20px" }}>
      {loading ? (
        <div style={{ color: "#a06830", fontStyle: "italic" }}>Loading...</div>
      ) : (
        data?.map(item => (
          <div key={item._id} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", borderRadius: "10px", overflow: "hidden", border: "1px solid #e8c99a", backgroundColor: "white", boxShadow: "0 2px 12px rgba(160,104,48,0.15)" }}>
            <img src={require("../../assets/images/hotel.jpg")} alt="" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 14px 14px" }}>
              <span style={{ fontWeight: "bold", fontSize: "15px", display: "block", color: "#3d230d", fontFamily: "Georgia, serif" }}>{item.hotel_name}</span>
              <span style={{ fontWeight: "300", fontSize: "13px", display: "block", color: "#7d4f22", marginTop: "4px" }}>{item.city}</span>
              <span style={{ fontWeight: "500", fontSize: "14px", display: "block", marginTop: "6px", color: "#a06830" }}>Starting from ${item.cheapestPrice}</span>
              {item.hotel_rating && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                  <button style={{ backgroundColor: "#a06830", color: "white", border: "none", padding: "4px 10px", fontWeight: "bold", borderRadius: "6px", fontSize: "13px" }}>
                    {item.hotel_rating}
                  </button>
                  <span style={{ fontSize: "13px", color: "#5c3716" }}>Excellent</span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FavouriteProperties;
