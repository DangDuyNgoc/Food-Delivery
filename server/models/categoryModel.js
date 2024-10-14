import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image: {
    type: String
  }
});

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
