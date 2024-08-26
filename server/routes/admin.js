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

const router = express.Router();

router.get("/", isExisted("admin"), GetAllAdmins);
router.get("/:id", isExisted("admin"), GetOneAdmin);
router.post("/login", AdminLogin);
router.post("/create", isExisted("admin"), CreateNewAdmin);
router.put("/:id", isExisted("admin"), UpdateAdmin);
router.delete("/:id", isExisted("admin"), DeleteAdmin);

export default router;
