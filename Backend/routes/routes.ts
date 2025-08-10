import { Router } from "express";
import productRoute from "../src/Routers/products.router";

const router = Router();

// Mount the productRoute router on the "/product" path
router.use("/product", productRoute);

export default router;
