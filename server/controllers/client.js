import Client from "../models/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to get all clients
export const GetAllClients = async (_, res) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Xatolik!",
    });
  }
};

// Function to create a new client
export const CreateNewClient = async (req, res) => {
  const { phoneNumber, fullName, avatar, password } = req.body;

  try {
    const client = await Client.findOne({ phoneNumber });

    if (client) {
      return res.status(409).json({
        message:
          "Bunday raqamli foydalanuvchi mavjud, iltimos boshqa raqamdan foydalanib ko'ring!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      phoneNumber,
      fullName,
      avatar,
      password: hashedPassword,
    });

    await newClient.save();

    const token = jwt.sign({ _id: newClient._id }, process.env.JWTSECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "Yangi foydalanuvchi muvaffaqiyatli yaratildi!",
      client: newClient,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Xatolik!",
    });
  }
};
