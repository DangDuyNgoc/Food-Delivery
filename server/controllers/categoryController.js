import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import path from "path";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

    let image_filename = req.file.filename;

    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(201).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
      image: image_filename,
    }).save();

    res.status(200).send({
      success: true,
      message: "Create Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error: error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }

    if (req.file) {
      const oldImage = path.join("uploads", category.image);
      fs.unlink(oldImage, (err) => {
        if (err) {
          console.log(err);
        }
      });
      category.image = req.file.filename;
    }

    category.name = name || category.name;
    category.slug = slugify(category.name);

    await category.save();

    return res.status(200).send({
      success: true,
      message: "Updated Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error: error.message || error,
    });
  }
};

// get single category
export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error: error,
    });
  }
};

// get all single category
export const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    return res.status(200).send({
      success: true,
      message: "Get All Category Successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error: error,
    });
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Deleted Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error: error,
    });
  }
};
