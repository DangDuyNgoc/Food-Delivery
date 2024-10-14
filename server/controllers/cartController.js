import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    let userData = await userModel.findById(req.user._id);
    let cartData = userData?.cartData || {};

    console.log(req.body.itemId);

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    const updateUserCart = await userModel.findByIdAndUpdate(req.user._id, {
      cartData,
    });

    console.log("update cart: ", updateUserCart);

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

export const removeCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user._id);
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.status(200).send({
      success: true,
      message: "Removed From Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user._id);
    let cartData = userData?.cartData || {};

    console.log("Get cart", cartData);

    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      cartData: cartData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
    });
  }
};
