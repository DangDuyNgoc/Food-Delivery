import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("File received:", req.file); // Add logging to verify file upload

    let image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.status(201).send({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Adding",
      error: error,
    });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.status(200).send({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Listing",
      error: error,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).send({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Remove Food",
      error: error,
    });
  }
};

export { addFood, listFood, removeFood };