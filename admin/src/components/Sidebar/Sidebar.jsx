import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-option">
        <NavLink to="/add" className="wrapper">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className="wrapper">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/order" className="wrapper">
          <img src={assets.order_icon} alt="" />
          <p>Orders Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
