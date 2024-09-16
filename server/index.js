import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import crypto from "crypto";
import path from "path";

import ClientRoutes from "./routes/client.js";
import AdminRoutes from "./routes/admin.js";
import ProductRoutes from "./routes/product.js";
import OrderRoutes from "./routes/order.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Set up multer storage with hashed filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${hash}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

app.use("/uploads", express.static("uploads"));

app.post("/upload", (req, res) => {
  upload.array("photos")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File size is too large. Max limit is 5MB." });
      }
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    const uploadedImages = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    res.status(200).json({
      message: "Images successfully uploaded!",
      photos: uploadedImages,
    });
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
