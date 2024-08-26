import express from "express";
import {
  ClientLogin,
  ClientRegister,
  DeleteClient,
  GetAllClients,
  UpdateClient,
} from "../controllers/client.js";
import isExisted from "../middlewares/isExisted.js";

const router = express.Router();

router.get("/", isExisted("admin"), GetAllClients);
router.post("/register", ClientRegister);
router.post("/login", ClientLogin);
router.put("/:id", isExisted("client"), UpdateClient);
router.delete("/:id", isExisted("client"), DeleteClient);

export default router;
