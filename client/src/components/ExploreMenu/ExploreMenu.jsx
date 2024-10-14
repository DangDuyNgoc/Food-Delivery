import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Spin, Alert } from "antd"; // Import các component từ Ant Design
import "./ExploreMenu.css"; // Có thể dùng để thêm CSS tùy chỉnh

const ExploreMenu = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const url = "http://localhost:8080"; 
  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category/get-list-category`);
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        } else {
          console.error("No categories found in response");
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="explore-menu p-5" id="explore-menu">
      <h1 className="text-3xl font-bold mb-4">Explore Menu</h1>
      <p className="text-lg mb-4">Choose</p>
      {loading ? (
        <Spin tip="Loading categories..." /> 
      ) : error ? (
        <Alert message={error} type="error" showIcon /> 
      ) : categories.length > 0 ? (
        <Row gutter={16}>
          {categories.map((item, index) => (
            <div
              key={index}
              className="menu-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item._id ? "ALL" : item._id
                )
              }
            >
              <img
                src={`${url}/images/${item.image}`}
                alt=""
                className={category === item._id ? "active" : ""}
              />
              <p>{item.name}</p>
            </div>
          ))}
        </Row>
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default ExploreMenu;
