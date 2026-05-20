import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(roomId =>
          axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`, { dates: allDates }, { withCredentials: true })
        )
      );
      alert("Room booked successfully ✅");
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(30,12,0,0.6)", position: "fixed", top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
      <div style={{ backgroundColor: "white", padding: "28px", position: "relative", width: "440px", borderRadius: "12px", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(30,12,0,0.3)" }}>
        <div style={{ borderBottom: "2px solid #e8c99a", paddingBottom: "12px", marginBottom: "16px" }}>
          <h2 style={{ margin: 0, color: "#3d230d", fontFamily: "Georgia, serif", fontSize: "20px" }}>Select Your Rooms</h2>
        </div>

        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => setOpen(false)}
          style={{ position: "absolute", top: "16px", right: "16px", cursor: "pointer", color: "#a06830", fontSize: "22px" }}
        />

        {data.map(item => (
          <div key={item._id} style={{ display: "flex", alignItems: "center", gap: "20px", padding: "16px 0", borderBottom: "1px solid #f5e6d3" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontWeight: "600", color: "#3d230d", fontFamily: "Georgia, serif" }}>{item.title}</div>
              <div style={{ fontWeight: "300", color: "#7d4f22", fontSize: "14px" }}>{item.description}</div>
              <div style={{ fontSize: "12px", color: "#a06830" }}>Max people: <b>{item.Capacity}</b></div>
              <div style={{ fontWeight: "600", color: "#a06830", fontSize: "16px" }}>${item.price}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {item.roomNumbers.map(roomNumber => (
                  <div key={roomNumber._id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", fontSize: "12px", color: "#5c3716" }}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                      style={{ accentColor: "#a06830" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleClick}
          style={{ border: "none", padding: "14px 20px", background: "linear-gradient(135deg, #a06830, #c0893a)", color: "white", fontWeight: "bold", cursor: "pointer", borderRadius: "8px", width: "100%", marginTop: "20px", fontSize: "15px" }}
        >
          ✦ Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
