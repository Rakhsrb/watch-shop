import Client from "../models/client.js";
import bcrypt from "bcrypt";

export const CreateNewClient = async (req, res) => {
  const { phoneNumber, fullName, avatar, password } = req.body;
  try {
    const client = await Client.findOne({ phoneNumber });
    if (client) {
      return res.json({
        message:
          "Bungday raqamli foyadalanuvchi mavjud, iltimos boshqa raqamdan foydalanib ko'ring!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = new Client({
      phoneNumber,
      fullName,
      avatar,
      password: hashedPassword,
    });
    newClient.save();
    return res.json({
      message: "Yangi foydalanuvchi muvaffaqiyatli yaratildi!",
      client: newClient,
    });
  } catch (error) {}
};
