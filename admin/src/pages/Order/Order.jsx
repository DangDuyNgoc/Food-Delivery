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
                  {item.items.map((i, index) => {
                    if (index === item.items.length - 1) {
                      return i.name + " x " + i.quantity;
                    } else {
                      return i.name + " x " + i.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-name">
                  {item.address.firstName + " " + item.address.lastName}
                </p>
                <p className="order-phone">{item.address.phone}</p>
                <p>Items: {item.items.length}</p>
                <p>{item.amount}d</p>
                <select
                  onChange={(e) => statusHandler(e, item._id)}
                  value={item.status}
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
