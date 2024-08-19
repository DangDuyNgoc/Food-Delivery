import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "./../../assets/assets";
import "./MyOrder.css";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userOrder",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-order">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="order-container">
              {order.items.map((item, index) => (
                <div key={index}>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="item-image"
                  />
                  <p>
                    {item.name} x {item.quantity}
                  </p>
                </div>
              ))}
              <p>Price: {order.amount}.000đ</p>
              <p>Total Products:
                <span> {order.items.length}</span>
              </p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
