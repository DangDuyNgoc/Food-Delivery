/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems, addToCart, removeCartItem, url} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-img-container">
        <img className="food-img" src={`${url}/images/`+image} alt="" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            onClick={() => addToCart(id)}
            className="add"
          />
        ) : (
          <div className="food-count">
            <img src={assets.remove_icon_red} alt="" onClick={() => removeCartItem(id)} />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={() => addToCart(id)} />
          </div>
        )}
      </div>
      <div className="food-info">
        <div className="food-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-description">{description}</p>
        <p className="food-price">{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
