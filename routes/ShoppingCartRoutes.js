import express from "express";
const shoppingCartRoutes = express.Router();
import ShoppingCartController from "../controllers/ShoppingCartController.js";
import Auth from "../middleware/Auth.js";

/**
 * @swagger
 * /shoppingcart/add/{idUser}/{idClothing}:
 *   post:
 *     tags:
 *       - ShoppingCarts
 *     summary: Adiciona uma roupa ao carrinho do usuário
 *     security:
 *       - bearerAuth: []  # Aqui indicamos que a rota precisa de autenticação Bearer
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do usuário
 *         example: 642fddf0a1c2b7e5f8a12345
 *       - in: path
 *         name: idClothing
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da roupa a ser adicionada
 *         example: 67f462f70739eebcb6905501
 *     responses:
 *       200:
 *         description: Carrinho atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCarts'
 *       400:
 *         description: Requisição inválida (IDs ausentes ou inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID inválido
 *       404:
 *         description: Carrinho não encontrado ou produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Carrinho não encontrado ou produto não encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor.
 *       401:
 *         description: Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Token inválido
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Token não fornecido
 */
shoppingCartRoutes.post(
  "/shoppingcart/add/:idUser/:idClothing",
  Auth.Authorization,
  ShoppingCartController.addItemToCart
);

/**
 * @swagger
 * /shoppingcart/usercart/{idUser}/{idClothing}:
 *   delete:
 *     tags:
 *       - ShoppingCarts
 *     summary: Remove uma unidade de roupa do carrinho do usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do usuário
 *       - in: path
 *         name: idClothing
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da roupa
 *     responses:
 *       200:
 *         description: Roupa removida com sucesso do carrinho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCarts'
 *       400:
 *         description: IDs inválidos ou ausentes
 *       404:
 *         description: Carrinho não encontrado ou roupa não está no carrinho
 *       500:
 *         description: Erro interno do servidor
 *       401:
 *         description: Token inválido ou não fornecido
 */
shoppingCartRoutes.delete(
  "/shoppingcart/usercart/:idUser/:idClothing",
  Auth.Authorization,
  ShoppingCartController.removeItemFromCart
);

/**
 * @swagger
 * /shoppingcart/usercart/{idUser}:
 *   get:
 *     tags:
 *       - ShoppingCarts
 *     summary: Retorna o carrinho de compras de um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do usuário
 *         example: 642fddf0a1c2b7e5f8a12345
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCarts'
 *       400:
 *         description: Requisição inválida (ID do usuário ausente ou inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID do usuário é obrigatório.
 *       404:
 *         description: Carrinho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Carrinho não encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno do servidor.
 *       401:
 *         description: Token inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Token inválido
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Token não fornecido
 */
shoppingCartRoutes.get(
  "/shoppingcart/usercart/:idUser",
  Auth.Authorization,
  ShoppingCartController.getCartByUserId
);
export default shoppingCartRoutes;
