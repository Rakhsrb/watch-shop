import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import ClientRoutes from "./routes/client.js";
import AdminRoutes from "./routes/admin.js";
import ProductRoutes from "./routes/product.js";
import OrderRoutes from "./routes/order.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (a, b, cb) => {
    cb(null, "uploads");
  },
  filename: (a, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.array("photos"), async (req, res) => {
  const uploadedImages = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  );
  res.status(200).json({
    message: "Изображения успешно загружены!",
    photos: uploadedImages,
  });
});

app.get("/", (_, res) => res.send("Hello world!"));

app.use("/admin", AdminRoutes);
app.use("/client", ClientRoutes);
app.use("/product", ProductRoutes);
app.use("/order", OrderRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () =>
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startApp();
