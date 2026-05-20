import React from 'react'
import FavouriteProperties from '../../components/favouriteProperties/FavouriteProperties'
import Featured from '../../components/featured/Featured'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/mailList'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from '../../components/propertyList/propertyList'

const Home = () => {
  return (
    <div style={{ backgroundColor: "#fdf8f3" }}>
      <Navbar />
      <Header />
      <div style={{ marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
        <Featured />
        <h1 style={{ width: "1024px", fontSize: "24px", fontFamily: "Georgia, serif", color: "#3d230d", margin: 0, borderLeft: "4px solid #ffc61a", paddingLeft: "16px" }}>
          Browse by property type
        </h1>
        <PropertyList />
        <h1 style={{ width: "1024px", fontSize: "24px", fontFamily: "Georgia, serif", color: "#3d230d", margin: 0, borderLeft: "4px solid #ffc61a", paddingLeft: "16px" }}>
          Guest Favourites
        </h1>
        <FavouriteProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home;
