import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const Food = ({ url }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoods(response.data.data);
      } else {
        toast.error("Failed to fetch food data");
      }
    } catch (error) {
      toast.error("Error while fetching food data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure delete this food?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          const response = await axios.post(
            `${url}/api/food/remove`,
            { id },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            toast.success("Food deleted successfully");
            fetchFoods();
          } else {
            toast.error("Failed to delete food");
          }
        } catch (error) {
          toast.error("Error while deleting food");
        }
      },
      onCancel() {
        console.log("Cancel delete action");
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`${url}/images/${image}`}
          alt="food"
          className="w-16 h-16 object-cover"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex space-x-4">
          <Button
            type="primary"
            onClick={() => navigate(`/update/${record._id}`)}
            className="bg-blue-500"
          >
            Update
          </Button>

          <Button
            type="danger"
            onClick={() => handleDelete(record._id)}
            className="bg-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food List</h1>
        <Button
          type="primary"
          className="bg-green-500"
          onClick={() => navigate("/add-food")}
        >
          Add Food
        </Button>
      </div>

      <Table
        dataSource={foods}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="bg-white shadow rounded-lg"
      />
    </div>
  );
};

export default Food;
