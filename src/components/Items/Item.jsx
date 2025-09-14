
import React, { useContext, useEffect, useState } from 'react'
import './Item.css'
import { getItems, getItemsByCategory } from '../../services/api.js';
import RatingStar from '../RatingStar/RatingStar.jsx';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext.jsx';
import { cartContext } from '../../context/cartContext.jsx';

const Item = ({ selectCategories }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // navigate for view item details
  const navigate = useNavigate();

  //logins state(token)
  const { token } = useContext(authContext)
  //cart state(functions)
  const { cart, addToCart, increaseQty, decreaseQty } = useContext(cartContext)


  // vie detail onclick function
  const detailView = (itemID, e) => {
    navigate(`/item-detail/${itemID}`)
  }
  // calculate final price with discount
  const calculateFinalPrice = (price, discount) => {
    return (price - discount).toFixed(2);
  };

  // Handle adding item to cart with discounted price and first color
  const handleAddToCart = (item) => {
    const finalPrice = calculateFinalPrice(item.itemPrice, item.itemDiscount);

    let firstColor = null;
    if (item.itemColor && item.itemColor.length > 0) {
      firstColor = item.itemColor[0].split(',')[0]; // take the first hex code
    }

    addToCart(item._id, finalPrice, firstColor);
  };

  useEffect(() => {
    if (selectCategories && selectCategories !== "All") {
      setLoading(true);
      getItemsByCategory(selectCategories)
        .then((res) => {
          //console.log("API item Response:", res.data.data);
          setItems(res.data || []);
          setLoading(false);
        })
        .catch(() => {
          setItems([]);
        })
        .finally(() => setLoading(false));
    }
    // get all items when loading
    else {
      getItems()
        .then((res) => {
          console.log("API all item Response:", res.data.data);
          setItems(res.data || []);
          setLoading(false);
        })
    }
  }, [selectCategories]);

  if (loading) return <p style={{ color: 'orange' }}>Loading items...</p>;

  return (
    <div>
      <div className="category-items">
        <h1 className='item-title'>Furniture Items</h1>
        {items.length > 0 ? (
          <div className="item-list">
            {items.map((item) => {
              const qty = cart[item._id]?.qty || 0;
              return (
                <div key={item._id} className="item-card" >
                  <img src={`http://localhost:4000${item.itemImages[0]}`} alt={item.itemName} onClick={() => detailView(item._id)} />
                  <h3>{item.itemName}</h3>
                  <p>{item.itemType}</p>
                  <div className="price">
                    {item.itemDiscount > 0 ? (
                      <>
                        <p className="old-price">LKR {item.itemPrice}</p>
                        <p className="new-price">
                          LKR {calculateFinalPrice(item.itemPrice, item.itemDiscount)}
                        </p>

                      </>
                    ) : (
                      <p className="new-price">LKR {item.itemPrice}</p>
                    )}
                  </div>
                  <p className="discount">
                    Discount: {((item.itemDiscount / item.itemPrice) * 100).toFixed(1)}%
                  </p>
                  <p className={item.itemAvailability === "available" ? "in-stock" : "out-of-stock"}>
                    {item.itemAvailability === "available" ? "Available in Stock" : "Out of Stock"}
                  </p>
                  <RatingStar ratings={item.itemRatings} />
                  <div className="add-cart">
                    {qty === 0 ? (
                      <button className='add-cart-button'
                        disabled={!token || item.itemAvailability !== "available"}
                        onClick={() => handleAddToCart(item)}
                        title={!token ? "Login to add to cart" : item.itemAvailability !== "available" ? "Out of stock" : ""}>
                        Add to cart
                      </button>

                    ) : (
                      <div className="quantity">
                        <button className='add' onClick={() => increaseQty(item._id)} disabled={!token || item.itemAvailability !== "available"} >+</button>
                        <span>{qty}</span>
                        <button className='minus' onClick={() => decreaseQty(item._id)} disabled={!token || item.itemAvailability !== "available"}>-</button>
                      </div>

                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          selectCategories !== "All" && <p>No items found in this category</p>
        )}

      </div>
      <hr />
    </div>

  )
}

export default Item