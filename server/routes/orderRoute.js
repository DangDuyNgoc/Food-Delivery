import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder)

export default orderRoute;