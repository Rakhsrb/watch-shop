import exress from "express";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";
import {
  AllOrders,
  CancelOrder,
  GetOneOrder,
  NewOrder,
} from "../controllers/order.js";

const router = exress.Router();

router.get("/", isExisted, IsAdmin, AllOrders);
router.get("/:id", isExisted, IsAdmin, GetOneOrder);
router.post("/new-order", isExisted, NewOrder);
router.delete("/:id", isExisted, IsAdmin, CancelOrder);

export default router;
