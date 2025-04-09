import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "diegoMax@fatec.sp.gov.br"
 *         password:
 *           type: string
 *           example: "12345678"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Diego Max"
 *         email:
 *           type: string
 *           example: "diegoMax@fatec.sp.gov.br"
 *         password:
 *           type: string
 *           example: "12345678"
 */
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("Users", userSchema);
export default User;