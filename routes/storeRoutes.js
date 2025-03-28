import express from "express";
const storeRoutes = express.Router();
import storeController from "../controllers/storeController.js";

storeRoutes.get("/clothes", storeController.getAllItems);
storeRoutes.post("/clothes", storeController.createItem);
storeRoutes.delete("/clothes:id", storeController.deleteItem);
storeRoutes.put("/clothes:id", storeController.updateItem);
storeRoutes.get("/clothes:id", storeController.getOneItem);

export default storeRoutes;
