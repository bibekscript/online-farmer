import express from "express";
import {
  addProduct,
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controller/productcontroller.js";

import { productAddSchema } from "../models/product.js";
const router = express.Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
