
import React, { useEffect, useState } from 'react'
import './Item.css'
import { getItems, getItemsByCategory } from '../../services/api.js';
import RatingStar from '../RatingStar/RatingStar.jsx';
import { useNavigate } from 'react-router-dom';

const Item = ({ selectCategories }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // navigate for view item details
  const navigate = useNavigate();

  // vie detail onclick function
  const detailView = (itemID, e) => {
    navigate(`/item-detail/${itemID}`)
  }

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
    <div className="category-items">
      <h1 className='item-title'>Furniture Items</h1>
      {items.length > 0 ? (
        <div className="item-list">
          {items.map((item) => {
            return (
              <div key={item._id} className="item-card" onClick={() => detailView(item._id)}>
                <img src={`http://localhost:4000${item.itemImages[0]}`} alt={item.itemName} />
                <h3>{item.itemName}</h3>
                <p>{item.itemType}</p>
                <p>LKR {item.itemPrice}</p>
                <p className={item.itemAvailability === "available" ? "in-stock" : "out-of-stock"}>
                  {item.itemAvailability === "available" ? "Available in Stock" : "Out of Stock"}
                </p>
                <RatingStar ratings={item.itemRatings} />
                <div className="add-cart">
                  <button className='add-cart-button'>Add to cart</button>
                  <div className="quantity">
                    <button className='add'>+</button>
                    <span>0</span>
                    <button className='minus'>-</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        selectCategories !== "All" && <p>No items found in this category</p>
      )}
    </div>
  )
}

export default Item