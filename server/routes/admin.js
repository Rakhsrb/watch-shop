import express from "express";
import {
  CreateNewAdmin,
  DeleteAdmin,
  GetAllAdmins,
  GetOneAdmin,
  UpdateAdmin,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", GetAllAdmins);
router.get("/:id", GetOneAdmin);
router.post("/create", CreateNewAdmin);
router.put("/:id", UpdateAdmin);
router.delete("/:id", DeleteAdmin);

export default router;
