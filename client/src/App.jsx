import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/PlaceOrder/Order";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Verify from "./pages/Verify/Verify";
import MyOrder from "./pages/Order/MyOrder";
import SearchList from "./pages/SearchList/SearchList";
import { Toaster } from "react-hot-toast";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Toaster />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myOrder" element={<MyOrder />} />
          <Route path="/search" element={<SearchList />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
