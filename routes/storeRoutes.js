import express from "express";
const storeRoutes = express.Router();
import storeController from "../controllers/storeController.js";

/**
 * @swagger
 * /clothes:
 *   post:
 *     summary: Buscar a listar de todas as roupas do sistema
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
storeRoutes.get("/clothes", storeController.getAllItems);
storeRoutes.post("/clothes", storeController.createItem);
storeRoutes.delete("/clothes:id", storeController.deleteItem);
storeRoutes.put("/clothes:id", storeController.updateItem);
storeRoutes.get("/clothes:id", storeController.getOneItem);

export default storeRoutes;
