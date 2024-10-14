import express from "express";
import { authMiddleware, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import multer from "multer";

const categoryRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

categoryRoute.post("/add-category", upload.single("image"), authMiddleware, isAdmin, createCategory);
categoryRoute.post(
  "/update-category/:id",
  upload.single("image"),
  authMiddleware,
  isAdmin,
  updateCategory
);

categoryRoute.get("/get-single-category/:slug", getSingleCategory);
categoryRoute.get("/get-list-category", getAllCategory);
categoryRoute.delete(
  "/delete-category/:id",
  authMiddleware,
  isAdmin,
  deleteCategory
);

export default categoryRoute;
