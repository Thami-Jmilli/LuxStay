import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const s = {
  header: { backgroundColor: "#3d230d", color: "white", display: "flex", justifyContent: "center", position: "relative" },
  container: { width: "100%", maxWidth: "1024px", margin: "20px 0px 100px 0px", padding: "0 16px" },
  containerList: { width: "100%", maxWidth: "1024px", margin: "20px 0px 0px 0px", padding: "0 16px" },
  headerList: { display: "flex", gap: "32px", marginBottom: "40px" },
  headerListItem: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "8px 14px", borderRadius: "20px", fontSize: "14px", color: "#e8c99a" },
  headerListItemActive: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "8px 14px", borderRadius: "20px", border: "1px solid #ffd93d", color: "#ffd93d", fontSize: "14px" },
  title: { fontSize: "36px", fontFamily: "Georgia, serif", fontWeight: "700", color: "#ffd93d", marginBottom: "12px" },
  desc: { marginBottom: "20px", color: "#e8c99a", fontSize: "15px" },
  btn: { backgroundColor: "#ffc61a", color: "#1f1007", fontWeight: "700", border: "none", padding: "12px 24px", cursor: "pointer", borderRadius: "6px", fontSize: "15px" },
  searchBar: { height: "auto", backgroundColor: "white", border: "3px solid #d4a96a", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "12px 10px", borderRadius: "8px", position: "absolute", bottom: "-30px", width: "calc(100% - 32px)", maxWidth: "1024px", boxShadow: "0 4px 20px rgba(160,104,48,0.25)", flexWrap: "wrap", gap: "8px" },
  searchItem: { display: "flex", alignItems: "center", gap: "8px", position: "relative" },
  icon: { color: "#a06830" },
  input: { border: "none", outline: "none", fontSize: "14px", color: "#3d230d" },
  searchText: { color: "#a06830", cursor: "pointer", fontSize: "14px" },
  date: { position: "absolute", top: "50px", zIndex: 2 },
  options: { position: "absolute", top: "50px", backgroundColor: "white", color: "#3d230d", borderRadius: "8px", zIndex: 2, border: "1px solid #d4a96a", boxShadow: "0 4px 16px rgba(160,104,48,0.2)", padding: "8px" },
  optionItem: { width: "200px", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0" },
  optionCounter: { display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" },
  optionBtn: { width: "28px", height: "28px", border: "1px solid #d4a96a", cursor: "pointer", color: "#3d230d", backgroundColor: "white", borderRadius: "4px", fontWeight: "bold" },
};

const Header = ({ type }) => {
  const [destination, setDestination] = useState("")
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({ persons: 1, rooms: 1 })
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])

  const navigate = useNavigate()
  const { user_name } = useContext(AuthContext)
  const { dispatch } = useContext(SearchContext)

  const handleOption = (name, operation) => {
    setOptions(prev => ({ ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1 }))
  }

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels", { state: { destination, dates, options } });
  }

  return (
    <div style={s.header}>
      <div style={type === "list" ? s.containerList : s.container}>
        <div style={s.headerList}>
          <div style={s.headerListItemActive}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div style={s.headerListItem}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div style={s.headerListItem}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rental</span>
          </div>
          <div style={s.headerListItem}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi</span>
          </div>
        </div>

        {type !== "list" && (
          <>
            <h1 style={s.title}>Hotels at affordable prices? Why not?</h1>
            <p style={s.desc}>Book a hotel for your stay today and get 10% cashback and savings.</p>
            {!user_name && <button style={s.btn}>Sign in / Register</button>}

            <div style={s.searchBar}>
              <div style={s.searchItem}>
                <FontAwesomeIcon icon={faBed} style={s.icon} />
                <input type="text" placeholder="Where are you going?" style={s.input}
                  onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div style={s.searchItem}>
                <FontAwesomeIcon icon={faCalendarDays} style={s.icon} />
                <span onClick={() => setOpenCalendar(!openCalendar)} style={s.searchText}>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openCalendar && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={item => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    style={s.date}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div style={s.searchItem}>
                <FontAwesomeIcon icon={faPerson} style={s.icon} />
                <span onClick={() => setOpenOptions(!openOptions)} style={s.searchText}>
                  {`${options.persons} persons · ${options.rooms} rooms`}
                </span>
                {openOptions && (
                  <div style={s.options}>
                    <div style={s.optionItem}>
                      <span style={{ fontSize: "14px", color: "#5c3716" }}>Person</span>
                      <div style={s.optionCounter}>
                        <button disabled={options.persons <= 1} style={s.optionBtn} onClick={() => handleOption("persons", "d")}>-</button>
                        <span>{options.persons}</span>
                        <button style={s.optionBtn} onClick={() => handleOption("persons", "i")}>+</button>
                      </div>
                    </div>
                    <div style={s.optionItem}>
                      <span style={{ fontSize: "14px", color: "#5c3716" }}>Rooms</span>
                      <div style={s.optionCounter}>
                        <button disabled={options.rooms <= 1} style={s.optionBtn} onClick={() => handleOption("rooms", "d")}>-</button>
                        <span>{options.rooms}</span>
                        <button style={s.optionBtn} onClick={() => handleOption("rooms", "i")}>+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div style={s.searchItem}>
                <button style={s.btn} onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
