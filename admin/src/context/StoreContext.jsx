/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({
  url: "http://localhost:8080",
  token: "",
  user: null,
  setToken: () => {},
  setUser: () => {},
});

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    try {
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Failed to access localStorage for token:", error);
    }
  };

  const handleSetUser = (newUser) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to access localStorage for user:", error);
    }
  };

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  const contextValue = {
    url: "http://localhost:8080",
    token,
    user,
    setToken: handleSetToken,
    setUser: handleSetUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
