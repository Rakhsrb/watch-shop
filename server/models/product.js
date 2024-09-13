import mongoose from "mongoose";

const Product = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  colors: [{ type: String, required: true }],
  photos: [{ type: String, required: true }],
});

export default mongoose.model("Product", Product);
