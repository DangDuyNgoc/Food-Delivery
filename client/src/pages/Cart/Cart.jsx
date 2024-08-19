import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { assets } from "../../assets/assets";

const Cart = () => {
  const { cartItems, food_list, removeCartItem, getTotalCart, url } =
    useContext(StoreContext);

  const itemsInCart = food_list.filter((item) => cartItems[item._id] > 0);

  const navigate = useNavigate();

  return (
    <div className="cart">
      {itemsInCart.length > 0 ? (
        <>
          <div className="cart-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {itemsInCart.map((item, index) => (
            <div key={index}>
              <div className="cart-title cart-item">
                <img src={url + "/images/" + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}.000đ</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}.000đ</p>
                <p onClick={() => removeCartItem(item._id)} className="cross">
                  X
                </p>
              </div>
              <hr />
            </div>
          ))}
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-detail">
                  <p>SubTotal</p>
                  <p>{getTotalCart()}.000đ</p>
                </div>
                <hr />
                <div className="cart-detail">
                  <p>Delivery Fee</p>
                  <p>2.000đ</p>
                </div>
                <hr />
                <div className="cart-detail">
                  <p>Total</p>
                  <p>{getTotalCart() + 2}.000đ</p>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promo">
              <div>
                <p>Enter your code</p>
                <div className="cart-promo-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="no-pro">No Products in Cart</div>
          <Link to="/" className="btn-buy">
            Buy Now
          </Link>
          <div>
            <img src={assets.empty_cart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
