import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "./../middlewares/authMiddleware.js";

const cartRoute = express.Router();

cartRoute.get("/get", authMiddleware, getCart);
cartRoute.post("/add/:itemId", authMiddleware, addToCart);
cartRoute.delete("/remove/:itemId", authMiddleware, removeCart);
cartRoute.delete("/clear", authMiddleware, clearCart);

export default cartRoute;
