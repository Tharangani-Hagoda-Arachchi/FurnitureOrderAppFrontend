import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="Brandon Urabannest" />
                <p>"At Brandon Urabannest, we believe furniture should be more than just functional – it should reflect your lifestyle and bring comfort to your everyday living. Our collection is thoughtfully designed to combine quality, durability, and timeless style, making every space feel like home.</p>
                <div className="footer-social-icon">
                    <img src={assets.facebookIcon} alt="Facebook" />
                    <img src={assets.twiteer} alt="Twitter" />
                    <img src={assets.linkdinIcon} alt="Linkedin" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivary</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+9476-4972449</li>
                    <li>brandonurabannest@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2025 @ Brandon Urabannest - All Right Reserved</p>

    </div>
  )
}

export default Footer