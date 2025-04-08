import mongoose from "../config/db-connection.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Clothes:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Camiseta Chicago Bulls Essential Masculina"
 *         type:
 *           type: string
 *           example: "Camiseta"
 *         price:
 *           type: number
 *           example: 218.49
 *         description:
 *           type: object
 *           properties:
 *             size:
 *               type: string
 *               example: "M"
 *             color:
 *               type: string
 *               example: "Vermelho"
 *             material:
 *               type: string
 *               example: "Algodão"
 *             brand:
 *               type: string
 *               example: "Nike"
 *             madeIn:
 *               type: string
 *               example: "Vietnã"
 */

const DescriptionSchema = new mongoose.Schema({
  size: String,
  color: String,
  material: String,
  brand: String,
  madeIn: String,
});

const ClothesSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  description: DescriptionSchema,
});

const Clothes = mongoose.model("Clothes", ClothesSchema);
export default Clothes;