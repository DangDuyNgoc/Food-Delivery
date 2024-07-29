import express from "express";
import { addToCart, getCart, removeCart } from "../controllers/cartController.js";;
import { authMiddleware } from './../middlewares/authMiddleware';

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleware, addToCart);
cartRoute.post("/remove", authMiddleware, removeCart);
cartRoute.post("/get", authMiddleware, getCart);

export default cartRoute;