import { Router } from "express";
import {
  createProduct,
  createProductImageLink,
  getAllProducts,
  deleteProduct,
  updateProduct,
  updateProductImageLink,
  getProductWithFilter,
  getProduct,
  searchProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/createProduct", upload.single("productImage"), createProduct);
router.post("/createProductImageLink", createProductImageLink);
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", upload.single("productImage"), updateProduct);
router.put("/updateProductImageLink/:id", updateProductImageLink);
router.post("/getProductWithFilter", getProductWithFilter);
router.get("/searchProducts", searchProducts);

export default router;
