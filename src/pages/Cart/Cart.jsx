import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { cartContext } from '../../context/cartContext'
import { getItemsByID } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  //cart state(functions)
  const { cart, removeItem, increaseQty, decreaseQty, } = useContext(cartContext)
  const [itemsData, setItemsData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const DELIVERY_FEE = 2000;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      const ids = Object.keys(cart);
      if (!ids.length) {
        setItemsData([]);
        setTotalPrice(0);
        return;
      }

      try {
        const data = await Promise.all(ids.map(id => getItemsByID(id)));
        setItemsData(data);

        const total = data.reduce((acc, item) => acc + item.itemPrice * cart[item._id].toFixed(2), 0);
        setTotalPrice(total);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };
    fetchItems();
  }, [cart]);

  if (!itemsData.length) return <p>Your cart is empty.</p>;

  const fulltotal = (totalPrice + DELIVERY_FEE).toFixed(2);

  return (
    <div className='cart-content'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Color</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {itemsData.map(item => (
          <div>
            <div key={item._id} className="cart-items-title cart-items-item">
              <img src={`http://localhost:4000${item.itemImages[0]}`} alt={item.itemName} className='cart-item-image' />
              <p>{item.itemName}</p>
              <p>LKR {(item.itemPrice).toFixed(2)}</p>
              <div className="quantity">
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <span>{cart[item._id]}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>
              <p>{item.itemName}</p>
              <p>LKR {(item.itemPrice * cart[item._id]).toFixed(2)}</p>
              <button className="remove" onClick={() => removeItem(item._id)}>X</button>
            </div>
            <hr />
          </div>
        ))}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-detai">
                <p>Subtotal</p>
                <p>LKR {totalPrice}</p>
              </div>
              <hr />
              <div className="cart-total-detai">
                <p>Delivary Fee</p>
                <p>LKR {DELIVERY_FEE.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-detai">
                <b>Total</b>
                <b>LKR {fulltotal}</b>
              </div>
            </div>
            <button className="proced-checkout" onClick={() => navigate('/order',{state:{subtotal: totalPrice.toFixed(2),deliveryFee: DELIVERY_FEE.toFixed(2), fulltotal:fulltotal,},})}>PROCEED TO CHECKOUT </button>
          </div>
          <div className="cart-prmocode">
            <div>
              <p>If you have apromo code, Enter it here</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart