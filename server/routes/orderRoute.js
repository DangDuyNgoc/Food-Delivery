import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import {
  listOrder,
  placeOrder,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);
orderRoute.post("/verify", verifyOrder);
orderRoute.post("/userOrder", authMiddleware, userOrder);
orderRoute.get("/list", listOrder);
orderRoute.post("/status", authMiddleware, isAdmin, updateStatus);

export default orderRoute;
