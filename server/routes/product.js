import exress from "express";
import { CreateNewProduct, GetAllProducts } from "../controllers/product.js";

const router = exress.Router();

router.get("/", GetAllProducts);
router.post("/create", CreateNewProduct);

export default router;
