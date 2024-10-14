import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import { hashPassword, matchPassword } from "../helpers/userHelper.js";
import "dotenv/config.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(201).send({
        success: false,
        message: "User Already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(201).send({
        success: false,
        message: "Invalid Email",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = createToken(user._id);

    res.status(200).send({
      success: true,
      message: "User Registered Successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(201).send({
      success: false,
      message: "Please enter your email address",
    });
  }
  if (!password) {
    return res.status(201).send({
      success: false,
      message: "Please enter your password",
    });
  }

  try {
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Haven't Registration an account yet",
      });
    }

    const comparePassword = await matchPassword(password, user.password);
    if (!comparePassword) {
      return res.status(201).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = createToken(user._id);

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.status(200).send({
      success: true,
      message: "Logout Successfully",
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

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export { registerUser, loginUser };
