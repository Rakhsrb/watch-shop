import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import ClientRoutes from "./routes/client.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Hello world!"));
app.use("/client", ClientRoutes);

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
