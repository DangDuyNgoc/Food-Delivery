
import "./Home.css";
import Header from './../../components/Header/Header';
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Download from "../../components/Download/Download";
const Home = () => {
  const [category, setCategory] = useState("ALL");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <Download />
    </div>
  )
}

export default Home
