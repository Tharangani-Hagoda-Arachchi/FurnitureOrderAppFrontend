import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    const [menue, setMenue] = React.useState("Home")
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="URBANNEST" />
        <ul className="navbar-menues">
            <li onClick={()=>setMenue("Home")} className={menue === "Home"?"active":""}>Home</li>
            <li onClick={()=>setMenue("Menue")} className={menue === "Menue"?"active":""}>Menue</li>
            <li onClick={()=>setMenue("About")} className={menue === "About"?"active":""}>About</li>
            <li onClick={()=>setMenue("Contact")}className={menue === "Contact"?"active":""}>Contact</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.searchIcon} alt="Search" className="search" />
            <img src={assets.wishlistIcon} alt="Wishlist " className="wishlist" />
            <div className="cart-icon-section">
              <img src={assets.cartIcon} alt="Cart " className="cart" />
               <div className="dot"></div>
            </div>
            <button className="signin">Sign in</button>
        </div>
    </div>
  )
}

export default Navbar