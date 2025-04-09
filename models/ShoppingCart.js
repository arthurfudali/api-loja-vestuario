import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         clothing:
 *           type: string
 *           format: objectId
 *           description: ID da roupa
 *           example: 67f462f70739eebcb6905501
 *         quantity:
 *           type: number
 *           description: Quantidade dessa roupa no carrinho.
 *           example: 1
 *           minimum: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingCarts:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           format: objectId
 *           description: ID do usuário que possui o carrinho de compras. 
 *           example: 642fddf0a1c2b7e5f8a12345
 *         clothes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 */

const ShoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Nome do modelo que você está referenciando
    required: true,
  },
  clothes: [
    {
      clothing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothes", // Nome do modelo de roupa que você está referenciando
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      }
    },
  ],
});
const ShoppingCart = mongoose.model("ShoppingCarts", ShoppingCartSchema);
export default ShoppingCart;
