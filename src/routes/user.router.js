import express from "express";
import UserModel from "../models/user.model.js"
const router = express.Router();

/**
 * @openapi
 *  tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con la autenticación y sesiones de usuario
 */

/**
 * @openapi
 *   /api/users:
 *     post:
 *       summary: Registrar un nuevo usuario y guardar en MongoDB
 *       tags: [Usuarios]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 age:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: Usuario registrado con éxito
 *         '400':
 *           description: El email ya está registrado
 *         '500':
 *           description: Error al crear el usuario
 */


router.post("/", async (req,res)=>{
    const {first_name, last_name, email, password, age} = req.body
    try {
        const userAlreadyExist = await UserModel.findOne({email})
        if (userAlreadyExist) return res.status(400).send("El email ya esta registrado")
        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password, 
            age
        })
        req.session.login = true
        req.session.user = {...newUser._doc}
        res.redirect("/profile")        
    } catch (error) {
        res.status(500).send("Error al crear el usuario")
    }
})

export default router