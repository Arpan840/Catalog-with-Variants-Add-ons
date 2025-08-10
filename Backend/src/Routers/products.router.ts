import { Router } from "express";
import { addAddon, addProductController, addProductTypeController, addVariantController, getAllProductsPaginated, getAllProductTypesController, getProductsByType } from "../Controller/products/products.controller";
import { addProductTypeMiddleware } from "../../middleware/productType.middleware";
import { validateAddProductInput } from "../../middleware/addProduct.middleware";
import { validateAddVariant } from "../../middleware/addVariant.middleware";
import { validateAddon } from "../../middleware/addAddons.middleware";

const router = Router();

router.post("/addProductType", [addProductTypeMiddleware], addProductTypeController);
router.post("/addProduct",[validateAddProductInput],addProductController); 
router.post("/addVariant",[validateAddVariant],addVariantController);
router.post("/addAddon",[validateAddon], addAddon); 
router.get("/getAllProducts", getAllProductsPaginated); 
router.get("/getProductsByType/:type", getProductsByType);
router.get("/getAllProductTypes", getAllProductTypesController);
export default router;