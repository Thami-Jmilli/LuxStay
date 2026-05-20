import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const [openDate, setOpenDate] = useState(false)

  const { data, loading, reFetchData } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const inputStyle = { border: "1px solid #d4a96a", padding: "8px 10px", borderRadius: "6px", outline: "none", width: "100%", color: "#3d230d", fontSize: "13px" }
  const labelStyle = { fontSize: "12px", color: "#7d4f22", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }

  return (
    <div style={{ backgroundColor: "#fdf8f3", minHeight: "100vh" }}>
      <Navbar />
      <Header type="list" />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: "24px", width: "100%", maxWidth: "1024px" }}>

          {/* Sidebar */}
          <div style={{ width: "260px", flexShrink: 0, backgroundColor: "white", borderRadius: "12px", padding: "20px", border: "1px solid #e8c99a", boxShadow: "0 2px 12px rgba(160,104,48,0.12)", alignSelf: "flex-start" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: "18px", fontFamily: "Georgia, serif", color: "#3d230d", borderBottom: "2px solid #ffc61a", paddingBottom: "10px" }}>
              Search
            </h2>

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Destination</label>
              <input placeholder={destination} type="text" style={inputStyle} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                style={{ display: "block", padding: "8px 10px", border: "1px solid #d4a96a", borderRadius: "6px", cursor: "pointer", fontSize: "13px", color: "#a06830" }}
              >
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={item => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Options</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Min Price / night", setter: setMin, type: "number" },
                  { label: "Max Price / night", setter: setMax, type: "number" },
                ].map(({ label, setter, type }) => (
                  <div key={label}>
                    <label style={{ ...labelStyle, textTransform: "none" }}>{label}</label>
                    <input type={type} onChange={e => setter(e.target.value)} style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label style={{ ...labelStyle, textTransform: "none" }}>Persons</label>
                  <input type="number" min={1} placeholder={options.persons} style={inputStyle} />
                </div>
                <div>
                  <label style={{ ...labelStyle, textTransform: "none" }}>Rooms</label>
                  <input type="number" min={1} placeholder={options.rooms} style={inputStyle} />
                </div>
              </div>
            </div>

            <button
              onClick={() => reFetchData()}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #a06830, #c0893a)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "15px" }}
            >
              Search
            </button>
          </div>

          {/* Results */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ color: "#a06830", fontStyle: "italic", padding: "20px" }}>Loading...</div>
            ) : (
              data.map(item => <SearchItem item={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
