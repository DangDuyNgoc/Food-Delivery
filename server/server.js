import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import morgan from "morgan";

import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

dotenv.config();

console.log(`MONGO_URL: ${process.env.MONGO_URL}`);

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/food", foodRouter)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server Started on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
