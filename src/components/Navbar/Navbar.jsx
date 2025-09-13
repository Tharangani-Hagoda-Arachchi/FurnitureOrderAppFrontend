import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import { assets } from '../../assets/assets'
import { authContext } from "../../context/authContext.jsx";
import { cartContext } from '../../context/cartContext.jsx';


const Navbar = ({ setShowLogin }) => {
  const [menue, setMenue] = React.useState("Home")
  const { token, logout } = React.useContext(authContext);
  const { totalQuantity } = React.useContext(cartContext);

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="URBANNEST" />
      <ul className="navbar-menues">
        <li onClick={() => setMenue("Home")} className={menue === "Home" ? "active" : ""}>Home</li>
        <li onClick={() => setMenue("Category")} className={menue === "Category" ? "active" : ""}>Category</li>
        <li onClick={() => setMenue("About")} className={menue === "About" ? "active" : ""}>About</li>
        <li onClick={() => setMenue("Contact")} className={menue === "Contact" ? "active" : ""}>Contact</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.searchIcon} alt="Search" className="search" />
        {
          token && (
            <>
              <img src={assets.wishlistIcon} alt="Wishlist " className="wishlist" />
              <div className="cart-icon-section">
                <Link to='/cart'><img src={assets.cartIcon} alt="Cart " className="cart-symbol" /></Link>
                <div className="notify">{totalQuantity}</div>
              </div>
            </>
          )
        }

        {
          token ? (
            <button className="signin" onClick={logout} >Logout</button>
          ) : (

            <button className="signin" onClick={() => setShowLogin(true)}>Sign in</button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar