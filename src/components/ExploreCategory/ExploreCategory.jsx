import React, { useEffect,useState } from 'react'
import { getCategories } from '../../services/api.js';
import './ExploreCategory.css';


const ExploreCategory = ({selectCategories, setSelectCategories}) => {

  //use state for backend data 
  const [categories, setCategories] = React.useState([]);

   //use state for loading data
  const [loding, setLoading] = React.useState(true);

   //use state for errors
  const [error, setError] = React.useState(null);

  const categorySelection = (categoryName) =>{
    setSelectCategories(categoryName);
     
  }

  useEffect(() => {

    getCategories()
    .then ((res) => {
      console.log("API Response:", res.data);
      setCategories(res.data.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setError("Failed to fetch items");
      setLoading(false);
    });
  }, []);

  if (loding) return <p style={{ color: 'orange' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="explore-category" id='explore-category'>
      <h1>Explore Our Category </h1> 
      <p className="explore-category-text">Explore our diverse furniture categories, each offering thoughtfully designed pieces to transform your space into a home you love. </p>
      <div className="explore-category-list" >
        {categories.map((category) => {
          return(
            <div key={category._id} className="explore-category-list-item" onClick={ () =>categorySelection(category.categoryName)}>
              <img  className={selectCategories === category.categoryName ?"active" :""} src={`http://localhost:4000${category.categoryImage}`} alt={category.categoryName} />
              <p className={selectCategories === category.categoryName ?"active" :""}>{category.categoryName}</p>
            </div>
          )

        })}
      </div>
      <hr />

    </div>
  );

};

export default ExploreCategory