import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

dotenv.config();

console.log(`MONGO_URL: ${process.env.MONGO_URL}`);

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server Started on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
