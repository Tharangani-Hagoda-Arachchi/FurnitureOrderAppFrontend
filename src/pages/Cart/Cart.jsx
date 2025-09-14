import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { cartContext } from '../../context/cartContext'
import { getItemsByID } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  //cart state(functions)
  const { cart, removeItem, increaseQty, decreaseQty } = useContext(cartContext)
  const [itemsData, setItemsData] = useState([]);

  const DELIVERY_FEE = 2000;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      const ids = Object.keys(cart);
      if (!ids.length) {
        setItemsData([]);
        return;
      }

      try {
        const data = await Promise.all(ids.map(id => getItemsByID(id)));
        setItemsData(data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };
    fetchItems();
  }, [cart]);


  if (!itemsData.length) return <p>Your cart is empty.</p>;

  const subtotal = Object.keys(cart).reduce((acc, id) => {
    const item = cart[id];
    if (!item) return acc;
    return acc + Number(item.price) * Number(item.qty);
  }, 0);

  const fullTotal = subtotal + DELIVERY_FEE;


  return (
    <div className='cart-content'>
      <h1>Cart</h1>
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
        {itemsData.map(item => {
          const cartItem = cart[item._id] || { qty: 0, price: item.itemPrice };
          const qty = Number(cartItem.qty || 0);
          const price = Number(cartItem.price || item.itemPrice);
          return (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={`http://localhost:4000${item.itemImages[0]}`} alt={item.itemName} className='cart-item-image' />
                <p>{item.itemName}</p>
                <p>LKR {price.toFixed(2)}</p>
                <div className="quantity">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>
                <p>
                  {cartItem.color ? (
                    <span
                      className='cart-color-circle'
                      style={{ backgroundColor: cartItem.color }}
                      title={cartItem.color}
                    />
                  ) : (
                    '—'
                  )}
                </p>
                <p>LKR {(price * qty).toFixed(2)}</p>
                <button className="remove" onClick={() => removeItem(item._id)}>X</button>
              </div>
              <hr />
            </div>
          )
        }

        )

        }

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-detai">
                <p>Subtotal</p>
                <p>LKR {subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-detai">
                <p>Delivary Fee</p>
                <p>LKR {DELIVERY_FEE.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-detai">
                <b>Total</b>
                <b>LKR {fullTotal.toFixed(2)}</b>
              </div>
            </div>
            <button className="proced-checkout" onClick={() => navigate('/order', { state: { subtotal: subtotal.toFixed(2), deliveryFee: DELIVERY_FEE.toFixed(2), fulltotal: fullTotal.toFixed(2) }, })}>PROCEED TO CHECKOUT </button>
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