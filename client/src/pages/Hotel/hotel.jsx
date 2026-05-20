import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/mailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/reserve/Reserve";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  }

  const days = dates?.length > 0 ? dayDifference(dates[0]?.endDate, dates[0]?.startDate) : 1;

  const handleOpen = (i) => { setSlideNumber(i); setOpen(true); };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") { newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1; }
    else { newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1; }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) { setOpenModal(true); }
    else { navigate("/login", { state: { from: `/hotels/${id}` } }); }
  };

  return (
    <div style={{ backgroundColor: "#fdf8f3", minHeight: "100vh" }}>
      <Navbar />
      <Header type="list" />

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#a06830", fontStyle: "italic" }}>Loading...</div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "24px" }}>
            {open && (
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", backgroundColor: "rgba(30,12,0,0.85)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} style={{ position: "absolute", top: "20px", right: "20px", fontSize: "30px", color: "#ffd93d", cursor: "pointer" }} />
                <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => handleMove("l")} style={{ fontSize: "50px", color: "#ffd93d", cursor: "pointer", margin: "0 20px" }} />
                <div style={{ width: "60%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={data.images[slideNumber]} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }} />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} onClick={() => handleMove("r")} style={{ fontSize: "50px", color: "#ffd93d", cursor: "pointer", margin: "0 20px" }} />
              </div>
            )}

            <div style={{ width: "100%", maxWidth: "1024px", display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px" }}>
              <h1 style={{ fontSize: "28px", fontFamily: "Georgia, serif", color: "#3d230d", margin: 0 }}>{data.hotel_name}</h1>

              <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", color: "#a06830" }}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.hotel_address}</span>
              </div>

              <span style={{ color: "#5c3716", fontWeight: "500", fontSize: "14px" }}>
                Excellent location – {data.distance}m from center
              </span>

              <span style={{ color: "#5c8a3c", fontWeight: "500", fontSize: "14px", backgroundColor: "#f0fff0", padding: "8px 12px", borderRadius: "6px", border: "1px solid #c3e6cb" }}>
                ✨ Book a stay over ${data.cheapestPrice} and enjoy a relaxing luxury experience
              </span>

              {/* Images grid */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px", marginTop: "8px" }}>
                {data.images?.map((photo, i) => (
                  <div key={i} style={{ width: "32%", overflow: "hidden", borderRadius: "8px", cursor: "pointer" }}
                    onClick={() => handleOpen(i)}>
                    <img src={photo} alt="" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block", transition: "transform 0.2s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  </div>
                ))}
              </div>

              {/* Details section */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "24px", marginTop: "20px", marginBottom: "32px" }}>
                <div style={{ flex: 3 }}>
                  <h1 style={{ fontSize: "22px", fontFamily: "Georgia, serif", color: "#3d230d", marginTop: 0 }}>{data.hotel_title}</h1>
                  <p style={{ fontSize: "14px", color: "#5c3716", lineHeight: "1.7" }}>{data.hotel_description}</p>
                  <div style={{ marginTop: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#f5e6d3", border: "1px solid #d4a96a" }}>
                    <h2 style={{ margin: "0 0 8px", color: "#3d230d", fontFamily: "Georgia, serif" }}>Relax & Enjoy Your Stay 🌴</h2>
                    <p style={{ margin: 0, color: "#7d4f22", fontSize: "14px" }}>
                      Escape into comfort with premium rooms, beautiful views, and unforgettable hospitality.
                    </p>
                  </div>
                </div>

                <div style={{ flex: 1, background: "linear-gradient(135deg, #3d230d 0%, #5c3716 100%)", display: "flex", padding: "24px", flexDirection: "column", gap: "16px", borderRadius: "12px", color: "white" }}>
                  <h1 style={{ fontSize: "17px", color: "#ffd93d", margin: 0, fontFamily: "Georgia, serif" }}>
                    Perfect for a {days}-night stay!
                  </h1>
                  <span style={{ fontSize: "13px", color: "#e8c99a" }}>Located in the real heart of the city.</span>
                  <h2 style={{ fontWeight: "300", margin: 0, color: "white" }}>
                    <b style={{ fontSize: "22px", color: "#ffd93d" }}>${days * data.cheapestPrice * (options?.rooms || 1)}</b> ({days} nights)
                  </h2>
                  <button
                    onClick={handleClick}
                    style={{ backgroundColor: "#ffc61a", color: "#1f1007", border: "none", borderRadius: "8px", fontWeight: "700", color: "#1f1007", padding: "14px", cursor: "pointer", fontSize: "15px" }}
                  >
                    ✦ Reserve Now
                  </button>
                </div>
              </div>
            </div>

            <MailList />
            <Footer />
          </div>
        </>
      )}

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
