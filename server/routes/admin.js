import express from "express";
import {
  CreateNewAdmin,
  GetAllAdmins,
  GetOneAdmin,
  UpdateAdmin,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", GetAllAdmins);
router.get("/:id", GetOneAdmin);
router.post("/register", CreateNewAdmin);
router.put("/:id", UpdateAdmin);

export default router;
