import express from "express";
import {
  addFood,
  getSingleFood,
  listFood,
  removeFood,
  updateFood,
} from "../controllers/foodController.js";
import multer from "multer";
import { authMiddleware, isAdmin } from './../middlewares/authMiddleware.js';

const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

foodRouter.post("/add", upload.single("image"), authMiddleware, isAdmin, addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove/:id",  authMiddleware, isAdmin, removeFood);
foodRouter.put("/update", upload.single("image"), authMiddleware, isAdmin, updateFood);
foodRouter.get("/:id", getSingleFood);

export default foodRouter;
