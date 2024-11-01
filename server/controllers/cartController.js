import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.user._id);

    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData?.cartData || {};

    const {itemId} = req.params;

    // if (!cartData[req.body.itemId]) {
    //   cartData[req.body.itemId] = 1;
    // } else {
    //   cartData[req.body.itemId] += 1;
    // }

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    const updateUserCart = await userModel.findByIdAndUpdate(req.user._id, {
      cartData,
    }, { new: true });

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
    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    const {itemId} = req.params;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    } else {
      return res.status(400).send({
        success: false,
        message: "Item not in cart or already removed",
      });
    }

    await userModel.findByIdAndUpdate(req.user._id, { cartData }, {new: true});

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

export const clearCart = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });

    res.status(200).send({
      success: true,
      message: "Cart Cleared",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
    });
  }
};