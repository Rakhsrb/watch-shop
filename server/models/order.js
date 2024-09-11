import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  status: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
