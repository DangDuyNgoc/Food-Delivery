/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:8080";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [categories, setCategories] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        url + `/api/cart/add/${itemId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const removeCartItem = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
    if (token) {
      await axios.delete(url + `/api/cart/remove/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    toast.success("Item has been removed.");
  };

  const clearAllCartItem = async () => {
    try {
      await axios.delete(`${url}/api/cart/clear`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems({});
      toast.success("Item has been clear all.");
    } catch (error) {
      console.error("Error clearing all items:", error);
      toast.error("Failed to clear cart.");
    }
  };

  const getTotalCart = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with id ${item} not found in food_list`);
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/get-list-category`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await fetchCategories();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const searchProducts = (keyword) => {
    if (!keyword) return food_list;
    return food_list.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const contextValue = {
    food_list,
    categories,
    cartItems,
    setCartItems,
    addToCart,
    removeCartItem,
    clearAllCartItem,
    getTotalCart,
    url,
    token,
    setToken,
    searchProducts,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
