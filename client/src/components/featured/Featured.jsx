import React from "react";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading } = useFetch("/hotels/countByCity?cities=Dublin,Madrid,Tokyo");

  const cities = [
    { name: "Dublin", img: require("../../assets/images/dublin_img.jpg") },
    { name: "Madrid", img: require("../../assets/images/madrid_img.jpg") },
    { name: "Tokyo",  img: require("../../assets/images/tokyo_img.jpg") },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "1024px", display: "flex", justifyContent: "space-between", gap: "20px", zIndex: 1 }}>
      {loading ? (
        <div style={{ color: "#a06830", fontStyle: "italic" }}>Loading destinations...</div>
      ) : (
        cities.map((city, i) => (
          <div key={city.name} style={{ position: "relative", color: "white", borderRadius: "12px", overflow: "hidden", height: "260px", flex: 1, cursor: "pointer", boxShadow: "0 4px 20px rgba(160,104,48,0.3)" }}>
            <img src={city.img} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,12,0,0.75) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
              <h1 style={{ margin: 0, fontSize: "24px", fontFamily: "Georgia, serif", color: "#ffd93d" }}>{city.name}</h1>
              <h2 style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: "400", color: "#e8c99a" }}>{data[i]} properties</h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Featured;
