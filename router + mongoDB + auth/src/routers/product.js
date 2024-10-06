import { Router } from "express";
import { productController } from "../controllers/product.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

export const router = Router()

router.get("/", productController.getAll)
router.get("/s", productController.getByName)
router.get("/:id", productController.getById)
router.post("/", verifyAccessToken, productController.createOne)
router.patch("/:id", verifyAccessToken, productController.updateOne)
router.delete("/:id", verifyAccessToken, productController.deleteOne)