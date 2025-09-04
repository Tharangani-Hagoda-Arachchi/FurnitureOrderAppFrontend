import React from 'react'
import './RatingStar.css'

const RatingStar = ({ratings}) => {
    // for full star count
    const fullStar = Math.floor(ratings);
    // for half star count
    const halfStar = ratings % 1 >= 0.5;
    //for emty stars(total star - no of filled star - if half star is present then substract 1star)
    const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);

  return (
    <div className='rating-stars'>
        {Array(fullStar).fill("★").map((star, index) => (
            <span key={"full" + index} className='star-full'>{star}</span>
        ))}
        {halfStar && <span className='star-half'>★</span>}
        {Array(emptyStar).fill("★").map((star, index) => (
            <span key={"empty" + index} className='star-empty'>{star}</span>
        ))}

    </div>
  )
}

export default RatingStar