import foodModel from "../models/foodModel.js";

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

export { addFood };
