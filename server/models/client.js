import mongoose from "mongoose";

const Client = new mongoose.Schema({
  phoneNumber: { type: Number, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.model("Client", Client);
