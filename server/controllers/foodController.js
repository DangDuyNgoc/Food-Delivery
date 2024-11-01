import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

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
    const {id} = req.params;
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);
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

const updateFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      res.status(201).send({
        success: false,
        message: "No food found",
      });
    }

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;

    if (req.file) {
      if (food.image) {
        const oldImage = path.join("uploads", food.image);
        fs.unlink(oldImage, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      food.image = req.file.filename;
    }

    await food.save();

    res.status(200).send({
      success: true,
      message: "Updated Successfully",
      products: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
    });
  }
};

const getSingleFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    res.status(200).send({
      success: true,
      food: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Server",
      err: error,
    });
  }
};

export { addFood, listFood, removeFood, updateFood, getSingleFood };
