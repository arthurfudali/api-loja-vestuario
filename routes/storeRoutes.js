import express from "express";
const storeRoutes = express.Router();
import storeController from "../controllers/storeController.js";
import Auth from "../middleware/Auth.js";



/**
 * @swagger
 * /clothes:
 *   get:
 *     tags:
 *       - Clothes
 *     summary: Listar todas as roupas do sistema
 *     responses:
 *       200:
 *         description: Lista de roupas disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clothes'
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
storeRoutes.get("/clothes", storeController.getAllItems);
/**
 * @swagger
 * /clothes:
 *   post:
 *     tags:
 *       - Clothes
 *     summary: Cadastrar uma nova roupa
 *     security:
 *       - bearerAuth: []  # Aqui indicamos que a rota precisa de autenticação Bearer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Clothes'
 *     responses:
 *       201:
 *         description: Roupa cadastrada com sucesso
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
 */
storeRoutes.post("/clothes", Auth.Authorization, storeController.createItem);
/**
 * @swagger
 * /clothes/{id}:
 *   delete:
 *     tags:
 *       - Clothes
 *     security:
 *       - bearerAuth: []  # Aqui indicamos que a rota precisa de autenticação Bearer
 *     summary: Deletar uma roupa pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da roupa a ser deletada
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Roupa deletada com sucesso
 *       400:
 *         description: Requisição mal formada (ID inválido)
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
 */
storeRoutes.delete(
  "/clothes/:id",
  Auth.Authorization,
  storeController.deleteItem
);
/**
 * @swagger
 * /clothes/{id}:
 *   put:
 *     tags:
 *       - Clothes
 *     security:
 *       - bearerAuth: []  # Aqui indicamos que a rota precisa de autenticação Bearer
 *     summary: Atualizar os dados de um item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da roupa a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Clothes'
 *     responses:
 *       200:
 *         description: Roupa atualizada com sucesso
 *       400:
 *         description: Requisição mal formada
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
 */
storeRoutes.put("/clothes/:id", Auth.Authorization, storeController.updateItem);
/**
 * @swagger
 * /clothes/{id}:
 *   get:
 *     tags:
 *       - Clothes
 *     security:
 *       - bearerAuth: []  # Aqui indicamos que a rota precisa de autenticação Bearer
 *     summary: Buscar dados de item pelo Id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da roupa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item listado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clothes'
 *       400:
 *         description: Requisição mal formada
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
 */
storeRoutes.get("/clothes/:id", Auth.Authorization, storeController.getOneItem);

export default storeRoutes;
