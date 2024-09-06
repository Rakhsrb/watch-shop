import express from "express";
import {
  AdminLogin,
  CreateNewAdmin,
  DeleteAdmin,
  GetAllAdmins,
  GetMe,
  GetOneAdmin,
  UpdateAdmin,
} from "../controllers/admin.js";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";

const router = express.Router();

router.get("/", isExisted, IsAdmin, GetAllAdmins);
router.get("/me", isExisted, GetMe);
router.get("/:id", isExisted, IsAdmin, GetOneAdmin);
router.post("/login", AdminLogin);
router.post("/create", isExisted, IsAdmin, CreateNewAdmin);
// router.post("/create", CreateNewAdmin);
router.put("/:id", isExisted, IsAdmin, UpdateAdmin);
router.delete("/:id", isExisted, IsAdmin, DeleteAdmin);

export default router;
