import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.status(200).send({
      success: true,
      message: "Added To Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
    });
  }
};

export const removeCart = async (req, res) => {};

export const getCart = async (req, res) => {};
