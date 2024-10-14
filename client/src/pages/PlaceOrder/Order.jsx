import { useContext, useEffect, useState } from "react";
import "./Order.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Order = () => {
  const navigate = useNavigate();
  const { getTotalCart, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCart() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCart, navigate]);

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
   
    if(!data.firstName) {
      return toast.error("Please enter your first name");
    }

    if(!data.lastName) {
      return toast.error("Please enter your last name");
    }

    if(!data.email) {
      return toast.error("Please enter your email");
    }

    if(!data.phone) {
      return toast.error("Please enter your phone");
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCart() + 2,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Order Successfully");
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input
          type="number"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>
      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-detail">
              <p>SubTotal</p>
              <p>{getTotalCart() === 0 ? 0 : getTotalCart()}.000đ</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Delivery Fee</p>
              <p>12.000đ</p>
            </div>
            <hr />
            <div className="cart-detail">
              <p>Total</p>
              <p>{getTotalCart() === 0 ? 0 : getTotalCart() + 12}.000đ</p>
            </div>
          </div>
          <button type="submit">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
