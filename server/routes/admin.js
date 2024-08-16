import express from "express";
import { CreateNewAdmin } from "../controllers/admin.js";

const router = express.Router();

router.post("/register", CreateNewAdmin);

export default router;
