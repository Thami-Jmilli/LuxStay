import React from 'react'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
  const { data, loading } = useFetch("/hotels/countByType");

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  ];

  return (
    <div style={{ width: "100%", maxWidth: "1024px", display: "flex", justifyContent: "space-between", gap: "16px" }}>
      {loading ? (
        <div style={{ color: "#a06830", fontStyle: "italic" }}>Loading...</div>
      ) : (
        data && images.map((img, i) => (
          <div key={i} style={{ flex: 1, borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: "1px solid #e8c99a", boxShadow: "0 2px 10px rgba(160,104,48,0.15)", backgroundColor: "white" }}>
            <img src={img} alt="" style={{ width: "100%", height: "150px", objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 12px" }}>
              <h1 style={{ fontSize: "16px", textTransform: "capitalize", margin: "0 0 4px", color: "#3d230d", fontFamily: "Georgia, serif" }}>
                {data[i]?.hotel_type}
              </h1>
              <h2 style={{ fontSize: "13px", fontWeight: "400", margin: 0, color: "#a06830" }}>
                {data[i]?.count} {data[i]?.hotel_type}
              </h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyList;
