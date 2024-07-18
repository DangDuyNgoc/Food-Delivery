import { useContext } from "react";
import "./Order.css";
import { StoreContext } from "../../context/StoreContext";

const Order = () => {
  const { getTotalCart } = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="order-left">
        <p className="title">Delivery Information</p>
        <div className="muli-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="number" placeholder="Phone" />
      </div>
      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-detail">
              <p>SubTotal</p>
              <p>{getTotalCart() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Total</p>
              <p>{getTotalCart() === 0 ? 0 : getTotalCart() + 2}</p>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
