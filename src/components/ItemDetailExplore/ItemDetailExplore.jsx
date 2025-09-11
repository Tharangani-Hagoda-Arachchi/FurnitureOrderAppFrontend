import React, { useEffect, useState } from 'react'
import { getItemsByID } from '../../services/api';
import { useParams } from 'react-router-dom'
import RatingStar from '../RatingStar/RatingStar';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import './ItemDetailExplore.css'

const ItemDetailExplore = () => {

  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // calculate final price
  const calculatefinalprice = (price, discount) => {
    if (!discount || discount < 0) return price;
    return (price - discount).toFixed(2)
  }

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getItemsByID(id)
      .then(res => setItemDetails(res.data.data)
      )
      .catch(() => setItemDetails(null))
      .finally(() => setLoading(false))
  }, [id]);

  if (loading) return <p style={{ color: 'orange' }}>Loading items...</p>;
  if (!itemDetails) return <p>Item not found</p>;

  return (
    <div className="item-detail">
      <h2>{itemDetails.itemName}</h2>
      <div className="basic-details">
        {/* Swiper for images */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className='image-swiper'
        >
          {itemDetails.itemImages?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://localhost:4000${img}`}
                alt={`${itemDetails.itemName} ${index + 1}`}
                className="item-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='item-basic-right'>
          <p>Type: {itemDetails.itemType}</p>
          <div className="price">
            {
              itemDetails.itemDiscount > 0 ? (
                <>
                  <p className="old-price">LKR {itemDetails.itemPrice}</p>
                  <p className="new-price">
                    LKR {calculatefinalprice(itemDetails.itemPrice, itemDetails.itemDiscount)}
                  </p>
                </>
              ) : (
                <p className="new-price">LKR {itemDetails.itemPrice}</p>
              )
            }
          </div>

          <p> Brand: {itemDetails.itemBrand}</p>
          <p className={itemDetails.itemAvailability === "available" ? "in-stock" : "out-of-stock"}>
            {itemDetails.itemAvailability === "available" ? "Available in Stock" : "Out of Stock"}
          </p>

          <div className="review-and-ratings">
            <RatingStar ratings={itemDetails.itemRatings} />
            <button className='add-ratings-button'>Give Ratings</button>
            <button className='add-review-button'>Give Review</button>
          </div>

          <p> {itemDetails.itemDescription}</p>

          {itemDetails.itemColor && itemDetails.itemColor.length > 0 && (
            <div className="color-selector">
              <p>Choose Color:</p>
              <div className="color-options">
                {itemDetails.itemColor[0]
                  .split(",")
                  .map((hex, index) => (
                    <div
                      key={index}
                      className={`color-circle ${selectedColor === hex ? "selected" : ""}`}
                      style={{ backgroundColor: hex }}
                      onClick={() => setSelectedColor(hex)}
                    />
                  ))}
              </div>
              <p className="selected-color-display">
                Selected Color:
                {selectedColor ? (
                  <span className="selected-color-circle" style={{ backgroundColor: selectedColor }} />
                ) : (
                  <strong> None</strong>
                )}
              </p>
            </div>
          )}

          <div className="add-cart">
            <button className='add-cart-button'>Add to cart</button>
            <div className="quantity">
              <button className='add'>+</button>
              <span>0</span>
              <button className='minus'>-</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="item-diamentions">
        <h4>Dimentions</h4>
        <div className="dimention-values">
          <p>Weight : {itemDetails.itemWeight}</p>
          <p>Length : {itemDetails.itemDimension.length} {itemDetails.itemDimension.unit}</p>
          <p>Width : {itemDetails.itemDimension.width} {itemDetails.itemDimension.unit}</p>
          <p>Height : {itemDetails.itemDimension.height} {itemDetails.itemDimension.unit}</p>
        </div>
      </div>

      <div className="item-asembly-care">
        <h4>Assembly and Care Instructions</h4>
        <div className="asembly-care-values">
          <p>Assembly Instructions : {itemDetails.itemAssembly}</p>
          <p>Care instructions : {itemDetails.itemCareInstruction} {itemDetails.itemDimension.unit}</p>
        </div>
      </div>
      <div className="item-delivary-return">
        <h4>Item Delivary and Return Poloicy</h4>
        <div className="return-delivary-values">
          <p>Delivary Instructions : {itemDetails.itemDelivaryInfo}</p>
          <p>Return Poloicy : {itemDetails.itemreturnPolicy}</p>
        </div>
      </div>
      <hr />
      <div className="review-section">
        <h3>Customer Reviews</h3>
      </div>
    </div>
  )
}

export default ItemDetailExplore