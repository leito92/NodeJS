import { Router } from "express";
import { productController } from "../controllers/product.js";

export const router = Router()

router.get("/", productController.getAll)
router.get("/s", productController.getByName)
router.get("/:id", (req,res) => {})
router.post("/", productController.createOne)
router.patch("/:id", productController.updateOne)
router.delete("/:id", productController.deleteOne)