import generateAvatar from "../middlewares/generateAvatar.js";
import generateToken from "../middlewares/generateToken.js";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const GetAllAdmins = async (_, res) => {
  try {
    const admins = await Admin.find();
    return res.json({ data: admins });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const GetOneAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return sendErrorResponse(res, 409, "Admin not found.");
    }
    return res.status(201).json({ data: admin });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
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

export const UpdateAdmin = async (req, res) => {
  const userId = req.params.id;
  const { phoneNumber, firstName, lastName, avatar, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarPhoto = avatar ? avatar : generateAvatar(firstName, lastName);
    const updatedAdmin = {
      phoneNumber,
      lastName,
      firstName,
      avatar: avatarPhoto,
      password: hashedPassword,
    };
    const admin = await Admin.findByIdAndUpdate(userId, updatedAdmin, {
      new: true,
    });
    if (!admin) {
      return sendErrorResponse(res, 409, "Admin not found.");
    }
    return res.status(201).json({ data: admin });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const AdminLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const admin = await Admin.findOne({ phoneNumber });

    if (!admin) {
      return sendErrorResponse(
        res,
        401,
        "Admin with this phone number does not exist."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, "Incorrect phone number or password.");
    }

    const token = generateToken({ _id: admin._id, role: "admin" });

    return res.status(200).json({
      message: "Success!",
      data: admin,
      token,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const DeleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return sendErrorResponse(res, 404, "Admin not found.");
    }
    return res
      .status(201)
      .json({ message: "Admin has been deleted successfully." });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
