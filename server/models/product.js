import mongoose from "mongoose";

const Product = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  previewPhoto: { type: String, required: true },
  Photos: [String],
});

export default mongoose.model("Product", Product);
