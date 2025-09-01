
import React, { useEffect, useState } from 'react'
import './Item.css'
import { getItemsByCategory } from '../../services/api.js';

const Item = ({ selectCategories }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (selectCategories && selectCategories !== "All") {
        setLoading(true);
        getItemsByCategory(selectCategories)
          .then((res) => {
            //console.log("API item Response:", res.data.data);
            setItems(res.data.data || []);
            setLoading(false);
          })
          .catch(() => {
            setItems([]);
          })
          .finally(() => setLoading(false));
      } else {
        setItems([]); // reset when "All"
      }
    }, [selectCategories]);
  
    if (loading) return <p style={{ color: 'orange' }}>Loading items...</p>;
  return (
    <div className="category-items">
    {items.length > 0 ? (
      <div className="item-list">
        {items.map((item) => {
          return(
            <div key={item._id} className="item-card">
            <h2></h2>
            <img src={`http://localhost:4000${item.itemImages[0]}`} alt={item.itemName} />
            <h3>{item.itemName}</h3>
            <p>{item.itemType}</p>
            <p>LKR {item.itemPrice}</p>
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