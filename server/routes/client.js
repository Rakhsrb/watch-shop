import express from "express";
import { CreateNewClient } from "../controllers/client.js";

const router = express.Router();

router.post("/create", CreateNewClient);

export default router;
