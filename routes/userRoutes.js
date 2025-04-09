import express from "express";
const userRoutes = express.Router();
import userController from "../controllers/userController.js";

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cadastrar novo usuário
 *     description: Endpoint para cadastrar novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
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

// Endpoint para cadastrar um usuário
userRoutes.post("/user", userController.createUser);

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Users
 *     summary: Autenticar usuário (login)
 *     description: Endpoint para autenticar um usuário e retornar um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
*                   type: string
*                   example: "eyJhbGciOiJIgfsnI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwInssiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       401:
 *         description: Senha incorreta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
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

// Endpoint para autenticar um usuário (login)
userRoutes.post("/auth", userController.loginUser);
export default userRoutes;


