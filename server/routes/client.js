import express from "express";
import { ClientLogin, ClientRegister } from "../controllers/client.js";

const router = express.Router();

router.post("/register", ClientRegister);
router.post("/login", ClientLogin);

export default router;
