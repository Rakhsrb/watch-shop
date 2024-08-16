import generateAvatar from "../middlewares/generateAvatar.js";
import generateToken from "../middlewares/generateToken.js";
import Admin from "../models/admin.js";
import Client from "../models/client.js";
import bcrypt from "bcrypt";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const CreateNewAdmin = async (req, res) => {
  const { phoneNumber, password, firstName, lastName, avatar } = req.body;
  try {
    const admin = await Admin.findOne({ phoneNumber });
    if (admin) {
      return sendErrorResponse(
        res,
        409,
        "Admin with this phone number already exists. Please use another number."
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarPhoto = avatar ? avatar : generateAvatar(firstName, lastName);
    const newAdmin = new Admin({
      phoneNumber,
      password: hashedPassword,
      firstName,
      lastName,
      avatar: avatarPhoto,
    });

    newAdmin.save();

    const token = generateToken({ _id: newAdmin._id, role: "admin" });

    return res.status(201).json({
      message: "New admin successfully created!",
      data: newAdmin,
      token,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const GetAllClients = async (_, res) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
