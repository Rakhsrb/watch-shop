import exress from "express";
import {
  CreateNewProduct,
  DeleteProduct,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
} from "../controllers/product.js";
import isExisted from "../middlewares/isExisted.js";

const router = exress.Router();

router.get("/", GetAllProducts);
router.get("/:id", GetOneProduct);
router.post("/create", isExisted("admin"), CreateNewProduct);
router.delete("/:id", isExisted("admin"), DeleteProduct);
router.put("/:id", isExisted("admin"), UpdateProduct);

export default router;
