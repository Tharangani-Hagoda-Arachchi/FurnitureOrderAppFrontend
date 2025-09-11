import React, {useState } from 'react'
import { useParams } from "react-router-dom";
import './ItemDetail.css'
import ItemDetailExplore from '../../components/ItemDetailExplore/ItemDetailExplore'

const ItemDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <ItemDetailExplore itemID={id}/>
    </div>
  )
}

export default ItemDetail