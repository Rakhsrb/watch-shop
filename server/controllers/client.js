import Client from "../models/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (obj) => {
  return jwt.sign(obj, process.env.JWTSECRET_KEY, { expiresIn: "7d" });
};

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const GetAllClients = async (_, res) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const ClientRegister = async (req, res) => {
  const { phoneNumber, fullName, avatar, password } = req.body;

  try {
    const existingClient = await Client.findOne({ phoneNumber });

    if (existingClient) {
      return sendErrorResponse(
        res,
        409,
        "User with this phone number already exists. Please use another number."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      phoneNumber,
      fullName,
      avatar,
      password: hashedPassword,
    });

    await newClient.save();

    const token = generateToken({ _id: newClient._id, role: "client" });

    return res.status(201).json({
      message: "New user successfully created!",
      client: newClient,
      token,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const ClientLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const client = await Client.findOne({ phoneNumber });

    if (!client) {
      return sendErrorResponse(
        res,
        401,
        "User with this phone number does not exist."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, "Incorrect phone number or password.");
    }

    const token = generateToken({ _id: client._id, role: "client" });

    return res.status(200).json({
      message: "Success!",
      client,
      token,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
