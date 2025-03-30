import express from "express";
const storeRoutes = express.Router();
import storeController from "../controllers/storeController.js";

/**
 * @swagger
 * /clothes:
 *   get:
 *     summary: Listar todas as roupas do sistema
 *     responses:
 *       200:
 *         description: Lista de roupas disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:        
 *                   name:
 *                     type: string
 *                     example: Camiseta Chicago Bulls Essential Masculina
 *                   type:
 *                     type: string
 *                     example: Camiseta
 *                   price:
 *                     type: number
 *                     example: 218.49
 *                   description:  # Aqui estava desalinhado
 *                     type: object
 *                     properties:
 *                       size:
 *                         type: string
 *                         example: M
 *                       color:
 *                         type: string
 *                         example: Vermelho
 *                       material:
 *                         type: string
 *                         example: Algodão
 *                       brand:
 *                         type: string
 *                         example: Nike
 *                       madeIn:   
 *                         type: string
 *                         example: Vietnã
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
storeRoutes.get("/clothes", storeController.getAllItems);
/**
*  @swagger
*  /clothes:
*    post:
*      summary: Cadastrar uma nova roupa
*      requestBody:
*        required: true
*        content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: Camiseta Chicago Bulls Essential Masculina
*               type:
*                 type: string
*                 example: Camiseta
*               price:
*                 type: number
*                 example: 218.49
*               description:
*                 type: object
*                 properties:
*                   size:
*                     type: string
*                     example: M
*                   color:
*                     type: string
*                     example: Vermelho
*                   material:
*                     type: string
*                     example: Algodão
*                   brand:
*                     type: string
*                     example: Nike
*                   madeIn:   
*                     type: string
*                     example: Vietnã
*      responses:
*       201:
*         description: Roupa cadastrada com sucesso
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
storeRoutes.post("/clothes", storeController.createItem);
/**
 * @swagger
 * /clothes/{id}:
 *   delete:
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
 *         
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
storeRoutes.delete("/clothes:id", storeController.deleteItem);
/**
 * @swagger
 * /clothes/{id}:
 *   put:
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camiseta Chicago Bulls Essential Masculina
 *               type:
 *                 type: string
 *                 example: Camiseta
 *               price:
 *                 type: number
 *                 example: 218.49
 *               description:
 *                 type: object
 *                 properties:
 *                   size:
 *                     type: string
 *                     example: M
 *                   color:
 *                     type: string
 *                     example: Vermelho
 *                   material:
 *                     type: string
 *                     example: Algodão
 *                   brand:
 *                     type: string
 *                     example: Nike
 *                   madeIn:   
 *                     type: string
 *                     example: Vietnã             
 *     responses:
 *       200:
 *         description: Roupa atualizada com sucesso
 *       400:
 *         description: Requisição mal formada         
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
storeRoutes.put("/clothes:id", storeController.updateItem);
/**
 * @swagger
 * /clothes/{id}:
 *   get:
 *     summary: Buscar dados de item pelo Id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da roupa a ser atualizada
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
 *                 type: object
 *                 properties:        
 *                   name:
 *                     type: string
 *                     example: Camiseta Chicago Bulls Essential Masculina
 *                   type:
 *                     type: string
 *                     example: Camiseta
 *                   price:
 *                     type: number
 *                     example: 218.49
 *                   description:  # Aqui estava desalinhado
 *                     type: object
 *                     properties:
 *                       size:
 *                         type: string
 *                         example: M
 *                       color:
 *                         type: string
 *                         example: Vermelho
 *                       material:
 *                         type: string
 *                         example: Algodão
 *                       brand:
 *                         type: string
 *                         example: Nike
 *                       madeIn:   
 *                         type: string
 *                         example: Vietnã
 *       400:
 *         description: Requisição mal formada         
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
storeRoutes.get("/clothes:id", storeController.getOneItem);

export default storeRoutes;
