import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory.jsx'
import Item from '../../components/Items/Item'
import Aboutus from '../../components/Aboutus/Aboutus.jsx'

const Home = () => {

  const [selectCategories, setSelectCategories] = React.useState("All");
  return (
    <div id ='home'>
      <div>
        <Header />
      </div>
      <ExploreCategory id='category' selectCategories={selectCategories} setSelectCategories={setSelectCategories} />
      <Item selectCategories={selectCategories} />
      <Aboutus id='aboutus' />
    </div>
  )
}

export default Home