/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";
import toast from "react-hot-toast";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeCartItem, url, token } =
    useContext(StoreContext);

  const handleAddToCart = () => {
    if (token) {
      addToCart(id);
    } else {
      toast.error("Please log in to add items to the cart.");
    }
  };

  const handleRemoveFromCart = () => {
    if (token) {
      removeCartItem(id);
    } else {
      toast.error("Please log in to remove items from the cart.");
    }
  };

  return (
    <div className="food-item">
      <div className="food-img-container">
        <img className="food-img" src={`${url}/images/` + image} alt="" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            onClick={handleAddToCart}
            className="add"
          />
        ) : (
          <div className="food-count">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={handleRemoveFromCart}
            />
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
        <p className="food-price">{price}.000đ</p>
      </div>
    </div>
  );
};

export default FoodItem;
