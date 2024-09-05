import express from "express";
import {
  AdminLogin,
  CreateNewAdmin,
  DeleteAdmin,
  GetAllAdmins,
  GetOneAdmin,
  UpdateAdmin,
} from "../controllers/admin.js";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";

const router = express.Router();

router.get("/", isExisted, IsAdmin, GetAllAdmins);
router.get("/:id", isExisted, IsAdmin, GetOneAdmin);
router.post("/login", AdminLogin);
router.post("/create", isExisted, IsAdmin, CreateNewAdmin);
router.put("/:id", isExisted, IsAdmin, UpdateAdmin);
router.delete("/:id", isExisted, IsAdmin, DeleteAdmin);

export default router;
