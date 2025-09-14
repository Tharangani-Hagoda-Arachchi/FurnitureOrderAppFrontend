import { Route, Routes } from "react-router-dom"
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

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/item-detail/:id" element={<ItemDetail />} />
        </Routes>
      </div>
      <Footer/>

    </>
  )

}

export default App


