import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  slug: {
    type: String,
  },
  image: { type: String, require: true },
  category: {
    type: mongoose.ObjectId,
    ref: "categories",
    require: true,
  },
});

const foodModel = mongoose.model("food", foodSchema);
export default foodModel;
