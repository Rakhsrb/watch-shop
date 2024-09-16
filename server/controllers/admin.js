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
  const { phoneNumber, password, firstName, lastName } = req.body;
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
    const newAdmin = new Admin({
      phoneNumber,
      password: hashedPassword,
      firstName,
      lastName,
      avatar: generateAvatar(firstName, lastName),
    });

    newAdmin.save();
    
    return res.status(201).json({
      message: "New admin successfully created!",
      data: newAdmin,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const UpdateAdmin = async (req, res) => {
  const userId = req.params.id;
  const { phoneNumber, firstName, lastName, password } = req.body;

  try {
    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = {
      phoneNumber,
      lastName,
      firstName,
      avatar: generateAvatar(firstName, lastName),
    };

    if (password) {
      updatedAdmin.password = hashedPassword;
    }

    const admin = await Admin.findByIdAndUpdate(userId, updatedAdmin, {
      new: true,
    });

    if (!admin) {
      return res.status(409).json({ message: "Admin not found." });
    }

    return res.status(201).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
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

export const GetMe = async (req, res) => {
  try {
    const foundAdmin = await Admin.findById(req.userInfo.userId);
    if (!foundAdmin)
      return res.status(404).json({ message: "Admin not found!" });
    return res.status(200).json({ data: foundAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
