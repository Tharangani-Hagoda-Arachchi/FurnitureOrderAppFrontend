import React from 'react'
import './PlaceOrder.css'
import { useLocation } from 'react-router-dom';

const PlaceOrder = () => {
  const location = useLocation();
  const { subtotal, deliveryFee, fulltotal } = location.state || {};

  return (
    <form className='place-orde'>
      <div className="place-order-left">
        <p className="title">Your Delivery Informations</p>
        <div className="field">
          <input type="text" placeholder='First Name' required />
          <input type="text" placeholder='Last Name' required />
        </div>
        <input type="email" placeholder='Email Addresss' required />
        <input type="text" placeholder='Adress' required />
        <div className="field">
          <input type="text" placeholder='City' required />
          <input type="text" placeholder='District' required />
        </div>
        <div className="field">
          <input type="text" placeholder='Zip Code' required />
          <input type="text" placeholder='Province' required />
        </div>
        <input type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detai">
              <p>Subtotal</p>
              <p>LKR {subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-detai">
              <p>Delivary Fee</p>
              <p>LKR {deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-detai">
              <b>Total</b>
              <b>LKR {fulltotal}</b>
            </div>
          </div>
          <button className="proced-checkout" >PROCEED TO PAYMENT </button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder