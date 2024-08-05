import express from "express";
import { CreateNewClient, GetAllClients } from "../controllers/client.js";

const router = express.Router();

router.get("/", GetAllClients);
router.post("/create", CreateNewClient);

export default router;
