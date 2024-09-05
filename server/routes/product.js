import exress from "express";
import {
  CreateNewProduct,
  DeleteProduct,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
} from "../controllers/product.js";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";

const router = exress.Router();

router.get("/", GetAllProducts);
router.get("/:id", GetOneProduct);
router.post("/create", isExisted, IsAdmin, CreateNewProduct);
router.delete("/:id", isExisted, IsAdmin, DeleteProduct);
router.put("/:id", isExisted, IsAdmin, UpdateProduct);

export default router;
