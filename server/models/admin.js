import mongoose from "mongoose";

const Admin = new mongoose.Schema({
  phoneNumber: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.model("Admins", Admin);
