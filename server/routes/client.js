import express from "express";
import {
  ClientLogin,
  ClientRegister,
  DeleteClient,
  GetAllClients,
  UpdateClient,
} from "../controllers/client.js";

const router = express.Router();

router.get("/", GetAllClients);
router.post("/register", ClientRegister);
router.post("/login", ClientLogin);
router.put("/:id", UpdateClient);
router.delete("/:id", DeleteClient);

export default router;
