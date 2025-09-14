import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import React, { useContext } from 'react'
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import ItemDetail from "./pages/ItemDetails/ItemDetail"
import Login from "./components/Login/Login"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import Footer from "./components/Footer/Footer"

const App = () => {
  //useState for popup login form
  const [showLogin, setShowLogin] = React.useState(false)
  const location = useLocation();


  const minimalNavbarPaths = ["/cart", "/order"];
  // Also hide for any /item-detail/:id page
  const isMinimalNavbar = minimalNavbarPaths.includes(location.pathname) || location.pathname.startsWith("/item-detail");

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="app">
        < Navbar setShowLogin={setShowLogin} hideMenu={isMinimalNavbar}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/order" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
          <Route path="/item-detail/:id" element={<ItemDetail />} />
        </Routes>
      </div>
      <Footer id='footer' />

    </>
  )

}

export default App


