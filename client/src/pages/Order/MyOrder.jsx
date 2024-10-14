import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Table, Tag } from "antd";
import moment from "moment";
import 'antd/dist/reset.css'; // reset Antd default styles

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userOrder",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Define table columns
  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`${url}/images/${record.image}`}
          alt={record.name}
          className="w-16 h-16"
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price (đ)",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price}.000đ`,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
  ];

  // Group orders by date
  const groupedOrders = data.reduce((acc, order) => {
    const orderDate = moment(order.date).format("YYYY-MM-DD");
    if (!acc[orderDate]) {
      acc[orderDate] = [];
    }
    acc[orderDate].push(order);
    return acc;
  }, {});

  return (
    <div className="my-order container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {Object.keys(groupedOrders).map((date) => (
        <div key={date} className="mb-8">
          <h3 className="text-lg font-bold mb-2">{`Orders for ${date}`}</h3>
          {groupedOrders[date].map((order, orderIndex) => (
            <Table
              key={orderIndex}
              columns={columns}
              dataSource={order.items.map((item, itemIndex) => ({
                key: `${orderIndex}-${itemIndex}`,
                ...item,
                status: order.status,
              }))}
              pagination={false}
              className="shadow-md mb-4"
              footer={() => (
                <div className="text-right font-bold">
                  Total Amount: {order.amount}.000đ
                </div>
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
