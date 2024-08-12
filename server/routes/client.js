import express from "express";
import {
  ClientLogin,
  ClientRegister,
  GetAllClients,
} from "../controllers/client.js";

const router = express.Router();

router.get("/", GetAllClients);
router.post("/register", ClientRegister);
router.post("/login", ClientLogin);

export default router;
