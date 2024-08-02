/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrder(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (e, orderId) => {
    console.log(e, orderId);
    const response = await axios.post(url +"/api/order/status", {
      orderId,
      status: e.target.value
    })

    if(response.data.success) {
        await fetchOrder();
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((item, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="order-phone">{order.address.phone}</p>
                <p>Items: {order.items.length}</p>
                <p>{order.amount}d</p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
