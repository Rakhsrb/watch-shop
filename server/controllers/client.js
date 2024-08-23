import Client from "../models/client.js";
import bcrypt from "bcrypt";
import generateAvatar from "../middlewares/generateAvatar.js";
import generateToken from "../middlewares/generateToken.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const ClientRegister = async (req, res) => {
  const { phoneNumber, firstName, lastName, avatar, password } = req.body;

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
    const avatarPhoto = avatar ? avatar : generateAvatar(firstName, lastName);
    const newClient = new Client({
      phoneNumber,
      firstName,
      lastName,
      avatar: avatarPhoto,
      password: hashedPassword,
    });

    await newClient.save();

    const token = generateToken({ _id: newClient._id, role: "client" });

    return res.status(201).json({
      message: "New user successfully created!",
      data: newClient,
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

export const GetAllClients = async (_, res) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const UpdateClient = async (req, res) => {
  const userId = req.params.id;
  const { phoneNumber, firstName, lastName, avatar, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarPhoto = avatar ? avatar : generateAvatar(firstName, lastName);
    const updatedClient = {
      phoneNumber,
      lastName,
      firstName,
      avatar: avatarPhoto,
      password: hashedPassword,
    };
    const client = await Client.findByIdAndUpdate(userId, updatedClient, {
      new: true,
    });
    if (!client) {
      return sendErrorResponse(res, 409, "Client not found.");
    }
    return res.status(201).json({ data: client });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const DeleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return sendErrorResponse(res, 404, "Client not found.");
    }
    return res
      .status(201)
      .json({ message: "Client has been deleted successfully." });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
