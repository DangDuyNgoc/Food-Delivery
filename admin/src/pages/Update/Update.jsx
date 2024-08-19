/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Update.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "./../../assets/assets";

const Update = ({ url }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        console.log("Fetching food data for ID:", id);
        const { data } = await axios.get(`${url}/api/food/${id}`);
        setName(data.food.name);
        setDescription(data.food.description);
        setPrice(data.food.price);
        setCategory(data.food.category);
        setImagePreview(`${url}/images/${data.food.image}`)
      } catch (error) {
        console.log("Failed to fetch food data", error);
      }
    };
    fetchFoodData();
  }, [id, url]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); 
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.put(`${url}/api/food/update`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      if (data?.success) {
        navigate("/list");
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in update product!!");
    }
  };

  return (
    <div className="update">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="flex-col update-img">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              alt=""
              src={imagePreview}
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={handleImageChange}
          />
        </div>
        <div className="update-product flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            required
          />
        </div>

        <div className="update-desc flex-col">
          <p>Product Description</p>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            placeholder="Write here"
          ></textarea>
        </div>

        <div className="update-cate-price">
          <div className="update-cate flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Cake</option>
              <option value="Pasta">Cake</option>
              <option value="Noodles">Cake</option>
            </select>
          </div>
          <div className="update-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price"
            />
          </div>
        </div>
        <button type="submit" className="update-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Update;
